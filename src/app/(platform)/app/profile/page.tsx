import { UserProfile } from "@clerk/nextjs";

import { SectionHeading } from "@/design-system/patterns/section-heading";

export default function ProfilePage() {
  return (
    <div className="grid gap-6">
      <SectionHeading
        eyebrow="Profile"
        title="Manage your account"
        description="Update your profile, security settings, and session preferences from the authenticated workspace."
      />
      <div className="overflow-hidden rounded-[1.75rem] border border-border bg-surface/80 p-2 shadow-soft">
        <UserProfile path="/app/profile" routing="path" />
      </div>
    </div>
  );
}
