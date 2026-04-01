import { Card } from "@/design-system/primitives/card";

type HouseDetailPageProps = {
  params: Promise<{ houseId: string }>;
};

export default async function HouseDetailPage({ params }: HouseDetailPageProps) {
  const { houseId } = await params;

  return (
    <Card className="space-y-2">
      <h1 className="text-2xl font-semibold">House {houseId}</h1>
      <p className="text-sm leading-6 text-muted">
        This route is reserved for the house workspace and downstream views.
      </p>
    </Card>
  );
}

