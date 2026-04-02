import { EmptyStateCard } from "@/shared/components/empty-state-card";

type HouseDetailPageProps = {
  params: Promise<{ houseId: string }>;
};

export default async function HouseDetailPage({ params }: HouseDetailPageProps) {
  const { houseId } = await params;

  return (
    <EmptyStateCard
      badge={`House ${houseId}`}
      title="House workspace reserved for the first real house flow."
      description="The route contract is active, authenticated, and ready for Phase 4. Once houses exist, this screen becomes the hub for rooms, items, decisions, and settings."
      actionHref="/app/houses"
      actionLabel="Back to houses"
    />
  );
}
