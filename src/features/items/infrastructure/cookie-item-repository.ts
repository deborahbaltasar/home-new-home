import { cookies } from "next/headers";

import type { AuthUser } from "@/integrations/clerk/clerk-boundary";
import type { ItemRepository } from "@/features/items/domain/item.repository";
import type {
  CreateItemInput,
  CreateItemStoreOptionInput,
  DeleteItemInput,
  DeleteItemStoreOptionInput,
  Item,
  ItemEssentiality,
  ItemPriority,
  ItemStatus,
  ItemStoreOption,
  UpdateItemInput,
  UpdateItemStoreOptionInput
} from "@/features/items/domain/item.types";

const COOKIE_NAME = "hnh-items-v1";

type ItemCookieState = Record<string, Item[]>;

function buildId(prefix: string) {
  return `${prefix}-${crypto.randomUUID().slice(0, 8)}`;
}

function normalizeText(value: FormDataEntryValue | string | null | undefined) {
  return typeof value === "string" ? value.trim() : "";
}

function normalizeOptional(value: FormDataEntryValue | string | null | undefined) {
  const normalized = normalizeText(value);
  return normalized || undefined;
}

function normalizeAttachmentUrls(value: FormDataEntryValue | string | null | undefined) {
  const normalized = normalizeText(value);

  if (!normalized) {
    return [] as string[];
  }

  return normalized
    .split(/\r?\n/)
    .map((entry) => entry.trim())
    .filter(Boolean);
}

function isItemPriority(value: string): value is ItemPriority {
  return value === "now" || value === "next" || value === "later";
}

function isItemEssentiality(value: string): value is ItemEssentiality {
  return value === "essential" || value === "helpful" || value === "optional";
}

function isItemStatus(value: string): value is ItemStatus {
  return (
    value === "planning" ||
    value === "researching" ||
    value === "ready_to_buy" ||
    value === "reserved" ||
    value === "purchased"
  );
}

function parseQuantity(value: FormDataEntryValue | string | null | undefined) {
  const parsed = Number.parseInt(normalizeText(value), 10);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : 1;
}

function parseMoney(value: FormDataEntryValue | string | null | undefined) {
  const normalized = normalizeText(value).replace(",", ".");
  const parsed = Number.parseFloat(normalized);

  return Number.isFinite(parsed) && parsed >= 0 ? parsed : undefined;
}

function parseNullableMoney(value: FormDataEntryValue | string | null | undefined) {
  const normalized = normalizeText(value);

  if (!normalized) {
    return null;
  }

  return parseMoney(normalized);
}

async function readState() {
  const cookieStore = await cookies();
  const rawValue = cookieStore.get(COOKIE_NAME)?.value;

  if (!rawValue) {
    return {} as ItemCookieState;
  }

  try {
    return JSON.parse(rawValue) as ItemCookieState;
  } catch {
    return {} as ItemCookieState;
  }
}

async function writeState(state: ItemCookieState) {
  const cookieStore = await cookies();
  cookieStore.set(COOKIE_NAME, JSON.stringify(state), {
    httpOnly: true,
    maxAge: 60 * 60 * 24 * 30,
    path: "/",
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production"
  });
}

function ensureHouseState(state: ItemCookieState, houseId: string) {
  return state[houseId] ?? [];
}

export function parseCreateItemInput(formData: FormData): CreateItemInput {
  const houseId = normalizeText(formData.get("houseId"));
  const name = normalizeText(formData.get("name"));

  if (!houseId || !name) {
    throw new Error("Item data is incomplete.");
  }

  const priorityValue = normalizeText(formData.get("priority"));
  const essentialityValue = normalizeText(formData.get("essentiality"));
  const statusValue = normalizeText(formData.get("status"));

  return {
    houseId,
    roomId: normalizeOptional(formData.get("roomId")),
    categoryId: normalizeOptional(formData.get("categoryId")),
    name,
    notes: normalizeOptional(formData.get("notes")),
    priority: isItemPriority(priorityValue) ? priorityValue : "next",
    essentiality: isItemEssentiality(essentialityValue) ? essentialityValue : "helpful",
    quantity: parseQuantity(formData.get("quantity")),
    status: isItemStatus(statusValue) ? statusValue : "planning",
    targetPrice: parseMoney(formData.get("targetPrice")),
    imageUrl: normalizeOptional(formData.get("imageUrl")),
    attachmentUrls: normalizeAttachmentUrls(formData.get("attachmentUrls"))
  };
}

