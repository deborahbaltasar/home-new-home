import { Badge } from "@/design-system/primitives/badge";
import { Button } from "@/design-system/primitives/button";
import { Card } from "@/design-system/primitives/card";
import {
  canManageHouse,
  getHouseMemberForUser,
  houseRoleLabel,
  sortHouseInvites,
  sortHouseMembers
} from "@/features/houses/application/house-policies";
import type { House } from "@/features/houses/domain/house.types";
import {
  createHouseInviteAction,
  removeHouseMemberAction,
  updateHouseMemberRoleAction
} from "@/features/houses/presentation/house-actions";

type HouseSettingsPanelProps = {
  house: House;
  userId: string;
};

const inputClassName =
  "min-h-11 rounded-2xl border border-border bg-background/80 px-4 text-sm text-foreground outline-none transition placeholder:text-muted focus:border-primary/40";

export function HouseSettingsPanel({ house, userId }: HouseSettingsPanelProps) {
  const currentMember = getHouseMemberForUser(house, userId);
  const canManage = canManageHouse(house, userId);
  const members = sortHouseMembers(house.members);
  const invites = sortHouseInvites(house.invites);

  return (
    <div className="grid gap-4">
      <Card className="space-y-3">
        <div className="flex flex-wrap items-center gap-3">
          <Badge variant="primary">Settings</Badge>
          {currentMember ? <Badge variant="neutral">{houseRoleLabel[currentMember.role]}</Badge> : null}
        </div>
        <h1 className="text-3xl font-semibold tracking-tight">{house.name}</h1>
        <p className="max-w-3xl text-sm leading-6 text-muted">
          Membership and invitation rules stay inside the house feature. Owners and admins can
          promote members, remove access, and issue invite links for a target role.
        </p>
      </Card>

      <div className="grid gap-4 xl:grid-cols-[1.1fr_0.9fr]">
        <Card className="space-y-4">
          <div className="space-y-1">
            <Badge variant="neutral">Member roles</Badge>
            <h2 className="text-2xl font-semibold tracking-tight">Manage who can shape the house.</h2>
          </div>

          <div className="grid gap-3">
            {members.map((member) => {
              const isOwner = member.role === "owner";
              const canEditMember =
                canManage &&
                !isOwner &&
                !(currentMember?.role === "admin" && member.role === "admin");

              return (
                <Card key={member.id} tone="subtle" className="space-y-4 p-4">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div className="space-y-1">
                      <p className="font-semibold">{member.name}</p>
                      <p className="text-sm text-muted">{member.email ?? "No email captured yet"}</p>
                    </div>
                    <div className="flex flex-wrap items-center gap-2">
                      {member.userId === userId ? <Badge variant="accent">You</Badge> : null}
                      <Badge variant={isOwner ? "primary" : "neutral"}>
                        {houseRoleLabel[member.role]}
                      </Badge>
                    </div>
                  </div>

                  {canEditMember ? (
                    <div className="flex flex-wrap gap-3">
                      <form action={updateHouseMemberRoleAction} className="flex flex-wrap gap-3">
                        <input type="hidden" name="houseId" value={house.id} />
                        <input type="hidden" name="memberId" value={member.id} />
                        <select
                          className={inputClassName}
                          name="role"
                          aria-label={`Role for ${member.name}`}
                          defaultValue={member.role}
                        >
                          <option value="member">Member</option>
                          <option value="admin">Admin</option>
                        </select>
                        <Button type="submit" variant="outline">
                          Save role
                        </Button>
                      </form>

                      <form action={removeHouseMemberAction}>
                        <input type="hidden" name="houseId" value={house.id} />
                        <input type="hidden" name="memberId" value={member.id} />
                        <Button type="submit" variant="ghost">
                          Remove member
                        </Button>
                      </form>
                    </div>
                  ) : (
                    <p className="text-sm leading-6 text-muted">
                      {isOwner
                        ? "Owner access stays fixed for the house."
                        : "Your current role does not allow changing this admin entry."}
                    </p>
                  )}
                </Card>
              );
            })}
          </div>
        </Card>

        <div className="grid gap-4">
          <Card className="space-y-4">
            <div className="space-y-1">
              <Badge variant="warning">Invite by link</Badge>
              <h2 className="text-2xl font-semibold tracking-tight">Create a new invitation.</h2>
            </div>

            {canManage ? (
              <form action={createHouseInviteAction} className="grid gap-3">
                <input type="hidden" name="houseId" value={house.id} />
                <input
                  className={inputClassName}
                  type="text"
                  name="label"
                  placeholder="Who is this invite for?"
                  aria-label="Invite label"
                  required
                />
                <select className={inputClassName} name="role" defaultValue="member" aria-label="Invite role">
                  <option value="member">Member access</option>
                  <option value="admin">Admin access</option>
                </select>
                <Button type="submit">Generate invite link</Button>
              </form>
            ) : (
              <p className="text-sm leading-6 text-muted">
                Only owners and admins can create invites for this house.
              </p>
            )}
          </Card>

          <Card className="space-y-4" tone="subtle">
            <Badge variant="neutral">Pending invites</Badge>
            {invites.length ? (
              <div className="grid gap-3">
                {invites.map((invite) => (
                  <Card key={invite.id} className="space-y-2 p-4">
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
                Invite links appear here after the first collaborator is prepared.
              </p>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
}
