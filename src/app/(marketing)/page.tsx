import { FeatureCard } from "@/design-system/patterns/feature-card";
import { SectionHeading } from "@/design-system/patterns/section-heading";
import { SectionShell } from "@/design-system/patterns/section-shell";
import { Badge } from "@/design-system/primitives/badge";
import { Button } from "@/design-system/primitives/button";
import { Card } from "@/design-system/primitives/card";
import { Chip } from "@/design-system/primitives/chip";
import { Sheet } from "@/design-system/primitives/sheet";
import { Tabs } from "@/design-system/primitives/tabs";
import type { Route } from "next";
import Link from "next/link";

const marketingLinks: Record<"login" | "roadmap", Route> = {
  login: "/login" as Route,
  roadmap: "/roadmap" as Route
};

const organizationChips = ["Kitchen", "Bathroom", "Decor", "Essentials", "Market"];
const previewTabs = [
  { id: "rooms", label: "Rooms" },
  { id: "priorities", label: "Priority" },
  { id: "budget", label: "Budget" }
];

export default function MarketingPage() {
  return (
    <main>
      <SectionShell className="grid gap-8 py-14 lg:grid-cols-[1.15fr_0.85fr] lg:items-center lg:py-24">
        <div className="space-y-6">
          <Badge variant="primary">Phase 1 foundation live</Badge>
          <div className="space-y-4">
            <h1 className="max-w-3xl text-5xl font-semibold tracking-tight sm:text-6xl">
              A calmer, cleaner system for building your home.
            </h1>
            <p className="max-w-2xl text-base leading-7 text-muted sm:text-lg">
              Home New Home helps you decide what matters, compare what to buy, and organize the
              house with a visual language shaped for rooms, priorities, and family decisions.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link href={marketingLinks.login}>
              <Button size="lg">Enter the app</Button>
            </Link>
            <Link href={marketingLinks.roadmap}>
              <Button size="lg" variant="outline">
                View public roadmap
              </Button>
            </Link>
          </div>
          <div className="flex flex-wrap gap-2">
            {organizationChips.map((chip, index) => (
              <Chip key={chip} active={index === 0}>
                {chip}
              </Chip>
            ))}
          </div>
        </div>

        <Card tone="emphasis" className="space-y-5 p-6 sm:p-7">
          <div className="flex items-start justify-between gap-4">
            <div className="space-y-1">
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-primary">
                Home Overview
              </p>
              <h2 className="text-2xl font-semibold">Apartment Setup</h2>
            </div>
            <Badge variant="success">46% planned</Badge>
          </div>
          <Tabs items={previewTabs} activeId="rooms" />
          <div className="grid gap-3">
            <Card tone="subtle" className="space-y-2">
              <div className="flex items-center justify-between">
                <p className="font-semibold">Kitchen essentials</p>
                <Badge variant="warning">Researching</Badge>
              </div>
              <p className="text-sm text-muted">7 items still missing, 2 shared publicly.</p>
            </Card>
            <Card tone="subtle" className="space-y-2">
              <div className="flex items-center justify-between">
                <p className="font-semibold">Living room lighting</p>
                <Badge variant="accent">Priority B</Badge>
              </div>
              <p className="text-sm text-muted">Compare 3 stores and decide together this week.</p>
            </Card>
          </div>
          <Sheet className="bg-canvas/80">
            <div className="space-y-2">
              <p className="text-sm font-semibold text-foreground">Design system direction</p>
              <p className="text-sm leading-6 text-muted">
                Premium, domestic, practical. Blue leads. Orange only accents. Layout breathes on
                mobile before it expands.
              </p>
            </div>
          </Sheet>
        </Card>
      </SectionShell>

      <SectionShell className="space-y-8 pb-16">
        <SectionHeading
          eyebrow="Design System"
          title="Phase 1 now defines the product language."
          description="The goal here is not feature volume. It is creating a stable visual and structural system that keeps the product coherent as new flows are added."
        />
        <div className="grid gap-4 md:grid-cols-3">
          <FeatureCard
            label="Tokens"
            title="Semantic palette and type scale"
            description="Color, spacing, radius, shadow, typography, and motion now live in a centralized theme contract."
          />
          <FeatureCard
            label="Primitives"
            title="Reusable UI blocks"
            description="Buttons, cards, badges, tabs, chips, sheets, and section heading patterns are ready for reuse across marketing and product surfaces."
          />
          <FeatureCard
            label="Guidelines"
            title="Clear visual guardrails"
            description="The repo now contains explicit rules for tone, spacing, mobile composition, and motion so the interface stays specific to home planning."
          />
        </div>
      </SectionShell>
    </main>
  );
}
