import { clerkAuthProvider } from "@/integrations/clerk/clerk-auth-provider";
import { cookieHouseRepository } from "@/features/houses/infrastructure/cookie-house-repository";
import { HousesOverview } from "@/features/houses/presentation/houses-overview";

export default async function HousesPage() {
  const user = await clerkAuthProvider.getCurrentUser();

  if (!user) {
    return null;
  }

  const houses = await cookieHouseRepository.listByUser(user);

  return <HousesOverview houses={houses} userId={user.id} />;
}
