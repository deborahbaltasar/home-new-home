import type { AuthUser } from "@/integrations/clerk/clerk-boundary";
import { createSupabaseAdminClient } from "@/integrations/supabase/supabase-admin";
import type { ItemRepository } from "@/features/items/domain/item.repository";
import type {
  CreateItemStoreOptionInput,
  DeleteItemStoreOptionInput,
  Item,
  ItemStoreOption,
  UpdateItemInput,
  UpdateItemStoreOptionInput
} from "@/features/items/domain/item.types";

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
  target_price: number | null;
  image_url: string | null;
  attachment_urls: string[] | null;
  created_at: string;
  updated_at: string;
};

type ItemStoreOptionRow = {
  id: string;
  house_id: string;
  item_id: string;
  store_name: string;
  product_url: string | null;
  price: number;
  notes: string | null;
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

async function assertItemBelongsToHouse(houseId: string, itemId: string) {
  const supabase = createSupabaseAdminClient();
  const { data, error } = await supabase
    .from("items")
    .select("id")
    .eq("house_id", houseId)
    .eq("id", itemId)
    .maybeSingle();

  if (error) {
    throw new Error(error.message);
  }

  if (!data) {
    throw new Error("Item not found in this house.");
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
    targetPrice: row.target_price ?? undefined,
    imageUrl: row.image_url ?? undefined,
    attachmentUrls: row.attachment_urls ?? [],
    storeOptions: [],
    createdAt: row.created_at,
    updatedAt: row.updated_at
  };
}

function mapStoreOption(row: ItemStoreOptionRow): ItemStoreOption {
  return {
    id: row.id,
    houseId: row.house_id,
    itemId: row.item_id,
    storeName: row.store_name,
    productUrl: row.product_url ?? undefined,
    price: row.price,
    notes: row.notes ?? undefined,
    createdAt: row.created_at,
    updatedAt: row.updated_at
  };
}

async function listStoreOptionsByHouse(houseId: string) {
  const supabase = createSupabaseAdminClient();
  const { data, error } = await supabase
    .from("item_store_options")
    .select("id,house_id,item_id,store_name,product_url,price,notes,created_at,updated_at")
    .eq("house_id", houseId)
    .order("price", { ascending: true });

  if (error) {
    throw new Error(error.message);
  }

  return ((data ?? []) as ItemStoreOptionRow[]).map(mapStoreOption);
}

async function listItemsWithStoreOptions(houseId: string) {
  const supabase = createSupabaseAdminClient();
  const { data, error } = await supabase
    .from("items")
    .select(
      "id,house_id,room_id,category_id,name,notes,priority,essentiality,quantity,status,target_price,image_url,attachment_urls,created_at,updated_at"
    )
    .eq("house_id", houseId)
    .order("created_at", { ascending: false });

  if (error) {
    throw new Error(error.message);
  }

  const [items, storeOptions] = await Promise.all([
    Promise.resolve(((data ?? []) as ItemRow[]).map(mapItem)),
    listStoreOptionsByHouse(houseId)
  ]);

  const optionMap = new Map<string, ItemStoreOption[]>();

  for (const option of storeOptions) {
    const itemOptions = optionMap.get(option.itemId) ?? [];
    itemOptions.push(option);
    optionMap.set(option.itemId, itemOptions);
  }

  return items.map((item) => ({
    ...item,
    storeOptions: optionMap.get(item.id) ?? []
  }));
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
  if (input.targetPrice !== undefined) payload.target_price = input.targetPrice;
  if (input.imageUrl !== undefined) payload.image_url = input.imageUrl || null;
  if (input.attachmentUrls !== undefined) payload.attachment_urls = input.attachmentUrls;

  return payload;
}

export const supabaseItemRepository: ItemRepository = {
  async listByHouse(user: AuthUser, houseId: string) {
    await assertHouseMembership(user.id, houseId);
    return listItemsWithStoreOptions(houseId);
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
      target_price: input.targetPrice ?? null,
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
  },
  async createStoreOption(user: AuthUser, input: CreateItemStoreOptionInput) {
    await assertHouseMembership(user.id, input.houseId);
    await assertItemBelongsToHouse(input.houseId, input.itemId);
    const supabase = createSupabaseAdminClient();
    const { error } = await supabase.from("item_store_options").insert({
      house_id: input.houseId,
      item_id: input.itemId,
      store_name: input.storeName,
      product_url: input.productUrl ?? null,
      price: input.price,
      notes: input.notes ?? null
    });

    if (error) {
      throw new Error(error.message);
    }

    return this.listByHouse(user, input.houseId);
  },
  async updateStoreOption(user: AuthUser, input: UpdateItemStoreOptionInput) {
    await assertHouseMembership(user.id, input.houseId);
    const supabase = createSupabaseAdminClient();
    const payload: Record<string, unknown> = {};

    if (input.storeName !== undefined) payload.store_name = input.storeName;
    if (input.productUrl !== undefined) payload.product_url = input.productUrl || null;
    if (input.price !== undefined) payload.price = input.price;
    if (input.notes !== undefined) payload.notes = input.notes || null;

    const { error } = await supabase
      .from("item_store_options")
      .update(payload)
      .eq("house_id", input.houseId)
      .eq("item_id", input.itemId)
      .eq("id", input.optionId);

    if (error) {
      throw new Error(error.message);
    }

    return this.listByHouse(user, input.houseId);
  },
  async deleteStoreOption(user: AuthUser, input: DeleteItemStoreOptionInput) {
    await assertHouseMembership(user.id, input.houseId);
    const supabase = createSupabaseAdminClient();
    const { error } = await supabase
      .from("item_store_options")
      .delete()
      .eq("house_id", input.houseId)
      .eq("item_id", input.itemId)
      .eq("id", input.optionId);

    if (error) {
      throw new Error(error.message);
    }

    return this.listByHouse(user, input.houseId);
  }
};
