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
  houseRoleLabel,
  sortHouseInvites,
  sortHouseMembers
} from "@/features/houses/application/house-policies";
import type { House } from "@/features/houses/domain/house.types";

type HouseDetailPanelProps = {
  house: House;
  userId: string;
};

const nextAreas = [
  { href: "rooms", label: "Rooms", description: "Phase 5 will organize the house room by room." },
  { href: "items", label: "Items", description: "Items start once the structure of the house is stable." },
  {
    href: "decisions",
    label: "Decisions",
    description: "Collaborative voting lands after items and comparison flows exist."
  }
] as const;

export function HouseDetailPanel({ house, userId }: HouseDetailPanelProps) {
  const currentMember = getHouseMemberForUser(house, userId);
  const stats = getHouseStats(house);
  const members = sortHouseMembers(house.members);
  const invites = sortHouseInvites(house.invites);

  return (
    <div className="grid gap-4">
      <Card className="overflow-hidden p-0">
        <div className={`bg-gradient-to-br ${houseCoverToneClassName[house.coverTone]} p-6`}>
          <SectionHeading
            eyebrow="House workspace"
            title={house.name}
            description={
              house.city
                ? `${house.city} now has a real collaboration foundation with explicit membership and invite controls.`
                : "This house now has a real collaboration foundation with explicit membership and invite controls."
            }
          />
          <div className="mt-4 flex flex-wrap items-center gap-3">
            <Badge variant="neutral">{houseCoverToneLabel[house.coverTone]}</Badge>
            {currentMember ? <Badge variant="primary">{houseRoleLabel[currentMember.role]}</Badge> : null}
            <Chip active>{stats.members} members active</Chip>
          </div>
        </div>
      </Card>

      <div className="grid gap-4 xl:grid-cols-[1.2fr_0.8fr]">
        <Card className="space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="space-y-1">
              <Badge variant="neutral">Members</Badge>
              <h2 className="text-2xl font-semibold tracking-tight">Roles are now house-specific.</h2>
            </div>

            {canManageHouse(house, userId) ? (
              <Link href={`/app/houses/${house.id}/settings`}>
                <Button type="button" variant="outline">
                  Open member settings
                </Button>
              </Link>
            ) : null}
          </div>

          <div className="grid gap-3">
            {members.map((member) => (
              <Card key={member.id} tone="subtle" className="flex flex-wrap items-center justify-between gap-3 p-4">
                <div className="space-y-1">
                  <p className="font-semibold">{member.name}</p>
                  <p className="text-sm text-muted">{member.email ?? "No email captured yet"}</p>
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  {member.userId === userId ? <Badge variant="accent">You</Badge> : null}
                  <Badge variant={member.role === "member" ? "neutral" : "primary"}>
                    {houseRoleLabel[member.role]}
                  </Badge>
                </div>
              </Card>
            ))}
          </div>
        </Card>

        <div className="grid gap-4">
          <Card className="space-y-4" tone="subtle">
            <Badge variant="warning">Invite links</Badge>
            {invites.length ? (
              <div className="space-y-3">
                {invites.map((invite) => (
                  <Card key={invite.id} className="space-y-2 p-4" tone="default">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <p className="font-semibold">{invite.label}</p>
                      <Badge variant="neutral">{houseRoleLabel[invite.role]}</Badge>
                    </div>
                    <p className="break-all text-xs leading-5 text-muted">{invite.inviteUrl}</p>
                  </Card>
                ))}
              </div>
            ) : (
              <p className="text-sm leading-6 text-muted">
                No invite is open yet. Managers can generate one from the settings page.
              </p>
            )}
          </Card>

          <Card className="space-y-4">
            <Badge variant="neutral">Next house surfaces</Badge>
            <div className="grid gap-3">
              {nextAreas.map((area) => (
                <Link key={area.href} href={`/app/houses/${house.id}/${area.href}`}>
                  <Card tone="subtle" className="space-y-2 p-4 transition hover:border-primary/30">
                    <div className="flex items-center justify-between gap-2">
                      <p className="font-semibold">{area.label}</p>
                      <Button type="button" variant="ghost" size="sm">
                        Open
                      </Button>
                    </div>
                    <p className="text-sm leading-6 text-muted">{area.description}</p>
                  </Card>
                </Link>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
