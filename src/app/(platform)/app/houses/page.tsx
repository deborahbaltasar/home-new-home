import { clerkAuthProvider } from "@/integrations/clerk/clerk-auth-provider";
import { getHouseRepository } from "@/features/houses/infrastructure/house-repository-factory";
import { HousesOverview } from "@/features/houses/presentation/houses-overview";

export default async function HousesPage() {
  const user = await clerkAuthProvider.getCurrentUser();
  const repository = getHouseRepository();

  if (!user) {
    return null;
  }

  const houses = await repository.listByUser(user);

  return <HousesOverview houses={houses} userId={user.id} />;
}
