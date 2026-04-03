import { notFound } from "next/navigation";

import { getHouseMemberForUser } from "@/features/houses/application/house-policies";
import { getHouseRepository } from "@/features/houses/infrastructure/house-repository-factory";
import { getItemRepository } from "@/features/items/infrastructure/item-repository-factory";
import { HouseItemsPanel } from "@/features/items/presentation/house-items-panel";
import { clerkAuthProvider } from "@/integrations/clerk/clerk-auth-provider";
import { getOrganizationRepository } from "@/features/organization/infrastructure/organization-repository-factory";

type HouseItemsPageProps = {
  params: Promise<{ houseId: string }>;
  searchParams?: Promise<{ view?: string; edit?: string; addOption?: string; roomId?: string }>;
};

function isView(value: string | undefined): value is "all" | "essentials" | "open" | "completed" {
  return value === "all" || value === "essentials" || value === "open" || value === "completed";
}

export default async function HouseItemsPage({ params, searchParams }: HouseItemsPageProps) {
  const { houseId } = await params;
  const resolvedSearchParams = searchParams ? await searchParams : undefined;
  const user = await clerkAuthProvider.getCurrentUser();
  const houseRepository = getHouseRepository();
  const organizationRepository = getOrganizationRepository();
  const itemRepository = getItemRepository();

  if (!user) {
    return null;
  }

  const house = await houseRepository.findByIdForUser(user, houseId);

  if (!house) {
    notFound();
  }

  const [organization, items] = await Promise.all([
    organizationRepository.getByHouse(user, houseId),
    itemRepository.listByHouse(user, houseId)
  ]);
  const currentMember = getHouseMemberForUser(house, user.id);
  const activeView = isView(resolvedSearchParams?.view) ? resolvedSearchParams.view : "all";
  const activeEditItemId = resolvedSearchParams?.edit?.trim() || undefined;
  const activeAddStoreOptionItemId = resolvedSearchParams?.addOption?.trim() || undefined;
  const selectedRoomId = resolvedSearchParams?.roomId?.trim() || undefined;

  return (
    <HouseItemsPanel
      house={house}
      organization={organization}
      items={items}
      currentUserRole={currentMember?.role}
      activeView={activeView}
      activeEditItemId={activeEditItemId}
      activeAddStoreOptionItemId={activeAddStoreOptionItemId}
      selectedRoomId={selectedRoomId}
    />
  );
}
