import { redirect } from "next/navigation";
import type { Route } from "next";
import type { ReactNode } from "react";

import { clerkAuthProvider } from "@/integrations/clerk/clerk-auth-provider";
import { PlatformNavigation } from "@/shared/components/platform-navigation";
import { SiteFooter } from "@/shared/components/site-footer";

type PlatformLayoutProps = {
  children: ReactNode;
};

export default async function PlatformLayout({ children }: PlatformLayoutProps) {
  const user = await clerkAuthProvider.getCurrentUser();

  if (!user) {
    redirect("/login" as Route);
  }

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <PlatformNavigation
        userLabel="Build your home, one decision at a time"
      />
      <div className="mx-auto w-full max-w-6xl flex-1 px-4 py-6 pb-36 sm:px-6 lg:pb-6">
        <main className="min-w-0 flex-1">{children}</main>
      </div>
      <div className="pb-28 lg:pb-0">
        <SiteFooter />
      </div>
    </div>
  );
}
