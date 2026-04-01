import { derivePublicRoadmap } from "@/features/roadmap/application/derive-public-roadmap";
import { publicRoadmapSeed } from "@/features/roadmap/infrastructure/public-roadmap.seed";
import { technicalChecklistSeed } from "@/features/checklist/infrastructure/technical-checklist.seed";
import { Card } from "@/design-system/primitives/card";
import { SectionShell } from "@/design-system/patterns/section-shell";

export default function PublicRoadmapPage() {
  const entries = derivePublicRoadmap(publicRoadmapSeed, technicalChecklistSeed);

  return (
    <main>
      <SectionShell className="space-y-6 py-16">
        <div className="space-y-2">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-primary">
            Public roadmap
          </p>
          <h1 className="text-4xl font-semibold tracking-tight">What is taking shape now</h1>
        </div>
        <div className="grid gap-4">
          {entries.map((entry) => (
            <Card key={entry.id} className="space-y-3">
              <div className="flex items-center justify-between gap-4">
                <h2 className="text-xl font-semibold">{entry.title}</h2>
                <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                  {entry.status}
                </span>
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

