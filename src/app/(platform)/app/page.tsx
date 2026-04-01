import { SectionHeading } from "@/design-system/patterns/section-heading";
import { Badge } from "@/design-system/primitives/badge";
import { Card } from "@/design-system/primitives/card";
import { Chip } from "@/design-system/primitives/chip";
import { calculateOverallProgress } from "@/features/checklist/application/calculate-progress";
import { technicalChecklistSeed } from "@/features/checklist/infrastructure/technical-checklist.seed";
import { themeContract } from "@/design-system/themes/theme-contract";

export default function AppHomePage() {
  const progress = calculateOverallProgress(technicalChecklistSeed);

  return (
    <div className="grid gap-4">
      <SectionHeading
        eyebrow="Workspace"
        title="The shell is ready for feature implementation."
        description="Phase 1 focused on system quality: visual consistency, reusable primitives, and a stronger product language."
      />
      <Card className="space-y-4">
        <div className="flex flex-wrap items-center gap-3">
          <Badge variant="primary">Progress {progress}%</Badge>
          <Chip active>{themeContract.guidelines.positioning.tone}</Chip>
        </div>
        <p className="text-sm leading-6 text-muted">
          The next implementation step is not another placeholder page. It is using this system to
          build the real marketing narrative and then wire authentication into a shell that already
          feels like the product.
        </p>
      </Card>
    </div>
  );
}
