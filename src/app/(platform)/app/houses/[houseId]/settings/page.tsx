import { EmptyStateCard } from "@/shared/components/empty-state-card";

export default function HouseSettingsPage() {
  return (
    <EmptyStateCard
      badge="Settings"
      title="House settings will unlock once a real house exists."
      description="Admins, cover media, and invite controls belong to the Houses phase. This empty state keeps the future surface visible without leaking unfinished behavior."
      actionHref="/app/houses"
      actionLabel="Back to houses"
    />
  );
}
