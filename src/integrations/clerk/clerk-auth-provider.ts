import { auth } from "@clerk/nextjs/server";

import type { AuthProviderBoundary, AuthUser } from "@/integrations/clerk/clerk-boundary";

function toAuthUser(userId: string | null): AuthUser | null {
  if (!userId) {
    return null;
  }

  return {
    id: userId
  };
}

export const clerkAuthProvider: AuthProviderBoundary = {
  async getCurrentUser() {
    const { userId } = await auth();
    return toAuthUser(userId);
  }
};
