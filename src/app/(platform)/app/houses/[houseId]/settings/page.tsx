import { notFound } from "next/navigation";

import { clerkAuthProvider } from "@/integrations/clerk/clerk-auth-provider";
import { cookieHouseRepository } from "@/features/houses/infrastructure/cookie-house-repository";
import { HouseSettingsPanel } from "@/features/houses/presentation/house-settings-panel";

type HouseSettingsPageProps = {
  params: Promise<{ houseId: string }>;
};

export default async function HouseSettingsPage({ params }: HouseSettingsPageProps) {
  const { houseId } = await params;
  const user = await clerkAuthProvider.getCurrentUser();

  if (!user) {
    return null;
  }

  const house = await cookieHouseRepository.findByIdForUser(user, houseId);

  if (!house) {
    notFound();
  }

  return <HouseSettingsPanel house={house} userId={user.id} />;
}
