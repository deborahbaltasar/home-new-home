import { Card } from "@/design-system/primitives/card";
import { calculateOverallProgress } from "@/features/checklist/application/calculate-progress";
import { technicalChecklistSeed } from "@/features/checklist/infrastructure/technical-checklist.seed";

export default function AppHomePage() {
  const progress = calculateOverallProgress(technicalChecklistSeed);

  return (
    <div className="grid gap-4">
      <Card className="space-y-3">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-primary">
          Foundation status
        </p>
        <h1 className="text-3xl font-semibold tracking-tight">Product workspace is initialized.</h1>
        <p className="text-sm leading-6 text-muted">
          This shell is intentionally minimal. It exists to stabilize route contracts and expose
          real scaffold evidence for Phase 0 progress tracking.
        </p>
        <p className="text-sm font-medium">{progress}% of the current seeded phase is complete.</p>
      </Card>
    </div>
  );
}

