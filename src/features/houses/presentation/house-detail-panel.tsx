import Link from "next/link";
import { Plus, Settings2 } from "lucide-react";

import { SectionHeading } from "@/design-system/patterns/section-heading";
import { Badge } from "@/design-system/primitives/badge";
import { Button } from "@/design-system/primitives/button";
import { Card } from "@/design-system/primitives/card";
import { Chip } from "@/design-system/primitives/chip";
import {
  canManageHouse,
  getHouseCompletionPercentage,
  getHouseMemberForUser,
  getHouseStats,
  houseCoverToneClassName,
  houseCoverToneLabel,
  houseRoleLabel,
  sortHouseInvites,
  sortHouseMembers
} from "@/features/houses/application/house-policies";
import type { House } from "@/features/houses/domain/house.types";
import { HouseProgressPanel } from "@/features/houses/presentation/house-progress-panel";
import type { Item } from "@/features/items/domain/item.types";
import type { HouseOrganization } from "@/features/organization/domain/organization.types";

type HouseDetailPanelProps = {
  house: House;
  userId: string;
  organization: HouseOrganization;
  items: Item[];
  activeProgressView?: string;
};

const nextAreas = [
  {
    href: "rooms",
    label: "Rooms",
    description: "The house structure is now organized by live rooms and categories."
  },
  {
    href: "items",
    label: "Items",
    description: "Items now connect quantity, status, and priority to the house structure."
  },
  {
    href: "decisions",
    label: "Decisions",
    description: "Collaborative voting lands after items and comparison flows exist."
  }
] as const;

function getMemberInitials(name: string) {
  const parts = name
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2);

  if (parts.length === 0) {
    return "?";
  }

  return parts.map((part) => part[0]?.toUpperCase() ?? "").join("");
}

export function HouseDetailPanel({
  house,
  userId,
  organization,
  items,
  activeProgressView
}: HouseDetailPanelProps) {
  const currentMember = getHouseMemberForUser(house, userId);
  const stats = getHouseStats(house);
  const members = sortHouseMembers(house.members);
  const invites = sortHouseInvites(house.invites);
  const roomCount = organization.rooms.length;
  const itemCount = items.length;
  const completedItemCount = items.filter((item) => item.status === "purchased").length;
  const completedPercentage = getHouseCompletionPercentage(itemCount, completedItemCount);

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
          <div className="mt-5 grid gap-3 sm:grid-cols-3 xl:max-w-2xl">
            <Card className="space-y-1 border-white/35 bg-white/45 p-4 backdrop-blur dark:border-white/10 dark:bg-slate-950/20">
              <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-muted">Rooms</p>
              <p className="text-2xl font-semibold">{roomCount}</p>
            </Card>
            <Card className="space-y-1 border-white/35 bg-white/45 p-4 backdrop-blur dark:border-white/10 dark:bg-slate-950/20">
              <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-muted">Items</p>
              <p className="text-2xl font-semibold">{itemCount}</p>
            </Card>
            <Card className="space-y-1 border-white/35 bg-white/45 p-4 backdrop-blur dark:border-white/10 dark:bg-slate-950/20">
              <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-muted">Completed</p>
              <p className="text-2xl font-semibold">{completedPercentage}%</p>
              <p className="text-xs text-muted">
                {completedItemCount}/{itemCount} items
              </p>
            </Card>
          </div>
        </div>
      </Card>

      <div className="grid gap-4 xl:grid-cols-[1.2fr_0.8fr]">
        <div className="grid gap-4">
          <Card className="space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="space-y-1">
                <Badge variant="neutral">Members</Badge>
                <h2 className="text-2xl font-semibold tracking-tight">House members</h2>
              </div>

              {canManageHouse(house, userId) ? (
                <Link href={`/app/houses/${house.id}/settings`}>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    className="h-10 w-10 rounded-full p-0"
                    title="Open member settings"
                    aria-label="Open member settings"
                  >
                    <Settings2 className="h-4 w-4" />
                  </Button>
                </Link>
              ) : null}
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <div className="flex -space-x-3">
                {members.map((member) => (
                  <div
                    key={member.id}
                    className="flex h-14 w-14 items-center justify-center rounded-full border-4 border-background bg-surface-strong text-sm font-semibold text-foreground shadow-soft"
                    title={`${member.name} - ${houseRoleLabel[member.role]}`}
                  >
                    {getMemberInitials(member.name)}
                  </div>
                ))}
                {canManageHouse(house, userId) ? (
                  <Link href={`/app/houses/${house.id}/settings`}>
                    <div
                      className="flex h-14 w-14 items-center justify-center rounded-full border-4 border-background bg-primary text-primary-foreground shadow-glow transition hover:-translate-y-0.5"
                      title="Add or manage members"
                      aria-label="Add or manage members"
                    >
                      <Plus className="h-5 w-5" />
                    </div>
                  </Link>
                ) : null}
              </div>

              <div className="space-y-1">
                <p className="text-sm font-medium text-foreground">
                  {stats.members} member{stats.members > 1 ? "s" : ""} active
                </p>
                <p className="text-sm text-muted">
                  Tap settings to manage roles, invites, and house access.
                </p>
              </div>
            </div>
          </Card>

          <HouseProgressPanel
            houseId={house.id}
            organization={organization}
            items={items}
            initialView={activeProgressView}
          />
        </div>

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
