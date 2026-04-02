import { notFound } from "next/navigation";

import { clerkAuthProvider } from "@/integrations/clerk/clerk-auth-provider";
import { getHouseRepository } from "@/features/houses/infrastructure/house-repository-factory";
import { HouseDetailPanel } from "@/features/houses/presentation/house-detail-panel";

type HouseDetailPageProps = {
  params: Promise<{ houseId: string }>;
};

export default async function HouseDetailPage({ params }: HouseDetailPageProps) {
  const { houseId } = await params;
  const user = await clerkAuthProvider.getCurrentUser();
  const repository = getHouseRepository();

  if (!user) {
    return null;
  }

  const house = await repository.findByIdForUser(user, houseId);

  if (!house) {
    notFound();
  }

  return <HouseDetailPanel house={house} userId={user.id} />;
}
