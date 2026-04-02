import { SectionHeading } from "@/design-system/patterns/section-heading";
import { Badge } from "@/design-system/primitives/badge";
import { Button } from "@/design-system/primitives/button";
import { Card } from "@/design-system/primitives/card";
import { Chip } from "@/design-system/primitives/chip";
import { themeContract } from "@/design-system/themes/theme-contract";
import { calculateOverallProgress } from "@/features/checklist/application/calculate-progress";
import { technicalChecklistSeed } from "@/features/checklist/infrastructure/technical-checklist.seed";
import { getHouseRepository } from "@/features/houses/infrastructure/house-repository-factory";
import { clerkAuthProvider } from "@/integrations/clerk/clerk-auth-provider";

export default async function AppHomePage() {
  const progress = calculateOverallProgress(technicalChecklistSeed);
  const user = await clerkAuthProvider.getCurrentUser();
  const repository = getHouseRepository();
  const houses = user ? await repository.listByUser(user) : [];
  const quickStart = [
    "Open an active house workspace",
    "Review admin roles and invite links",
    "Move next into rooms and categories"
  ];

  return (
    <div className="grid gap-4">
      <SectionHeading
        eyebrow="Workspace"
        title="The workspace now carries real house collaboration instead of shell-only guidance."
        description="Phase 4 adds house creation, multiple homes, cover styles, member roles, and invite links so the platform can move into room and item structure next."
      />

      <div className="grid gap-4 xl:grid-cols-[1.5fr_1fr]">
        <Card className="space-y-5">
          <div className="flex flex-wrap items-center gap-3">
            <Badge variant="primary">Progress {progress}%</Badge>
            <Chip active>{themeContract.guidelines.positioning.tone}</Chip>
            <Badge variant="success">Phase 4 shipped</Badge>
          </div>

          <div className="space-y-2">
            <h2 className="text-2xl font-semibold tracking-tight">House foundation live</h2>
            <p className="text-sm leading-6 text-muted">
              The platform now exposes active houses with collaboration structure in place. The next
              phase can focus on rooms and categories instead of shell plumbing.
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
            <li>{houses.length} houses are now available in the authenticated workspace.</li>
            <li>Member roles are explicit per house and support multiple admins.</li>
            <li>Invite links are generated from the house settings surface.</li>
          </ul>
        </Card>
      </div>

      <Card className="space-y-4" tone="subtle">
        <Badge variant="accent">Next slice</Badge>
        <h2 className="text-2xl font-semibold tracking-tight">Rooms and categories should land next.</h2>
        <p className="max-w-3xl text-sm leading-6 text-muted">
          Houses are now concrete entities with memberships and invites. The dependency-ordered next
          step is to let each house organize planning by room and category.
        </p>
        <div>
          <a href="/app/houses">
            <Button type="button" variant="outline">
              Review house workspaces
            </Button>
          </a>
        </div>
      </Card>
    </div>
  );
}
