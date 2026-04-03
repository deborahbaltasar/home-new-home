import { notFound } from "next/navigation";

import { clerkAuthProvider } from "@/integrations/clerk/clerk-auth-provider";
import { getHouseRepository } from "@/features/houses/infrastructure/house-repository-factory";
import { getItemRepository } from "@/features/items/infrastructure/item-repository-factory";
import { getOrganizationRepository } from "@/features/organization/infrastructure/organization-repository-factory";
import { HouseDetailPanel } from "@/features/houses/presentation/house-detail-panel";

type HouseDetailPageProps = {
  params: Promise<{ houseId: string }>;
  searchParams?: Promise<{ progress?: string }>;
};

export default async function HouseDetailPage({ params, searchParams }: HouseDetailPageProps) {
  const { houseId } = await params;
  const resolvedSearchParams = searchParams ? await searchParams : undefined;
  const user = await clerkAuthProvider.getCurrentUser();
  const repository = getHouseRepository();
  const organizationRepository = getOrganizationRepository();
  const itemRepository = getItemRepository();

  if (!user) {
    return null;
  }

  const house = await repository.findByIdForUser(user, houseId);

  if (!house) {
    notFound();
  }

  const [organization, items] = await Promise.all([
    organizationRepository.getByHouse(user, houseId),
    itemRepository.listByHouse(user, houseId)
  ]);

  return (
    <HouseDetailPanel
      house={house}
      userId={user.id}
      organization={organization}
      items={items}
      activeProgressView={resolvedSearchParams?.progress}
    />
  );
}
