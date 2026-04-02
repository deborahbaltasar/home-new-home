import { Reveal } from "@/design-system/motion/reveal";
import { FeatureCard } from "@/design-system/patterns/feature-card";
import { SectionHeading } from "@/design-system/patterns/section-heading";
import { SectionShell } from "@/design-system/patterns/section-shell";
import { Badge } from "@/design-system/primitives/badge";
import { Button } from "@/design-system/primitives/button";
import { Card } from "@/design-system/primitives/card";
import { Chip } from "@/design-system/primitives/chip";
import { calculatePublicProgress } from "@/features/roadmap/application/calculate-public-progress";
import { derivePublicRoadmap } from "@/features/roadmap/application/derive-public-roadmap";
import { publicRoadmapSeed } from "@/features/roadmap/infrastructure/public-roadmap.seed";
import { technicalChecklistSeed } from "@/features/checklist/infrastructure/technical-checklist.seed";
import { MarketingHeroPreview } from "@/shared/components/marketing-hero-preview";
import { OrbitNoteCard } from "@/shared/components/orbit-note-card";
import {
  ArrowRight,
  Construction,
  LoaderCircle,
  Sparkles
} from "lucide-react";
import type { Route } from "next";
import Link from "next/link";

const marketingLinks: Record<"login" | "roadmap" | "signup", Route> = {
  login: "/login" as Route,
  roadmap: "/roadmap" as Route,
  signup: "/sign-up" as Route
};

const chips = ["rooms", "priorities", "comparisons", "family decisions"];
const useCases = [
  "First apartment",
  "Family renovation",
  "Shared house"
];

const compactRoadmap = (status: string) =>
  status === "Available" ? "success" : status === "In Progress" ? "primary" : "neutral";

