import { notFound } from "next/navigation";

import { clerkAuthProvider } from "@/integrations/clerk/clerk-auth-provider";
import { getHouseRepository } from "@/features/houses/infrastructure/house-repository-factory";
import { HouseSettingsPanel } from "@/features/houses/presentation/house-settings-panel";

type HouseSettingsPageProps = {
  params: Promise<{ houseId: string }>;
};

export default async function HouseSettingsPage({ params }: HouseSettingsPageProps) {
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

  return <HouseSettingsPanel house={house} userId={user.id} />;
}
