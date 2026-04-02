import { Reveal } from "@/design-system/motion/reveal";
import { SectionHeading } from "@/design-system/patterns/section-heading";
import { SectionShell } from "@/design-system/patterns/section-shell";
import { Badge } from "@/design-system/primitives/badge";
import { Card } from "@/design-system/primitives/card";
import { calculatePublicProgress } from "@/features/roadmap/application/calculate-public-progress";
import { derivePublicRoadmap } from "@/features/roadmap/application/derive-public-roadmap";
import { publicRoadmapSeed } from "@/features/roadmap/infrastructure/public-roadmap.seed";
import { technicalChecklistSeed } from "@/features/checklist/infrastructure/technical-checklist.seed";
import { Construction, LoaderCircle } from "lucide-react";

export default function PublicRoadmapPage() {
  const entries = derivePublicRoadmap(publicRoadmapSeed, technicalChecklistSeed);
  const overallProgress = calculatePublicProgress(entries);
  const availableCount = entries.filter((entry) => entry.status === "Available").length;
  const inProgressCount = entries.filter((entry) => entry.status === "In Progress").length;

  return (
    <main>
      <SectionShell className="space-y-8 py-16">
        <Reveal>
          <SectionHeading
            eyebrow="Public roadmap"
            title="What is taking shape now"
            description="This view is derived from structured implementation progress, but translated into product language."
          />
        </Reveal>

        <div className="grid gap-4 md:grid-cols-3">
          <Reveal delay={0.05}>
            <Card className="space-y-2">
              <p className="text-sm text-muted">Overall product progress</p>
              <p className="text-4xl font-semibold">{overallProgress}%</p>
            </Card>
          </Reveal>
          <Reveal delay={0.1}>
            <Card className="space-y-2">
              <p className="text-sm text-muted">Available</p>
              <p className="text-4xl font-semibold">{availableCount}</p>
            </Card>
          </Reveal>
          <Reveal delay={0.15}>
            <Card className="space-y-2">
              <p className="text-sm text-muted">In progress</p>
              <p className="text-4xl font-semibold">{inProgressCount}</p>
            </Card>
          </Reveal>
        </div>

        <div className="grid gap-4">
          {entries.map((entry, index) => (
            <Reveal key={entry.id} delay={0.03 * (index + 1)}>
              <Card className="space-y-3">
                <div className="flex items-center justify-between gap-4">
                  <h2 className="text-xl font-semibold">{entry.title}</h2>
                  <Badge
                    variant={
                      entry.status === "Available"
                        ? "success"
                        : entry.status === "In Progress"
                          ? "primary"
                          : "neutral"
                    }
                  >
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
                <div className="space-y-2">
                  <div className="h-2 rounded-pill bg-surface-muted">
                    <div
                      className="h-2 rounded-pill bg-primary transition-all"
                      style={{ width: `${entry.completion}%` }}
                    />
                  </div>
                  <p className="text-sm font-medium">{entry.completion}% complete</p>
                </div>
              </Card>
            </Reveal>
          ))}
        </div>

      </SectionShell>
    </main>
  );
}
