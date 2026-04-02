import { notFound } from "next/navigation";

import { clerkAuthProvider } from "@/integrations/clerk/clerk-auth-provider";
import { cookieHouseRepository } from "@/features/houses/infrastructure/cookie-house-repository";
import { HouseDetailPanel } from "@/features/houses/presentation/house-detail-panel";

type HouseDetailPageProps = {
  params: Promise<{ houseId: string }>;
};

export default async function HouseDetailPage({ params }: HouseDetailPageProps) {
  const { houseId } = await params;
  const user = await clerkAuthProvider.getCurrentUser();

  if (!user) {
    return null;
  }

  const house = await cookieHouseRepository.findByIdForUser(user, houseId);

  if (!house) {
    notFound();
  }

  return <HouseDetailPanel house={house} userId={user.id} />;
}
