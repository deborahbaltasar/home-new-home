import { EmptyStateCard } from "@/shared/components/empty-state-card";

export default function HouseItemsPage() {
  return (
    <EmptyStateCard
      badge="Items"
      title="Items will appear after the house structure exists."
      description="This page is intentionally empty until houses, rooms, and categories are modeled. Phase 3 keeps the route visible and authenticated without pretending item data already exists."
      actionHref="/app/houses"
      actionLabel="Back to houses"
    />
  );
}