export function parseDeleteItemInput(formData: FormData): DeleteItemInput {
  const houseId = normalizeText(formData.get("houseId"));
  const itemId = normalizeText(formData.get("itemId"));

  if (!houseId || !itemId) {
    throw new Error("Item deletion is incomplete.");
  }

  return { houseId, itemId };
}

export function parseUpdateItemInput(formData: FormData): UpdateItemInput {
  const houseId = normalizeText(formData.get("houseId"));
  const itemId = normalizeText(formData.get("itemId"));

  if (!houseId || !itemId) {
    throw new Error("Item update is incomplete.");
  }

  const nextPriority = normalizeText(formData.get("priority"));
  const nextEssentiality = normalizeText(formData.get("essentiality"));
  const nextStatus = normalizeText(formData.get("status"));
  const quantityRaw = normalizeText(formData.get("quantity"));

  return {
    houseId,
    itemId,
    roomId: normalizeOptional(formData.get("roomId")),
    categoryId: normalizeOptional(formData.get("categoryId")),
    name: normalizeOptional(formData.get("name")),
    notes: normalizeOptional(formData.get("notes")),
    priority: isItemPriority(nextPriority) ? nextPriority : undefined,
    essentiality: isItemEssentiality(nextEssentiality) ? nextEssentiality : undefined,
    quantity: quantityRaw ? parseQuantity(quantityRaw) : undefined,
    status: isItemStatus(nextStatus) ? nextStatus : undefined,
    targetPrice: formData.has("targetPrice")
      ? parseNullableMoney(formData.get("targetPrice"))
      : undefined,
    imageUrl: normalizeOptional(formData.get("imageUrl")),
    attachmentUrls: formData.has("attachmentUrls")
      ? normalizeAttachmentUrls(formData.get("attachmentUrls"))
      : undefined
  };
}

export function parseCreateStoreOptionInput(formData: FormData): CreateItemStoreOptionInput {
  const houseId = normalizeText(formData.get("houseId"));
  const itemId = normalizeText(formData.get("itemId"));
  const storeName = normalizeText(formData.get("storeName"));
  const price = parseMoney(formData.get("price"));

  if (!houseId || !itemId || !storeName || price === undefined) {
    throw new Error("Store option data is incomplete.");
  }

  return {
    houseId,
    itemId,
    storeName,
    productUrl: normalizeOptional(formData.get("productUrl")),
    price,
    notes: normalizeOptional(formData.get("notes"))
  };
}

export function parseUpdateStoreOptionInput(formData: FormData): UpdateItemStoreOptionInput {
  const houseId = normalizeText(formData.get("houseId"));
  const itemId = normalizeText(formData.get("itemId"));
  const optionId = normalizeText(formData.get("optionId"));

  if (!houseId || !itemId || !optionId) {
    throw new Error("Store option update is incomplete.");
  }

  return {
    houseId,
    itemId,
    optionId,
    storeName: normalizeOptional(formData.get("storeName")),
    productUrl: normalizeOptional(formData.get("productUrl")),
    price: formData.has("price") ? parseMoney(formData.get("price")) : undefined,
    notes: normalizeOptional(formData.get("notes"))
  };
}

export function parseDeleteStoreOptionInput(formData: FormData): DeleteItemStoreOptionInput {
  const houseId = normalizeText(formData.get("houseId"));
  const itemId = normalizeText(formData.get("itemId"));
  const optionId = normalizeText(formData.get("optionId"));

  if (!houseId || !itemId || !optionId) {
    throw new Error("Store option deletion is incomplete.");
  }

  return { houseId, itemId, optionId };
}

