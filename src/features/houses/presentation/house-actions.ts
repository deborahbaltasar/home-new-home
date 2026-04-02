"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { clerkAuthProvider } from "@/integrations/clerk/clerk-auth-provider";
import {
  parseCreateHouseInput,
  parseCreateInviteInput,
  parseRemoveMemberInput,
  parseUpdateMemberRoleInput
} from "@/features/houses/infrastructure/cookie-house-repository";
import { getHouseRepository } from "@/features/houses/infrastructure/house-repository-factory";

async function requireUser() {
  const user = await clerkAuthProvider.getCurrentUser();

  if (!user) {
    throw new Error("Authentication required.");
  }

  return user;
}

export async function createHouseAction(formData: FormData) {
  const user = await requireUser();
  const repository = getHouseRepository();
  const house = await repository.createHouse(user, parseCreateHouseInput(formData));

  revalidatePath("/app");
  revalidatePath("/app/houses");
  redirect(`/app/houses/${house.id}`);
}

export async function createHouseInviteAction(formData: FormData) {
  const user = await requireUser();
  const input = parseCreateInviteInput(formData);
  const repository = getHouseRepository();

  await repository.createInvite(user, input);

  revalidatePath("/app");
  revalidatePath("/app/houses");
  revalidatePath(`/app/houses/${input.houseId}`);
  revalidatePath(`/app/houses/${input.houseId}/settings`);
  redirect(`/app/houses/${input.houseId}/settings`);
}

export async function updateHouseMemberRoleAction(formData: FormData) {
  const user = await requireUser();
  const input = parseUpdateMemberRoleInput(formData);
  const repository = getHouseRepository();

  await repository.updateMemberRole(user, input);

  revalidatePath("/app");
  revalidatePath("/app/houses");
  revalidatePath(`/app/houses/${input.houseId}`);
  revalidatePath(`/app/houses/${input.houseId}/settings`);
  redirect(`/app/houses/${input.houseId}/settings`);
}

export async function removeHouseMemberAction(formData: FormData) {
  const user = await requireUser();
  const input = parseRemoveMemberInput(formData);
  const repository = getHouseRepository();

  await repository.removeMember(user, input);

  revalidatePath("/app");
  revalidatePath("/app/houses");
  revalidatePath(`/app/houses/${input.houseId}`);
  revalidatePath(`/app/houses/${input.houseId}/settings`);
  redirect(`/app/houses/${input.houseId}/settings`);
}
