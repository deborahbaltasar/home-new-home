"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { clerkAuthProvider } from "@/integrations/clerk/clerk-auth-provider";
import {
  parseCreateItemInput,
  parseCreateStoreOptionInput,
  parseDeleteItemInput,
  parseDeleteStoreOptionInput,
  parseUpdateItemInput
} from "@/features/items/infrastructure/cookie-item-repository";
import { getItemRepository } from "@/features/items/infrastructure/item-repository-factory";

async function requireUser() {
  const user = await clerkAuthProvider.getCurrentUser();

  if (!user) {
    throw new Error("Authentication required.");
  }

  return user;
}

function revalidateHouseItems(houseId: string) {
  revalidatePath(`/app/houses/${houseId}`);
  revalidatePath(`/app/houses/${houseId}/rooms`);
  revalidatePath(`/app/houses/${houseId}/items`);
}

export async function createItemAction(formData: FormData) {
  const user = await requireUser();
  const input = parseCreateItemInput(formData);
  const repository = getItemRepository();

  await repository.createItem(user, input);
  revalidateHouseItems(input.houseId);
  redirect(`/app/houses/${input.houseId}/items`);
}

export async function updateItemAction(formData: FormData) {
  const user = await requireUser();
  const input = parseUpdateItemInput(formData);
  const repository = getItemRepository();

  await repository.updateItem(user, input);
  revalidateHouseItems(input.houseId);
  redirect(`/app/houses/${input.houseId}/items`);
}

export async function deleteItemAction(formData: FormData) {
  const user = await requireUser();
  const input = parseDeleteItemInput(formData);
  const repository = getItemRepository();

  await repository.deleteItem(user, input);
  revalidateHouseItems(input.houseId);
  redirect(`/app/houses/${input.houseId}/items`);
}

export async function createStoreOptionAction(formData: FormData) {
  const user = await requireUser();
  const input = parseCreateStoreOptionInput(formData);
  const repository = getItemRepository();

  await repository.createStoreOption(user, input);
  revalidateHouseItems(input.houseId);
  redirect(`/app/houses/${input.houseId}/items?edit=${input.itemId}`);
}

export async function deleteStoreOptionAction(formData: FormData) {
  const user = await requireUser();
  const input = parseDeleteStoreOptionInput(formData);
  const repository = getItemRepository();

  await repository.deleteStoreOption(user, input);
  revalidateHouseItems(input.houseId);
  redirect(`/app/houses/${input.houseId}/items?edit=${input.itemId}`);
}

export async function updateItemStatusAction(input: {
  houseId: string;
  itemId: string;
  status: "planning" | "purchased";
}) {
  const user = await requireUser();
  const repository = getItemRepository();

  await repository.updateItem(user, {
    houseId: input.houseId,
    itemId: input.itemId,
    status: input.status
  });
  revalidateHouseItems(input.houseId);
}
