import { EmptyStateCard } from "@/shared/components/empty-state-card";

export default function HouseDecisionsPage() {
  return (
    <EmptyStateCard
      badge="Decisions"
      title="Collaborative decisions depend on the house and item foundations first."
      description="Realtime-ready decision flows stay deferred, but the authenticated route is already in place so later work does not need route churn."
      actionHref="/app/houses"
      actionLabel="Back to houses"
    />
  );
}
