import type { AuthUser } from "@/integrations/clerk/clerk-boundary";
import { createSupabaseAdminClient } from "@/integrations/supabase/supabase-admin";
import type { HouseRepository } from "@/features/houses/domain/house.repository";
import { logServerError, logServerInfo } from "@/shared/lib/server-log";
import type {
  CreateHouseInput,
  CreateHouseInviteInput,
  House,
  HouseInvite,
  HouseMember,
  RemoveHouseMemberInput,
  UpdateHouseMemberRoleInput
} from "@/features/houses/domain/house.types";

type HouseRow = {
  id: string;
  name: string;
  city: string | null;
  cover_tone: House["coverTone"];
  created_at: string;
};

type HouseMemberRow = {
  id: string;
  house_id: string;
  user_id: string;
  name: string;
  email: string | null;
  role: HouseMember["role"];
  joined_at: string;
};

type HouseInviteRow = {
  id: string;
  house_id: string;
  token: string;
  label: string;
  role: HouseInvite["role"];
  created_at: string;
  created_by_user_id: string;
};

function buildInviteUrl(houseId: string, token: string) {
  return `/app/houses/${houseId}/settings?invite=${token}`;
}

function mapHouse(rows: {
  house: HouseRow;
  members: HouseMemberRow[];
  invites: HouseInviteRow[];
}): House {
  return {
    id: rows.house.id,
    name: rows.house.name,
    city: rows.house.city ?? undefined,
    coverTone: rows.house.cover_tone,
    createdAt: rows.house.created_at,
    members: rows.members
      .filter((member) => member.house_id === rows.house.id)
      .map((member) => ({
        id: member.id,
        userId: member.user_id,
        name: member.name,
        email: member.email ?? undefined,
        role: member.role,
        joinedAt: member.joined_at
      })),
    invites: rows.invites
      .filter((invite) => invite.house_id === rows.house.id)
      .map((invite) => ({
        id: invite.id,
        token: invite.token,
        label: invite.label,
        role: invite.role,
        createdAt: invite.created_at,
        createdByUserId: invite.created_by_user_id,
        inviteUrl: buildInviteUrl(invite.house_id, invite.token)
      }))
  };
}

async function getAccessibleHouseIds(userId: string) {
  const supabase = createSupabaseAdminClient();
  logServerInfo("houses.supabase", "Fetching accessible house ids", { userId });
  const { data, error } = await supabase
    .from("house_members")
    .select("house_id")
    .eq("user_id", userId);

  if (error) {
    logServerError("houses.supabase", "Failed to fetch accessible house ids", {
      userId,
      message: error.message
    });
    throw new Error(error.message);
  }

  logServerInfo("houses.supabase", "Fetched accessible house ids", {
    userId,
    count: data?.length ?? 0
  });

  return (data ?? []).map((row) => row.house_id as string);
}

async function getManagerRole(houseId: string, userId: string) {
  const supabase = createSupabaseAdminClient();
  const { data, error } = await supabase
    .from("house_members")
    .select("role")
    .eq("house_id", houseId)
    .eq("user_id", userId)
    .maybeSingle();

  if (error) {
    throw new Error(error.message);
  }

  if (!data || (data.role !== "owner" && data.role !== "admin")) {
    throw new Error("Only house managers can perform this action.");
  }

  return data.role as HouseMember["role"];
}

