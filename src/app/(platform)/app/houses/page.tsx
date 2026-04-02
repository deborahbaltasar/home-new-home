import { EmptyStateCard } from "@/shared/components/empty-state-card";

export default function HousesPage() {
  return (
    <EmptyStateCard
      badge="Houses"
      title="Your first house has not been created yet."
      description="Phase 4 will add house creation, multiple homes per user, members, admins, and invite links. The authenticated shell now reserves the correct entry point and shows a focused empty state instead of a dead-end screen."
      actionHref="/app"
      actionLabel="Back to overview"
      secondary={
        <span className="rounded-2xl border border-border bg-background/80 px-3 py-2 text-xs text-muted">
          Next slice: create the first house and invite collaborators.
        </span>
      }
    />
  );
}
