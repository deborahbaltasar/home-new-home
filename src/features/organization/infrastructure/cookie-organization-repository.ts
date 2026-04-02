import { cookies } from "next/headers";

import type { AuthUser } from "@/integrations/clerk/clerk-boundary";
import type { OrganizationRepository } from "@/features/organization/domain/organization.repository";
import type {
  Category,
  CreateCategoryInput,
  CreateRoomInput,
  DeleteCategoryInput,
  DeleteRoomInput,
  HouseOrganization,
  Room,
  RoomColor
} from "@/features/organization/domain/organization.types";

const COOKIE_NAME = "hnh-organization-v1";

type OrganizationCookieState = Record<
  string,
  {
    rooms: Room[];
    categories: Category[];
  }
>;

function buildId(prefix: string) {
  return `${prefix}-${crypto.randomUUID().slice(0, 8)}`;
}

async function readState() {
  const cookieStore = await cookies();
  const rawValue = cookieStore.get(COOKIE_NAME)?.value;

  if (!rawValue) {
    return {} as OrganizationCookieState;
  }

  try {
    return JSON.parse(rawValue) as OrganizationCookieState;
  } catch {
    return {} as OrganizationCookieState;
  }
}

async function writeState(state: OrganizationCookieState) {
  const cookieStore = await cookies();
  cookieStore.set(COOKIE_NAME, JSON.stringify(state), {
    httpOnly: true,
    maxAge: 60 * 60 * 24 * 30,
    path: "/",
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production"
  });
}

function ensureHouseState(state: OrganizationCookieState, houseId: string) {
  return state[houseId] ?? { rooms: [], categories: [] };
}

function normalizeText(value: FormDataEntryValue | string | null | undefined) {
  return typeof value === "string" ? value.trim() : "";
}

function isRoomColor(value: string): value is RoomColor {
  return value === "sand" || value === "sky" || value === "sage" || value === "terracotta" || value === "slate";
}

export function parseCreateRoomInput(formData: FormData): CreateRoomInput {
  const houseId = normalizeText(formData.get("houseId"));
  const name = normalizeText(formData.get("name"));
  const colorValue = normalizeText(formData.get("color"));

  if (!houseId || !name) {
    throw new Error("Room data is incomplete.");
  }

  return {
    houseId,
    name,
    color: isRoomColor(colorValue) ? colorValue : "sand"
  };
}

export function parseDeleteRoomInput(formData: FormData): DeleteRoomInput {
  const houseId = normalizeText(formData.get("houseId"));
  const roomId = normalizeText(formData.get("roomId"));

  if (!houseId || !roomId) {
    throw new Error("Room deletion is incomplete.");
  }

  return { houseId, roomId };
}

export function parseCreateCategoryInput(formData: FormData): CreateCategoryInput {
  const houseId = normalizeText(formData.get("houseId"));
  const name = normalizeText(formData.get("name"));

  if (!houseId || !name) {
    throw new Error("Category data is incomplete.");
  }

  return { houseId, name };
}

export function parseDeleteCategoryInput(formData: FormData): DeleteCategoryInput {
  const houseId = normalizeText(formData.get("houseId"));
  const categoryId = normalizeText(formData.get("categoryId"));

  if (!houseId || !categoryId) {
    throw new Error("Category deletion is incomplete.");
  }

  return { houseId, categoryId };
}

export const cookieOrganizationRepository: OrganizationRepository = {
  async getByHouse(_user: AuthUser, houseId: string) {
    const state = await readState();
    return ensureHouseState(state, houseId);
  },
  async createRoom(_user, input) {
    const state = await readState();
    const houseState = ensureHouseState(state, input.houseId);
    const nextState = {
      ...houseState,
      rooms: [
        ...houseState.rooms,
        {
          id: buildId("room"),
          houseId: input.houseId,
          name: input.name,
          color: input.color,
          createdAt: new Date().toISOString()
        }
      ]
    };

    state[input.houseId] = nextState;
    await writeState(state);
    return nextState;
  },
  async deleteRoom(_user, input) {
    const state = await readState();
    const houseState = ensureHouseState(state, input.houseId);
    const nextState = {
      ...houseState,
      rooms: houseState.rooms.filter((room) => room.id !== input.roomId)
    };

    state[input.houseId] = nextState;
    await writeState(state);
    return nextState;
  },
  async createCategory(_user, input) {
    const state = await readState();
    const houseState = ensureHouseState(state, input.houseId);
    const nextState = {
      ...houseState,
      categories: [
        ...houseState.categories,
        {
          id: buildId("category"),
          houseId: input.houseId,
          name: input.name,
          createdAt: new Date().toISOString()
        }
      ]
    };

    state[input.houseId] = nextState;
    await writeState(state);
    return nextState;
  },
  async deleteCategory(_user, input) {
    const state = await readState();
    const houseState = ensureHouseState(state, input.houseId);
    const nextState = {
      ...houseState,
      categories: houseState.categories.filter((category) => category.id !== input.categoryId)
    };

    state[input.houseId] = nextState;
    await writeState(state);
    return nextState;
  }
};
