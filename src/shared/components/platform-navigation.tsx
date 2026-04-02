"use client";

import { UserButton, useClerk } from "@clerk/nextjs";
import { Home, House } from "lucide-react";
import type { Route } from "next";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { ThemeToggle } from "@/shared/components/theme-toggle";
import { cn } from "@/shared/lib/cn";

type PlatformNavigationProps = {
  userEmail?: string;
  userLabel: string;
};

const navItems: Array<{ href: Route; label: string; icon: typeof Home }> = [
  { href: "/app", label: "Overview", icon: Home },
  { href: "/app/houses", label: "Houses", icon: House }
];

export function PlatformNavigation({ userEmail, userLabel }: PlatformNavigationProps) {
  const pathname = usePathname();
  const clerk = useClerk();
  const userButton = (
    <UserButton
      userProfileMode="navigation"
      userProfileUrl="/app/profile"
      customMenuItems={[
        {
          label: "Profile",
          href: "/app/profile"
        },
        {
          label: "Sign out",
          onClick: () => void clerk.signOut({ redirectUrl: "/" })
        }
      ]}
      appearance={{
        elements: {
          userButtonTrigger:
            "h-10 w-10 rounded-full border border-border-strong bg-surface/85 shadow-soft transition hover:border-primary/30 hover:shadow-glow focus:shadow-glow focus:outline-none",
          avatarBox: "h-10 w-10 rounded-full",
          userButtonPopoverCard:
            "border border-border bg-background/96 shadow-soft backdrop-blur",
          userPreviewMainIdentifierText: "text-foreground",
          userPreviewSecondaryIdentifier: "text-muted",
          userButtonPopoverActionButton:
            "text-foreground hover:text-foreground data-[active=true]:text-foreground",
          userButtonPopoverActionButtonIcon: "text-muted",
          userButtonPopoverFooter: "text-foreground"
        }
      }}
    />
  );

  return (
    <>
      <header className="sticky top-0 z-20 border-b border-border/60 bg-background/88 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-4 sm:px-6">
          <div className="flex min-w-0 items-center gap-6">
            <div className="min-w-0">
              <p className="text-xs uppercase tracking-[0.3em] text-muted">Home New Home</p>
              <p className="truncate text-sm font-semibold">{userLabel}</p>
            </div>

            <nav className="hidden items-center gap-2 lg:flex">
              {navItems.map((item) => {
                const isActive =
                  pathname === item.href || (item.href !== "/app" && pathname.startsWith(item.href));
                const Icon = item.icon;

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "flex items-center gap-2 rounded-pill px-4 py-2 text-sm font-medium transition",
                      isActive
                        ? "bg-primary/10 text-primary"
                        : "text-muted hover:bg-surface-muted hover:text-foreground"
                    )}
                  >
                    <Icon className="h-4 w-4" />
                    {item.label}
                  </Link>
                );
              })}
            </nav>
          </div>
          <div className="flex items-center gap-3">
            <ThemeToggle />
            <div className="hidden shrink-0 sm:block">
              {userButton}
            </div>
          </div>
        </div>
      </header>

      <nav className="fixed inset-x-4 bottom-4 z-30 rounded-[1.75rem] border border-border bg-surface/95 p-2 shadow-soft backdrop-blur lg:hidden">
        <div className="flex items-center gap-2">
          {navItems.map((item) => {
            const isActive =
              pathname === item.href || (item.href !== "/app" && pathname.startsWith(item.href));
            const Icon = item.icon;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex min-h-14 flex-1 flex-col items-center justify-center gap-1 rounded-2xl px-3 text-xs font-semibold transition",
                  isActive
                    ? "bg-primary text-primary-foreground"
                    : "text-muted hover:bg-surface-muted hover:text-foreground"
                )}
              >
                <Icon className="h-4 w-4" />
                {item.label}
              </Link>
            );
          })}
          <div className="shrink-0 rounded-2xl bg-background/70 p-2">
            {userButton}
          </div>
        </div>
      </nav>
    </>
  );
}
