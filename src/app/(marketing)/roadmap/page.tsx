import { SectionHeading } from "@/design-system/patterns/section-heading";
import { derivePublicRoadmap } from "@/features/roadmap/application/derive-public-roadmap";
import { publicRoadmapSeed } from "@/features/roadmap/infrastructure/public-roadmap.seed";
import { technicalChecklistSeed } from "@/features/checklist/infrastructure/technical-checklist.seed";
import { Badge } from "@/design-system/primitives/badge";
import { Card } from "@/design-system/primitives/card";
import { SectionShell } from "@/design-system/patterns/section-shell";

export default function PublicRoadmapPage() {
  const entries = derivePublicRoadmap(publicRoadmapSeed, technicalChecklistSeed);

  return (
    <main>
      <SectionShell className="space-y-6 py-16">
        <SectionHeading
          eyebrow="Public roadmap"
          title="What is taking shape now"
          description="This view is derived from structured implementation progress, but translated into product language."
        />
        <div className="grid gap-4">
          {entries.map((entry) => (
            <Card key={entry.id} className="space-y-3">
              <div className="flex items-center justify-between gap-4">
                <h2 className="text-xl font-semibold">{entry.title}</h2>
                <Badge variant={entry.status === "Available" ? "success" : entry.status === "In Progress" ? "primary" : "neutral"}>
                  {entry.status}
                </Badge>
              </div>
              <p className="text-sm leading-6 text-muted">{entry.description}</p>
              <p className="text-sm font-medium">{entry.completion}% complete</p>
            </Card>
          ))}
        </div>
      </SectionShell>
    </main>
  );
}
