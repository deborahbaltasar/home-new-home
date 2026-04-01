import { ThemeToggle } from "@/shared/components/theme-toggle";
import type { Route } from "next";
import Link from "next/link";
import type { ReactNode } from "react";

type PlatformLayoutProps = {
  children: ReactNode;
};

const navItems: Array<{ href: Route; label: string }> = [
  { href: "/app", label: "Overview" },
  { href: "/app/houses", label: "Houses" }
];

export default function PlatformLayout({ children }: PlatformLayoutProps) {
  return (
    <div className="min-h-screen">
      <header className="border-b border-border/60 bg-surface/80 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-muted">Platform shell</p>
            <p className="text-sm font-semibold">Home planning workspace</p>
          </div>
          <ThemeToggle />
        </div>
      </header>
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-6 sm:px-6 lg:flex-row">
        <aside className="w-full rounded-[1.75rem] border border-border bg-surface/70 p-4 shadow-soft lg:w-72">
          <nav className="flex flex-col gap-2">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-2xl px-4 py-3 text-sm font-medium text-muted transition hover:bg-surface-muted hover:text-foreground"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </aside>
        <main className="min-w-0 flex-1">{children}</main>
      </div>
    </div>
  );
}
