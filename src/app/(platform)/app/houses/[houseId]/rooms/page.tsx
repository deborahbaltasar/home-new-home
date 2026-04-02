import { notFound } from "next/navigation";

import { clerkAuthProvider } from "@/integrations/clerk/clerk-auth-provider";
import { getHouseMemberForUser } from "@/features/houses/application/house-policies";
import { getHouseRepository } from "@/features/houses/infrastructure/house-repository-factory";
import { getOrganizationRepository } from "@/features/organization/infrastructure/organization-repository-factory";
import { HouseOrganizationPanel } from "@/features/organization/presentation/house-organization-panel";

type HouseRoomsPageProps = {
  params: Promise<{ houseId: string }>;
};

export default async function HouseRoomsPage({ params }: HouseRoomsPageProps) {
  const { houseId } = await params;
  const user = await clerkAuthProvider.getCurrentUser();
  const houseRepository = getHouseRepository();
  const organizationRepository = getOrganizationRepository();

  if (!user) {
    return null;
  }

  const house = await houseRepository.findByIdForUser(user, houseId);

  if (!house) {
    notFound();
  }

  const organization = await organizationRepository.getByHouse(user, houseId);
  const currentMember = getHouseMemberForUser(house, user.id);

  return (
    <HouseOrganizationPanel
      house={house}
      organization={organization}
      currentUserRole={currentMember?.role}
    />
  );
}
