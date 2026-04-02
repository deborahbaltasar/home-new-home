import { cookies } from "next/headers";

import type { AuthUser } from "@/integrations/clerk/clerk-boundary";
import type { HouseRepository } from "@/features/houses/domain/house.repository";
import type {
  CreateHouseInput,
  CreateHouseInviteInput,
  House,
  HouseCoverTone,
  HouseMember,
  HouseRole,
  RemoveHouseMemberInput,
  UpdateHouseMemberRoleInput
} from "@/features/houses/domain/house.types";

const COOKIE_NAME = "hnh-houses-v1";

type HouseCookieState = Record<string, House[]>;

function buildId(prefix: string) {
  return `${prefix}-${crypto.randomUUID().slice(0, 8)}`;
}

function slugify(value: string) {
  return value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function getUserLabel(user: AuthUser) {
  return user.fullName?.trim() || user.email?.trim() || "You";
}

function createMember(userId: string, name: string, role: HouseRole, email?: string): HouseMember {
  return {
    id: buildId("member"),
    userId,
    name,
    email,
    role,
    joinedAt: new Date().toISOString()
  };
}

function buildStarterHouses(user: AuthUser): House[] {
  const createdAt = new Date().toISOString();
  const userLabel = getUserLabel(user);
  const atelierHouseId = `house-${slugify(user.id)}-atelier`;
  const weekendHouseId = `house-${slugify(user.id)}-weekend`;

  return [
    {
      id: atelierHouseId,
      name: "Atelier Apartment",
      city: "Sao Paulo",
      coverTone: "coastal",
      createdAt,
      members: [
        createMember(user.id, userLabel, "owner", user.email),
        createMember("camila-architect", "Camila", "admin", "camila@example.com"),
        createMember("leo-roommate", "Leo", "member", "leo@example.com")
      ],
      invites: [
        {
          id: buildId("invite"),
          token: buildId("token"),
          label: "Furniture planner",
          role: "member",
          createdAt,
          createdByUserId: user.id,
          inviteUrl: buildInviteUrl(atelierHouseId, "starter-furniture-planner")
        }
      ]
    },
    {
      id: weekendHouseId,
      name: "Weekend House Upgrade",
      city: "Campos do Jordao",
      coverTone: "stone",
      createdAt,
      members: [
        createMember("marina-owner", "Marina", "owner", "marina@example.com"),
        createMember(user.id, userLabel, "admin", user.email),
        createMember("arthur-brother", "Arthur", "member", "arthur@example.com")
      ],
      invites: []
    }
  ];
}

async function readState() {
  const cookieStore = await cookies();
  const rawValue = cookieStore.get(COOKIE_NAME)?.value;

  if (!rawValue) {
    return {} as HouseCookieState;
  }

  try {
    return JSON.parse(rawValue) as HouseCookieState;
  } catch {
    return {} as HouseCookieState;
  }
}

async function writeState(state: HouseCookieState) {
  const cookieStore = await cookies();

  cookieStore.set(COOKIE_NAME, JSON.stringify(state), {
    httpOnly: true,
    maxAge: 60 * 60 * 24 * 30,
    path: "/",
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production"
  });
}

function getUserHouses(state: HouseCookieState, user: AuthUser) {
  return state[user.id] ? [...state[user.id]] : buildStarterHouses(user);
}

function ensureAccessibleHouse(houses: House[], houseId: string, userId: string) {
  const house = houses.find((candidate) => candidate.id === houseId);

  if (!house) {
    throw new Error("House not found.");
  }

  const membership = house.members.find((member) => member.userId === userId);

  if (!membership) {
    throw new Error("House access denied.");
  }

  return house;
}

function ensureManagerRole(house: House, userId: string) {
  const membership = house.members.find((member) => member.userId === userId);

  if (!membership || (membership.role !== "owner" && membership.role !== "admin")) {
    throw new Error("Only house managers can perform this action.");
  }

  return membership;
}

function buildInviteUrl(houseId: string, token: string) {
  return `/app/houses/${houseId}/settings?invite=${token}`;
}

function normalizeText(value: FormDataEntryValue | string | null | undefined) {
  return typeof value === "string" ? value.trim() : "";
}

function isCoverTone(value: string): value is HouseCoverTone {
  return value === "coastal" || value === "garden" || value === "sunset" || value === "stone";
}

export function parseCreateHouseInput(formData: FormData): CreateHouseInput {
  const name = normalizeText(formData.get("name"));
  const city = normalizeText(formData.get("city"));
  const coverToneValue = normalizeText(formData.get("coverTone"));
  const coverTone = isCoverTone(coverToneValue) ? coverToneValue : "coastal";

  if (!name) {
    throw new Error("House name is required.");
  }

  return {
    name,
    city: city || undefined,
    coverTone
  };
}

export function parseCreateInviteInput(formData: FormData): CreateHouseInviteInput {
  const houseId = normalizeText(formData.get("houseId"));
  const label = normalizeText(formData.get("label"));
  const roleValue = normalizeText(formData.get("role"));

  if (!houseId || !label) {
    throw new Error("Invite data is incomplete.");
  }

  return {
    houseId,
    label,
    role: roleValue === "admin" ? "admin" : "member"
  };
}

export function parseUpdateMemberRoleInput(formData: FormData): UpdateHouseMemberRoleInput {
  const houseId = normalizeText(formData.get("houseId"));
  const memberId = normalizeText(formData.get("memberId"));
  const roleValue = normalizeText(formData.get("role"));

  if (!houseId || !memberId) {
    throw new Error("Member role update is incomplete.");
  }

  return {
    houseId,
    memberId,
    role: roleValue === "admin" ? "admin" : "member"
  };
}

export function parseRemoveMemberInput(formData: FormData): RemoveHouseMemberInput {
  const houseId = normalizeText(formData.get("houseId"));
  const memberId = normalizeText(formData.get("memberId"));

  if (!houseId || !memberId) {
    throw new Error("Member removal is incomplete.");
  }

  return {
    houseId,
    memberId
  };
}

export const cookieHouseRepository: HouseRepository = {
  async listByUser(user) {
    const state = await readState();
    return getUserHouses(state, user).sort((left, right) => right.createdAt.localeCompare(left.createdAt));
  },
  async findByIdForUser(user, houseId) {
    const houses = await this.listByUser(user);
    return houses.find((house) => house.id === houseId) ?? null;
  },
  async createHouse(user, input) {
    const state = await readState();
    const houses = getUserHouses(state, user);
    const createdAt = new Date().toISOString();
    const house: House = {
      id: buildId(`house-${slugify(input.name) || "new-house"}`),
      name: input.name,
      city: input.city,
      coverTone: input.coverTone,
      createdAt,
      members: [createMember(user.id, getUserLabel(user), "owner", user.email)],
      invites: []
    };

    state[user.id] = [house, ...houses];
    await writeState(state);
    return house;
  },
  async createInvite(user, input) {
    const state = await readState();
    const houses = getUserHouses(state, user);
    const house = ensureAccessibleHouse(houses, input.houseId, user.id);
    ensureManagerRole(house, user.id);
    const token = buildId("token");
    const invite = {
      id: buildId("invite"),
      token,
      label: input.label,
      role: input.role,
      createdAt: new Date().toISOString(),
      createdByUserId: user.id,
      inviteUrl: buildInviteUrl(house.id, token)
    };

    const nextHouses = houses.map((candidate) =>
      candidate.id === house.id ? { ...candidate, invites: [invite, ...candidate.invites] } : candidate
    );

    state[user.id] = nextHouses;
    await writeState(state);
    return nextHouses.find((candidate) => candidate.id === house.id) ?? house;
  },
  async updateMemberRole(user, input) {
    const state = await readState();
    const houses = getUserHouses(state, user);
    const house = ensureAccessibleHouse(houses, input.houseId, user.id);
    const actor = ensureManagerRole(house, user.id);
    const member = house.members.find((candidate) => candidate.id === input.memberId);

    if (!member) {
      throw new Error("Member not found.");
    }

    if (member.role === "owner") {
      throw new Error("Owner role cannot be changed.");
    }

    if (actor.role === "admin" && member.role === "admin") {
      throw new Error("Admins cannot demote other admins.");
    }

    const nextHouses = houses.map((candidate) =>
      candidate.id === house.id
        ? {
            ...candidate,
            members: candidate.members.map((houseMember) =>
              houseMember.id === input.memberId ? { ...houseMember, role: input.role } : houseMember
            )
          }
        : candidate
    );

    state[user.id] = nextHouses;
    await writeState(state);
    return nextHouses.find((candidate) => candidate.id === house.id) ?? house;
  },
  async removeMember(user, input) {
    const state = await readState();
    const houses = getUserHouses(state, user);
    const house = ensureAccessibleHouse(houses, input.houseId, user.id);
    const actor = ensureManagerRole(house, user.id);
    const member = house.members.find((candidate) => candidate.id === input.memberId);

    if (!member) {
      throw new Error("Member not found.");
    }

    if (member.role === "owner") {
      throw new Error("Owner cannot be removed.");
    }

    if (actor.role === "admin" && member.role === "admin") {
      throw new Error("Admins cannot remove other admins.");
    }

    const nextHouses = houses.map((candidate) =>
      candidate.id === house.id
        ? {
            ...candidate,
            members: candidate.members.filter((houseMember) => houseMember.id !== input.memberId)
          }
        : candidate
    );

    state[user.id] = nextHouses;
    await writeState(state);
    return nextHouses.find((candidate) => candidate.id === house.id) ?? house;
  }
};