export default function MarketingPage() {
  const roadmapEntries = derivePublicRoadmap(publicRoadmapSeed, technicalChecklistSeed);
  const publicProgress = calculatePublicProgress(roadmapEntries);

  return (
    <main className="overflow-hidden">
      <SectionShell className="relative grid gap-10 py-10 lg:grid-cols-[1.04fr_0.96fr] lg:items-center lg:py-20">
        <Reveal className="space-y-6" variant="fadeRight">
          <div className="flex flex-wrap items-center gap-3">
            <Badge variant="primary">Build your home, one decision at a time</Badge>
          </div>

          <div className="space-y-4">
            <h1 className="max-w-3xl text-5xl font-semibold tracking-tight sm:text-6xl lg:text-7xl">
              Build a home plan that actually feels like a home plan.
            </h1>
            <div className="flex flex-wrap gap-2">
              <Chip>Collaborative</Chip>
              <Chip>Easy</Chip>
              <Chip>Fast</Chip>
              <Chip>Fun</Chip>
            </div>
          </div>

          <div id="marketing-hero-ctas" className="flex flex-wrap gap-3">
            <Link href={marketingLinks.signup}>
              <Button size="lg">
                Start planning
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link href={marketingLinks.roadmap}>
              <Button size="lg" variant="outline">
                Explore roadmap
              </Button>
            </Link>
          </div>
        </Reveal>

        <Reveal delay={0.1} variant="scaleIn">
          <div className="relative">
            <MarketingHeroPreview progress={publicProgress} />

          </div>
        </Reveal>
      </SectionShell>

      <SectionShell className="grid gap-6 py-8 lg:grid-cols-[0.9fr_1.1fr]">
        <Reveal variant="fadeRight">
          <SectionHeading
            eyebrow="Organization"
            title="Move between room, category, status, and value."
          />
        </Reveal>
        <div className="grid gap-3 sm:grid-cols-2">
          {[
            ["By room", "Kitchen, bathroom, bedroom"],
            ["By category", "Market, decor, appliances"],
            ["By status", "Want, researching, reserved"],
            ["By priority", "Essential, desirable, optional"]
          ].map(([title, copy], index) => (
            <Reveal key={title} delay={0.05 * (index + 1)} variant={index % 2 === 0 ? "fadeUp" : "scaleIn"}>
              <Card tone="subtle" className="space-y-2">
                <p className="font-semibold">{title}</p>
                <p className="text-sm text-muted">{copy}</p>
              </Card>
            </Reveal>
          ))}
        </div>
      </SectionShell>

      <section className="relative my-12 py-4">
        <Reveal variant="scaleIn">
          <div className="relative">
            <div className="paper-grid-fade" />
            <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
              <div className="grid w-full gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
                <Reveal variant="fadeRight">
                  <div className="space-y-4 lg:mx-auto lg:max-w-md">
                  <h3 className="max-w-lg text-4xl font-semibold tracking-tight text-slate-900 dark:text-slate-50">
                    Sketch your home before it gets overwhelming.
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    <Chip active>Easy</Chip>
                    <Chip>Smart</Chip>
                    <Chip>Collaborative</Chip>
                  </div>
                  </div>
                </Reveal>

                <div className="grid gap-4 sm:grid-cols-3 lg:mx-auto lg:w-full">
                  <Reveal delay={0.04} variant="popIn">
                    <OrbitNoteCard
                      index="01"
                      title="Map rooms"
                      description="kitchen, bath, bedroom"
                      className="rotate-[-2deg]"
                    />
                  </Reveal>
                  <Reveal delay={0.08} variant="popIn">
                    <OrbitNoteCard
                      index="02"
                      title="Tag priorities"
                      description="essential, desirable, optional"
                      dark
                      className="translate-y-4 rotate-[1.5deg]"
                    />
                  </Reveal>
                  <Reveal delay={0.12} variant="popIn">
                    <OrbitNoteCard
                      index="03"
                      title="Decide together"
                      description="compare, vote, share"
                      className="rotate-[-1deg]"
                    />
                  </Reveal>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </section>



      <SectionShell className="grid gap-6 py-8 lg:grid-cols-[0.92fr_1.08fr]">
        <Reveal variant="scaleIn">
          <Card tone="emphasis" className="space-y-4">
            <Badge variant="accent">Decision collaboration</Badge>
            <h3 className="text-3xl font-semibold">Make better decisions, together.</h3>
            <div className="grid gap-3 sm:grid-cols-3">
              <div className="rounded-2xl bg-surface px-4 py-4 text-center">
                <p className="text-lg font-semibold">Poker</p>
              </div>
              <div className="rounded-2xl bg-surface px-4 py-4 text-center">
                <p className="text-lg font-semibold">Compare</p>
              </div>
              <div className="rounded-2xl bg-surface px-4 py-4 text-center">
                <p className="text-lg font-semibold">Resolve</p>
              </div>
            </div>
          </Card>
        </Reveal>
        <div className="grid gap-4 md:grid-cols-3">
          <Reveal delay={0.05} variant="fadeRight">
            <FeatureCard label="Vote" title="Priority poker" description="Vote on priorities." />
          </Reveal>
          <Reveal delay={0.1} variant="popIn">
            <FeatureCard label="Compare" title="This or that" description="Compare options." />
          </Reveal>
          <Reveal delay={0.15} variant="fadeLeft">
            <FeatureCard label="Resolve" title="Shared outcome" description="Act on decisions." />
          </Reveal>
        </div>
      </SectionShell>

      <SectionShell className="grid gap-6 py-8 lg:grid-cols-2">
        <Reveal variant="fadeRight">
          <SectionHeading eyebrow="Know what it really costs you" title="Not just money — your time." />
        </Reveal>
        <Reveal delay={0.08} variant="scaleIn">
          <div className="grid gap-3 sm:grid-cols-3">
            {[
              ["A", "$120", "6.0 hours of your time"],
              ["B", "$185", "9.2 hours of your time"],
              ["C", "$240", "12.0 hours of your time"]
            ].map(([label, value, hours], index) => (
              <Reveal key={label} delay={0.04 * (index + 1)} variant="popIn">
                <Card tone="subtle" className="space-y-1 text-center">
                  <p className="text-sm text-muted">Option {label}</p>
                  <p className="text-2xl font-semibold">{value}</p>
                  <p className="text-sm text-muted">{hours}</p>
                </Card>
              </Reveal>
            ))}
          </div>
        </Reveal>
      </SectionShell>

      <SectionShell className="grid gap-6 py-8 lg:grid-cols-2">
        <Reveal variant="fadeRight">
          <Card className="space-y-4">
            <Badge variant="primary">Smart Gift List</Badge>
            <h3 className="text-3xl font-semibold">Let others be part of your home</h3>
            <div className="flex flex-wrap gap-2">
              <Chip active>Customizable</Chip>
              <Chip>Simple</Chip>
              <Chip>Bookable</Chip>
            </div>
          </Card>
        </Reveal>
        <div className="grid gap-3">
          <Reveal delay={0.05} variant="fadeLeft">
            <Card tone="subtle" className="space-y-2">
              <div className="flex items-center justify-between">
                <p className="font-semibold">Coffee machine</p>
                <Badge variant="success">Reserved by Ana</Badge>
              </div>
              <p className="text-sm text-muted">Public token. Buyer recorded.</p>
            </Card>
          </Reveal>
          <Reveal delay={0.1} variant="fadeLeft">
            <Card tone="subtle" className="space-y-2">
              <div className="flex items-center justify-between">
                <p className="font-semibold">Bathroom mirror</p>
                <Badge variant="neutral">Shared publicly</Badge>
              </div>
              <p className="text-sm text-muted">Visible outside, details stay inside.</p>
            </Card>
          </Reveal>
        </div>
      </SectionShell>

      <SectionShell className="space-y-8 py-8">
        <Reveal variant="fadeUp">
          <SectionHeading
            eyebrow="Roadmap"
            title="Available. Moving. Under construction."
          />
        </Reveal>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {roadmapEntries.slice(0, 5).map((entry, index) => (
            <Reveal
              key={entry.id}
              delay={0.04 * (index + 1)}
              variant={index % 3 === 0 ? "fadeRight" : index % 3 === 1 ? "scaleIn" : "fadeLeft"}
            >
              <Card className="space-y-3">
                <div className="flex items-center justify-between gap-4">
                  <h3 className="text-lg font-semibold">{entry.title}</h3>
                  <Badge variant={compactRoadmap(entry.status)}>
                    {entry.status === "In Progress" ? (
                      <LoaderCircle className="mr-1.5 h-3.5 w-3.5" strokeWidth={2.2} />
                    ) : null}
                    {entry.status === "Coming Soon" ? (
                      <Construction className="mr-1.5 h-3.5 w-3.5" strokeWidth={2.2} />
                    ) : null}
                    {entry.status}
                  </Badge>
                </div>
                <p className="text-sm leading-6 text-muted">{entry.description}</p>
                <div className="h-2 rounded-pill bg-surface-muted">
                  <div
                    className="h-2 rounded-pill bg-primary transition-all"
                    style={{ width: `${entry.completion}%` }}
                  />
                </div>
              </Card>
            </Reveal>
          ))}
        </div>
        <Reveal delay={0.16} variant="popIn">
          <Link href={marketingLinks.roadmap}>
            <Button variant="outline">See full roadmap</Button>
          </Link>
        </Reveal>
      </SectionShell>


    </main>
  );
}
