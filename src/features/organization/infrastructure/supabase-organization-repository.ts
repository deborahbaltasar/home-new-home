import type { AuthUser } from "@/integrations/clerk/clerk-boundary";
import { createSupabaseAdminClient } from "@/integrations/supabase/supabase-admin";
import type { OrganizationRepository } from "@/features/organization/domain/organization.repository";
import type {
  Category,
  CreateCategoryInput,
  CreateRoomInput,
  DeleteCategoryInput,
  DeleteRoomInput,
  HouseOrganization,
  Room
} from "@/features/organization/domain/organization.types";

type RoomRow = {
  id: string;
  house_id: string;
  name: string;
  color: Room["color"];
  created_at: string;
};

type CategoryRow = {
  id: string;
  house_id: string;
  name: string;
  created_at: string;
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

function mapOrganization(rows: { rooms: RoomRow[]; categories: CategoryRow[] }): HouseOrganization {
  return {
    rooms: rows.rooms.map((room) => ({
      id: room.id,
      houseId: room.house_id,
      name: room.name,
      color: room.color,
      createdAt: room.created_at
    })),
    categories: rows.categories.map((category) => ({
      id: category.id,
      houseId: category.house_id,
      name: category.name,
      createdAt: category.created_at
    }))
  };
}

export const supabaseOrganizationRepository: OrganizationRepository = {
  async getByHouse(user: AuthUser, houseId: string) {
    await assertHouseMembership(user.id, houseId);
    const supabase = createSupabaseAdminClient();
    const [{ data: rooms, error: roomsError }, { data: categories, error: categoriesError }] =
      await Promise.all([
        supabase.from("rooms").select("id,house_id,name,color,created_at").eq("house_id", houseId).order("name"),
        supabase
          .from("categories")
          .select("id,house_id,name,created_at")
          .eq("house_id", houseId)
          .order("name")
      ]);

    if (roomsError) {
      throw new Error(roomsError.message);
    }

    if (categoriesError) {
      throw new Error(categoriesError.message);
    }

    return mapOrganization({
      rooms: (rooms ?? []) as RoomRow[],
      categories: (categories ?? []) as CategoryRow[]
    });
  },
  async createRoom(user, input) {
    await assertHouseMembership(user.id, input.houseId);
    const supabase = createSupabaseAdminClient();
    const { error } = await supabase.from("rooms").insert({
      house_id: input.houseId,
      name: input.name,
      color: input.color
    });

    if (error) {
      throw new Error(error.message);
    }

    return this.getByHouse(user, input.houseId);
  },
  async deleteRoom(user, input) {
    await assertHouseMembership(user.id, input.houseId);
    const supabase = createSupabaseAdminClient();
    const { error } = await supabase
      .from("rooms")
      .delete()
      .eq("house_id", input.houseId)
      .eq("id", input.roomId);

    if (error) {
      throw new Error(error.message);
    }

    return this.getByHouse(user, input.houseId);
  },
  async createCategory(user, input) {
    await assertHouseMembership(user.id, input.houseId);
    const supabase = createSupabaseAdminClient();
    const { error } = await supabase.from("categories").insert({
      house_id: input.houseId,
      name: input.name
    });

    if (error) {
      throw new Error(error.message);
    }

    return this.getByHouse(user, input.houseId);
  },
  async deleteCategory(user, input) {
    await assertHouseMembership(user.id, input.houseId);
    const supabase = createSupabaseAdminClient();
    const { error } = await supabase
      .from("categories")
      .delete()
      .eq("house_id", input.houseId)
      .eq("id", input.categoryId);

    if (error) {
      throw new Error(error.message);
    }

    return this.getByHouse(user, input.houseId);
  }
};
