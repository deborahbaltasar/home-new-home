"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { clerkAuthProvider } from "@/integrations/clerk/clerk-auth-provider";
import {
  parseCreateItemInput,
  parseDeleteItemInput,
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
