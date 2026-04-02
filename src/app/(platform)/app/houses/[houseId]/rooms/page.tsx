import { EmptyStateCard } from "@/shared/components/empty-state-card";

export default function HouseRoomsPage() {
  return (
    <EmptyStateCard
      badge="Rooms"
      title="Rooms arrive right after house creation."
      description="The route is live so the shell and navigation can settle now. Phase 5 will replace this empty state with room CRUD and home organization views."
      actionHref="/app/houses"
      actionLabel="Back to houses"
    />
  );
}
