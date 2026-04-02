import { MarketingAmbientOrbs } from "@/shared/components/marketing-ambient-orbs";
import { MarketingStickyCtas } from "@/shared/components/marketing-sticky-ctas";
import { SiteFooter } from "@/shared/components/site-footer";
import { ThemeToggle } from "@/shared/components/theme-toggle";
import type { ReactNode } from "react";

type MarketingLayoutProps = {
  children: ReactNode;
};

export default function MarketingLayout({ children }: MarketingLayoutProps) {
  return (
    <div className="relative flex min-h-screen flex-col">
      <MarketingAmbientOrbs />
      <header className="sticky top-0 z-20 border-b border-border/60 bg-surface/75 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.26em] text-muted sm:text-sm">
              Home New Home
            </p>
          </div>
          <div className="flex items-end gap-3">
            <MarketingStickyCtas />
            <ThemeToggle />
          </div>
        </div>
      </header>
      <main className="relative z-10 flex flex-1 flex-col">{children}</main>
      <SiteFooter />
    </div>
  );
}
