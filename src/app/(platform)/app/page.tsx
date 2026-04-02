import { SectionHeading } from "@/design-system/patterns/section-heading";
import { Badge } from "@/design-system/primitives/badge";
import { Button } from "@/design-system/primitives/button";
import { Card } from "@/design-system/primitives/card";
import { Chip } from "@/design-system/primitives/chip";
import { themeContract } from "@/design-system/themes/theme-contract";
import { calculateOverallProgress } from "@/features/checklist/application/calculate-progress";
import { technicalChecklistSeed } from "@/features/checklist/infrastructure/technical-checklist.seed";
import { EmptyStateCard } from "@/shared/components/empty-state-card";

export default function AppHomePage() {
  const progress = calculateOverallProgress(technicalChecklistSeed);
  const quickStart = [
    "Create your first house shell",
    "Invite the people helping with planning",
    "Start organizing by room and category"
  ];

  return (
    <div className="grid gap-4">
      <SectionHeading
        eyebrow="Workspace"
        title="The authenticated shell is live and ready for the first real home setup."
        description="Phase 3 now covers sign-in, route protection, mobile-first navigation, and first-run guidance so the app can move into houses and membership."
      />

      <div className="grid gap-4 xl:grid-cols-[1.5fr_1fr]">
        <Card className="space-y-5">
          <div className="flex flex-wrap items-center gap-3">
            <Badge variant="primary">Progress {progress}%</Badge>
            <Chip active>{themeContract.guidelines.positioning.tone}</Chip>
            <Badge variant="success">Phase 3 shipped</Badge>
          </div>

          <div className="space-y-2">
            <h2 className="text-2xl font-semibold tracking-tight">Quick start onboarding</h2>
            <p className="text-sm leading-6 text-muted">
              The workspace no longer stops at a placeholder. It explains what comes next and keeps
              the user moving toward the first real house setup.
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-3">
            {quickStart.map((step, index) => (
              <Card key={step} tone={index === 0 ? "emphasis" : "subtle"} className="space-y-2 p-4">
                <Badge variant={index === 0 ? "accent" : "neutral"}>Step 0{index + 1}</Badge>
                <p className="text-sm font-semibold leading-6">{step}</p>
              </Card>
            ))}
          </div>

          <div className="flex flex-wrap gap-3">
            <a href="/app/houses">
              <Button type="button">Go to houses</Button>
            </a>
            <a href="/roadmap">
              <Button type="button" variant="outline">
                Review roadmap
              </Button>
            </a>
          </div>
        </Card>

        <Card className="space-y-4" tone="subtle">
          <Badge variant="neutral">What changed</Badge>
          <ul className="space-y-3 text-sm leading-6 text-muted">
            <li>Real Clerk screens now live on `/login` and `/sign-up`.</li>
            <li>All `/app` routes are guarded from unauthenticated access.</li>
            <li>The shell now works comfortably on mobile with bottom navigation.</li>
          </ul>
        </Card>
      </div>

      <EmptyStateCard
        badge="Initial state"
        title="No house exists yet, so the app starts with a guided empty state."
        description="Phase 4 will replace this card with house creation and invitation flows. For now, the shell keeps the user oriented and points directly to the next meaningful action."
        actionHref="/app/houses"
        actionLabel="Open houses area"
        secondary={
          <span className="rounded-2xl border border-border bg-background/80 px-3 py-2 text-xs text-muted">
            Empty states are contextual instead of generic placeholders.
          </span>
        }
      />
    </div>
  );
}