export const supabaseHouseRepository: HouseRepository = {
  async listByUser(user: AuthUser) {
    const supabase = createSupabaseAdminClient();
    const houseIds = await getAccessibleHouseIds(user.id);
    logServerInfo("houses.supabase", "Listing houses for user", {
      userId: user.id,
      houseCount: houseIds.length
    });

    if (houseIds.length === 0) {
      return [];
    }

    const [{ data: houses, error: housesError }, { data: members, error: membersError }, { data: invites, error: invitesError }] =
      await Promise.all([
        supabase.from("houses").select("id,name,city,cover_tone,created_at").in("id", houseIds).order("created_at", { ascending: false }),
        supabase.from("house_members").select("id,house_id,user_id,name,email,role,joined_at").in("house_id", houseIds),
        supabase.from("house_invites").select("id,house_id,token,label,role,created_at,created_by_user_id").in("house_id", houseIds).order("created_at", { ascending: false })
      ]);

    if (housesError) {
      logServerError("houses.supabase", "Failed to load houses", {
        userId: user.id,
        message: housesError.message
      });
      throw new Error(housesError.message);
    }

    if (membersError) {
      logServerError("houses.supabase", "Failed to load house members", {
        userId: user.id,
        message: membersError.message
      });
      throw new Error(membersError.message);
    }

    if (invitesError) {
      logServerError("houses.supabase", "Failed to load house invites", {
        userId: user.id,
        message: invitesError.message
      });
      throw new Error(invitesError.message);
    }

    return (houses ?? []).map((house) =>
      mapHouse({
        house: house as HouseRow,
        members: (members ?? []) as HouseMemberRow[],
        invites: (invites ?? []) as HouseInviteRow[]
      })
    );
  },
  async findByIdForUser(user, houseId) {
    const houses = await this.listByUser(user);
    return houses.find((house) => house.id === houseId) ?? null;
  },
  async createHouse(user, input) {
    const supabase = createSupabaseAdminClient();
    logServerInfo("houses.supabase", "Creating house", {
      userId: user.id,
      houseName: input.name
    });
    const { data: house, error: houseError } = await supabase
      .from("houses")
      .insert({
        name: input.name,
        city: input.city ?? null,
        cover_tone: input.coverTone,
        created_by_user_id: user.id
      })
      .select("id,name,city,cover_tone,created_at")
      .single();

    if (houseError) {
      logServerError("houses.supabase", "Failed to create house", {
        userId: user.id,
        houseName: input.name,
        message: houseError.message
      });
      throw new Error(houseError.message);
    }

    const { error: memberError } = await supabase.from("house_members").insert({
      house_id: house.id,
      user_id: user.id,
      name: user.fullName?.trim() || user.email?.trim() || "You",
      email: user.email ?? null,
      role: "owner"
    });

    if (memberError) {
      logServerError("houses.supabase", "Failed to create owner membership", {
        userId: user.id,
        houseId: house.id,
        message: memberError.message
      });
      throw new Error(memberError.message);
    }

    logServerInfo("houses.supabase", "House created", {
      userId: user.id,
      houseId: house.id
    });

    const created = await this.findByIdForUser(user, house.id);

    if (!created) {
      throw new Error("House was created but could not be loaded.");
    }

    return created;
  },
  async createInvite(user, input) {
    await getManagerRole(input.houseId, user.id);
    const supabase = createSupabaseAdminClient();
    const token = crypto.randomUUID();
    const { error } = await supabase.from("house_invites").insert({
      house_id: input.houseId,
      token,
      label: input.label,
      role: input.role,
      created_by_user_id: user.id
    });

    if (error) {
      throw new Error(error.message);
    }

    const house = await this.findByIdForUser(user, input.houseId);

    if (!house) {
      throw new Error("House not found.");
    }

    return house;
  },
  async updateMemberRole(user, input) {
    const actorRole = await getManagerRole(input.houseId, user.id);
    const supabase = createSupabaseAdminClient();
    const { data: member, error: memberError } = await supabase
      .from("house_members")
      .select("role")
      .eq("house_id", input.houseId)
      .eq("id", input.memberId)
      .maybeSingle();

    if (memberError) {
      throw new Error(memberError.message);
    }

    if (!member) {
      throw new Error("Member not found.");
    }

    if (member.role === "owner") {
      throw new Error("Owner role cannot be changed.");
    }

    if (actorRole === "admin" && member.role === "admin") {
      throw new Error("Admins cannot demote other admins.");
    }

    const { error } = await supabase
      .from("house_members")
      .update({ role: input.role })
      .eq("house_id", input.houseId)
      .eq("id", input.memberId);

    if (error) {
      throw new Error(error.message);
    }

    const house = await this.findByIdForUser(user, input.houseId);

    if (!house) {
      throw new Error("House not found.");
    }

    return house;
  },
  async removeMember(user, input) {
    const actorRole = await getManagerRole(input.houseId, user.id);
    const supabase = createSupabaseAdminClient();
    const { data: member, error: memberError } = await supabase
      .from("house_members")
      .select("role")
      .eq("house_id", input.houseId)
      .eq("id", input.memberId)
      .maybeSingle();

    if (memberError) {
      throw new Error(memberError.message);
    }

    if (!member) {
      throw new Error("Member not found.");
    }

    if (member.role === "owner") {
      throw new Error("Owner cannot be removed.");
    }

    if (actorRole === "admin" && member.role === "admin") {
      throw new Error("Admins cannot remove other admins.");
    }

    const { error } = await supabase
      .from("house_members")
      .delete()
      .eq("house_id", input.houseId)
      .eq("id", input.memberId);

    if (error) {
      throw new Error(error.message);
    }

    const house = await this.findByIdForUser(user, input.houseId);

    if (!house) {
      throw new Error("House not found.");
    }

    return house;
  }
};
