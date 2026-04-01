import { Button } from "@/design-system/primitives/button";
import { Card } from "@/design-system/primitives/card";
import { SectionShell } from "@/design-system/patterns/section-shell";
import type { Route } from "next";
import Link from "next/link";

const roadmapHighlights = [
  "Organization by rooms, categories, and priorities",
  "Collaborative decision flows for the household",
  "Purchase comparison and cost in work hours",
  "Public sharing for reservations and gifts"
];

const marketingLinks: Record<"login" | "roadmap", Route> = {
  login: "/login" as Route,
  roadmap: "/roadmap" as Route
};

export default function MarketingPage() {
  return (
    <main>
      <SectionShell className="grid gap-8 py-16 lg:grid-cols-[1.2fr_0.8fr] lg:py-24">
        <div className="space-y-6">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-primary">
            Premium home planning
          </p>
          <h1 className="max-w-xl text-4xl font-semibold tracking-tight sm:text-6xl">
            Build your home, one decision at a time.
          </h1>
          <p className="max-w-xl text-base leading-7 text-muted sm:text-lg">
            Organize your home setup by rooms, priorities, categories, and decisions.
            Keep everyone aligned without falling into the chaos of a generic task app.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link href={marketingLinks.login}>
              <Button>Enter the app</Button>
            </Link>
            <Link href={marketingLinks.roadmap}>
              <Button variant="outline">View public roadmap</Button>
            </Link>
          </div>
        </div>
        <Card className="space-y-5 bg-[linear-gradient(180deg,rgba(37,99,235,0.14),rgba(255,255,255,0.04))]">
          <p className="text-sm font-semibold text-primary">What the first release is shaping into</p>
          <div className="space-y-3">
            {roadmapHighlights.map((item) => (
              <div
                key={item}
                className="rounded-2xl border border-border/80 bg-surface-muted/60 px-4 py-3 text-sm"
              >
                {item}
              </div>
            ))}
          </div>
          <p className="text-sm leading-6 text-muted">
            The landing is intentionally light at this stage. The full marketing narrative belongs
            to Phase 2, after the design system is finalized.
          </p>
        </Card>
      </SectionShell>
    </main>
  );
}