export const cookieItemRepository: ItemRepository = {
  async listByHouse(_user: AuthUser, houseId: string) {
    const state = await readState();
    return ensureHouseState(state, houseId);
  },
  async createItem(_user, input) {
    const state = await readState();
    const houseItems = ensureHouseState(state, input.houseId);
    const timestamp = new Date().toISOString();
    const nextItems = [
      ...houseItems,
      {
        id: buildId("item"),
        houseId: input.houseId,
        roomId: input.roomId,
        categoryId: input.categoryId,
        name: input.name,
        notes: input.notes,
        priority: input.priority,
        essentiality: input.essentiality,
        quantity: input.quantity,
        status: input.status,
        targetPrice: input.targetPrice,
        imageUrl: input.imageUrl,
        attachmentUrls: input.attachmentUrls,
        storeOptions: [],
        createdAt: timestamp,
        updatedAt: timestamp
      }
    ];

    state[input.houseId] = nextItems;
    await writeState(state);
    return nextItems;
  },
  async updateItem(_user, input) {
    const state = await readState();
    const houseItems = ensureHouseState(state, input.houseId);
    const nextItems = houseItems.map((item) =>
      item.id === input.itemId
        ? {
            ...item,
            roomId: input.roomId ?? item.roomId,
            categoryId: input.categoryId ?? item.categoryId,
            name: input.name ?? item.name,
            notes: input.notes ?? item.notes,
            priority: input.priority ?? item.priority,
            essentiality: input.essentiality ?? item.essentiality,
            quantity: input.quantity ?? item.quantity,
            status: input.status ?? item.status,
            targetPrice:
              input.targetPrice === undefined ? item.targetPrice : input.targetPrice ?? undefined,
            imageUrl: input.imageUrl ?? item.imageUrl,
            attachmentUrls: input.attachmentUrls ?? item.attachmentUrls,
            updatedAt: new Date().toISOString()
          }
        : item
    );

    state[input.houseId] = nextItems;
    await writeState(state);
    return nextItems;
  },
  async deleteItem(_user, input) {
    const state = await readState();
    const nextItems = ensureHouseState(state, input.houseId).filter((item) => item.id !== input.itemId);
    state[input.houseId] = nextItems;
    await writeState(state);
    return nextItems;
  },
  async createStoreOption(_user, input) {
    const state = await readState();
    const timestamp = new Date().toISOString();
    const nextItems = ensureHouseState(state, input.houseId).map((item) =>
      item.id === input.itemId
        ? {
            ...item,
            storeOptions: [
              ...item.storeOptions,
              {
                id: buildId("store-option"),
                houseId: input.houseId,
                itemId: input.itemId,
                storeName: input.storeName,
                productUrl: input.productUrl,
                price: input.price,
                notes: input.notes,
                createdAt: timestamp,
                updatedAt: timestamp
              } satisfies ItemStoreOption
            ],
            updatedAt: timestamp
          }
        : item
    );

    state[input.houseId] = nextItems;
    await writeState(state);
    return nextItems;
  },
  async updateStoreOption(_user, input) {
    const state = await readState();
    const timestamp = new Date().toISOString();
    const nextItems = ensureHouseState(state, input.houseId).map((item) =>
      item.id === input.itemId
        ? {
            ...item,
            storeOptions: item.storeOptions.map((option) =>
              option.id === input.optionId
                ? {
                    ...option,
                    storeName: input.storeName ?? option.storeName,
                    productUrl: input.productUrl ?? option.productUrl,
                    price: input.price ?? option.price,
                    notes: input.notes ?? option.notes,
                    updatedAt: timestamp
                  }
                : option
            ),
            updatedAt: timestamp
          }
        : item
    );

    state[input.houseId] = nextItems;
    await writeState(state);
    return nextItems;
  },
  async deleteStoreOption(_user, input) {
    const state = await readState();
    const timestamp = new Date().toISOString();
    const nextItems = ensureHouseState(state, input.houseId).map((item) =>
      item.id === input.itemId
        ? {
            ...item,
            storeOptions: item.storeOptions.filter((option) => option.id !== input.optionId),
            updatedAt: timestamp
          }
        : item
    );

    state[input.houseId] = nextItems;
    await writeState(state);
    return nextItems;
  }
};
