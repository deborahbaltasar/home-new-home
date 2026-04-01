import { ThemeToggle } from "@/shared/components/theme-toggle";
import type { ReactNode } from "react";

type MarketingLayoutProps = {
  children: ReactNode;
};

export default function MarketingLayout({ children }: MarketingLayoutProps) {
  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-20 border-b border-border/60 bg-surface/80 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-muted">Home New Home</p>
            <p className="text-sm font-semibold">Build your home, one decision at a time</p>
          </div>
          <ThemeToggle />
        </div>
      </header>
      {children}
    </div>
  );
}

