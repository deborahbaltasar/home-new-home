"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { clerkAuthProvider } from "@/integrations/clerk/clerk-auth-provider";
import {
  parseCreateCategoryInput,
  parseCreateRoomInput,
  parseDeleteCategoryInput,
  parseDeleteRoomInput
} from "@/features/organization/infrastructure/cookie-organization-repository";
import { getOrganizationRepository } from "@/features/organization/infrastructure/organization-repository-factory";

async function requireUser() {
  const user = await clerkAuthProvider.getCurrentUser();

  if (!user) {
    throw new Error("Authentication required.");
  }

  return user;
}

function revalidateHouseOrganization(houseId: string) {
  revalidatePath(`/app/houses/${houseId}`);
  revalidatePath(`/app/houses/${houseId}/rooms`);
}

export async function createRoomAction(formData: FormData) {
  const user = await requireUser();
  const input = parseCreateRoomInput(formData);
  const repository = getOrganizationRepository();

  await repository.createRoom(user, input);
  revalidateHouseOrganization(input.houseId);
  redirect(`/app/houses/${input.houseId}/rooms`);
}

export async function deleteRoomAction(formData: FormData) {
  const user = await requireUser();
  const input = parseDeleteRoomInput(formData);
  const repository = getOrganizationRepository();

  await repository.deleteRoom(user, input);
  revalidateHouseOrganization(input.houseId);
  redirect(`/app/houses/${input.houseId}/rooms`);
}

export async function createCategoryAction(formData: FormData) {
  const user = await requireUser();
  const input = parseCreateCategoryInput(formData);
  const repository = getOrganizationRepository();

  await repository.createCategory(user, input);
  revalidateHouseOrganization(input.houseId);
  redirect(`/app/houses/${input.houseId}/rooms`);
}

export async function deleteCategoryAction(formData: FormData) {
  const user = await requireUser();
  const input = parseDeleteCategoryInput(formData);
  const repository = getOrganizationRepository();

  await repository.deleteCategory(user, input);
  revalidateHouseOrganization(input.houseId);
  redirect(`/app/houses/${input.houseId}/rooms`);
}
