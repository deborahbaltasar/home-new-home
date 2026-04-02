import { SectionShell } from "@/design-system/patterns/section-shell";
import { Badge } from "@/design-system/primitives/badge";
import { Button } from "@/design-system/primitives/button";
import { Card } from "@/design-system/primitives/card";

type AuthConfigStateProps = {
  compact?: boolean;
  ctaHref?: string;
};

export function AuthConfigState({ compact = false, ctaHref = "/" }: AuthConfigStateProps) {
  const content = (
    <Card className={compact ? "space-y-4" : "mx-auto max-w-lg space-y-4"} tone="subtle">
      <Badge variant="warning">Clerk setup required</Badge>
      <div className="space-y-2">
        <h1 className="text-2xl font-semibold tracking-tight">
          Add Clerk keys to unlock the authenticated workspace.
        </h1>
        <p className="text-sm leading-6 text-muted">
          Phase 3 now has the provider, route guards, and auth screens wired. Set
          `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` and `CLERK_SECRET_KEY` to enter `/app`
          with the real session flow.
        </p>
      </div>
      <div className="flex flex-wrap gap-3">
        <a href={ctaHref}>
          <Button type="button">Back to landing</Button>
        </a>
        <code className="rounded-2xl border border-border bg-background/80 px-3 py-2 text-xs text-muted">
          .env.example
        </code>
      </div>
    </Card>
  );

  if (compact) {
    return content;
  }

  return <SectionShell className="py-16">{content}</SectionShell>;
}
