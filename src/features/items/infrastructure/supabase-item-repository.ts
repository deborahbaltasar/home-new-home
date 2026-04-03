import type { AuthUser } from "@/integrations/clerk/clerk-boundary";
import { createSupabaseAdminClient } from "@/integrations/supabase/supabase-admin";
import type { ItemRepository } from "@/features/items/domain/item.repository";
import type { Item, UpdateItemInput } from "@/features/items/domain/item.types";

type ItemRow = {
  id: string;
  house_id: string;
  room_id: string | null;
  category_id: string | null;
  name: string;
  notes: string | null;
  priority: Item["priority"];
  essentiality: Item["essentiality"];
  quantity: number;
  status: Item["status"];
  image_url: string | null;
  attachment_urls: string[] | null;
  created_at: string;
  updated_at: string;
};

async function assertHouseMembership(userId: string, houseId: string) {
  const supabase = createSupabaseAdminClient();
  const { data, error } = await supabase
    .from("house_members")
    .select("id")
    .eq("house_id", houseId)
    .eq("user_id", userId)
    .maybeSingle();

  if (error) {
    throw new Error(error.message);
  }

  if (!data) {
    throw new Error("House access denied.");
  }
}

function mapItem(row: ItemRow): Item {
  return {
    id: row.id,
    houseId: row.house_id,
    roomId: row.room_id ?? undefined,
    categoryId: row.category_id ?? undefined,
    name: row.name,
    notes: row.notes ?? undefined,
    priority: row.priority,
    essentiality: row.essentiality,
    quantity: row.quantity,
    status: row.status,
    imageUrl: row.image_url ?? undefined,
    attachmentUrls: row.attachment_urls ?? [],
    createdAt: row.created_at,
    updatedAt: row.updated_at
  };
}

function buildUpdatePayload(input: UpdateItemInput) {
  const payload: Record<string, unknown> = {};

  if (input.roomId !== undefined) payload.room_id = input.roomId || null;
  if (input.categoryId !== undefined) payload.category_id = input.categoryId || null;
  if (input.name !== undefined) payload.name = input.name;
  if (input.notes !== undefined) payload.notes = input.notes || null;
  if (input.priority !== undefined) payload.priority = input.priority;
  if (input.essentiality !== undefined) payload.essentiality = input.essentiality;
  if (input.quantity !== undefined) payload.quantity = input.quantity;
  if (input.status !== undefined) payload.status = input.status;
  if (input.imageUrl !== undefined) payload.image_url = input.imageUrl || null;
  if (input.attachmentUrls !== undefined) payload.attachment_urls = input.attachmentUrls;

  return payload;
}

export const supabaseItemRepository: ItemRepository = {
  async listByHouse(user: AuthUser, houseId: string) {
    await assertHouseMembership(user.id, houseId);
    const supabase = createSupabaseAdminClient();
    const { data, error } = await supabase
      .from("items")
      .select(
        "id,house_id,room_id,category_id,name,notes,priority,essentiality,quantity,status,image_url,attachment_urls,created_at,updated_at"
      )
      .eq("house_id", houseId)
      .order("created_at", { ascending: false });

    if (error) {
      throw new Error(error.message);
    }

    return ((data ?? []) as ItemRow[]).map(mapItem);
  },
  async createItem(user, input) {
    await assertHouseMembership(user.id, input.houseId);
    const supabase = createSupabaseAdminClient();
    const { error } = await supabase.from("items").insert({
      house_id: input.houseId,
      room_id: input.roomId ?? null,
      category_id: input.categoryId ?? null,
      name: input.name,
      notes: input.notes ?? null,
      priority: input.priority,
      essentiality: input.essentiality,
      quantity: input.quantity,
      status: input.status,
      image_url: input.imageUrl ?? null,
      attachment_urls: input.attachmentUrls
    });

    if (error) {
      throw new Error(error.message);
    }

    return this.listByHouse(user, input.houseId);
  },
  async updateItem(user, input) {
    await assertHouseMembership(user.id, input.houseId);
    const supabase = createSupabaseAdminClient();
    const { error } = await supabase
      .from("items")
      .update(buildUpdatePayload(input))
      .eq("house_id", input.houseId)
      .eq("id", input.itemId);

    if (error) {
      throw new Error(error.message);
    }

    return this.listByHouse(user, input.houseId);
  },
  async deleteItem(user, input) {
    await assertHouseMembership(user.id, input.houseId);
    const supabase = createSupabaseAdminClient();
    const { error } = await supabase
      .from("items")
      .delete()
      .eq("house_id", input.houseId)
      .eq("id", input.itemId);

    if (error) {
      throw new Error(error.message);
    }

    return this.listByHouse(user, input.houseId);
  }
};
