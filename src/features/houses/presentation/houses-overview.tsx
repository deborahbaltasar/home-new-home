import Link from "next/link";

import { SectionHeading } from "@/design-system/patterns/section-heading";
import { Badge } from "@/design-system/primitives/badge";
import { Button } from "@/design-system/primitives/button";
import { Card } from "@/design-system/primitives/card";
import { Chip } from "@/design-system/primitives/chip";
import {
  canManageHouse,
  getHouseMemberForUser,
  getHouseStats,
  houseCoverToneClassName,
  houseCoverToneLabel,
  houseRoleLabel
} from "@/features/houses/application/house-policies";
import type { House } from "@/features/houses/domain/house.types";
import { createHouseAction } from "@/features/houses/presentation/house-actions";

type HousesOverviewProps = {
  houses: House[];
  userId: string;
};

const inputClassName =
  "min-h-11 rounded-2xl border border-border bg-background/80 px-4 text-sm text-foreground outline-none transition placeholder:text-muted focus:border-primary/40";

const coverToneOptions = ["coastal", "garden", "sunset", "stone"] as const;

export function HousesOverview({ houses, userId }: HousesOverviewProps) {
  return (
    <div className="grid gap-4">
      <SectionHeading
        eyebrow="Houses"
        title="Create homes, keep roles clear, and share invite links from one place."
        description="Phase 4 turns the shell into a real collaboration surface. Houses now carry cover styles, memberships, admin roles, and invite contracts without leaking those rules into shared UI."
      />

      <div className="grid gap-4 xl:grid-cols-[1.3fr_1fr]">
        <Card className="space-y-4">
          <div className="flex flex-wrap items-center gap-3">
            <Badge variant="success">Phase 4 shipped</Badge>
            <Chip active>{houses.length} active houses</Chip>
          </div>

          <div className="space-y-2">
            <h2 className="text-2xl font-semibold tracking-tight">Create the next house workspace</h2>
            <p className="max-w-2xl text-sm leading-6 text-muted">
              Add another home whenever planning splits across moves, renovations, or weekend
              projects. Every new house starts with a clear owner and dedicated invite controls.
            </p>
          </div>

          <form action={createHouseAction} className="grid gap-3 lg:grid-cols-[1.1fr_0.9fr_0.8fr_auto]">
            <input
              className={inputClassName}
              type="text"
              name="name"
              placeholder="House name"
              aria-label="House name"
              required
            />
            <input
              className={inputClassName}
              type="text"
              name="city"
              placeholder="City or context"
              aria-label="City or context"
            />
            <select className={inputClassName} name="coverTone" aria-label="Cover tone" defaultValue="coastal">
              {coverToneOptions.map((coverTone) => (
                <option key={coverTone} value={coverTone}>
                  {houseCoverToneLabel[coverTone]}
                </option>
              ))}
            </select>
            <Button type="submit">Create house</Button>
          </form>
        </Card>

        <Card className="space-y-4" tone="subtle">
          <Badge variant="neutral">Collaboration baseline</Badge>
          <ul className="space-y-3 text-sm leading-6 text-muted">
            <li>Owners and admins are explicit and sorted above members.</li>
            <li>Each house holds its own pending invite links and role target.</li>
            <li>Cover tones give each home a recognizable visual identity immediately.</li>
          </ul>
        </Card>
      </div>

      <div className="grid gap-4 xl:grid-cols-2">
        {houses.map((house) => {
          const currentMember = getHouseMemberForUser(house, userId);
          const stats = getHouseStats(house);

          return (
            <Card key={house.id} className="overflow-hidden p-0">
              <div
                className={`h-32 bg-gradient-to-br ${houseCoverToneClassName[house.coverTone]} px-5 py-4`}
              >
                <div className="flex h-full items-start justify-between gap-3">
                  <Badge variant="neutral">{houseCoverToneLabel[house.coverTone]}</Badge>
                  {currentMember ? <Badge variant="primary">{houseRoleLabel[currentMember.role]}</Badge> : null}
                </div>
              </div>

              <div className="space-y-5 p-5">
                <div className="space-y-2">
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="text-xl font-semibold tracking-tight">{house.name}</h3>
                    {house.city ? <Chip active={false}>{house.city}</Chip> : null}
                  </div>
                  <p className="text-sm leading-6 text-muted">
                    {stats.members} members, {stats.admins} admins, {stats.invites} active invite
                    {stats.invites === 1 ? "" : "s"}.
                  </p>
                </div>

                <div className="grid gap-3 sm:grid-cols-3">
                  <Card tone="subtle" className="space-y-1 p-4">
                    <Badge variant="accent">Members</Badge>
                    <p className="text-lg font-semibold">{stats.members}</p>
                  </Card>
                  <Card tone="subtle" className="space-y-1 p-4">
                    <Badge variant="neutral">Admins</Badge>
                    <p className="text-lg font-semibold">{stats.admins}</p>
                  </Card>
                  <Card tone="subtle" className="space-y-1 p-4">
                    <Badge variant="warning">Invites</Badge>
                    <p className="text-lg font-semibold">{stats.invites}</p>
                  </Card>
                </div>

                <div className="flex flex-wrap gap-3">
                  <Link href={`/app/houses/${house.id}`}>
                    <Button type="button">Open house</Button>
                  </Link>
                  {canManageHouse(house, userId) ? (
                    <Link href={`/app/houses/${house.id}/settings`}>
                      <Button type="button" variant="outline">
                        Manage members
                      </Button>
                    </Link>
                  ) : null}
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
