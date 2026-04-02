import Link from "next/link";

import { Badge } from "@/design-system/primitives/badge";
import { Button } from "@/design-system/primitives/button";
import { Card } from "@/design-system/primitives/card";
import { houseRoleLabel } from "@/features/houses/application/house-policies";
import type { House } from "@/features/houses/domain/house.types";
import {
  roomColorClassName,
  roomColorLabel,
  roomColorOptions,
  sortCategories,
  sortRooms
} from "@/features/organization/application/organization-policies";
import type { HouseOrganization } from "@/features/organization/domain/organization.types";
import {
  createCategoryAction,
  createRoomAction,
  deleteCategoryAction,
  deleteRoomAction
} from "@/features/organization/presentation/organization-actions";
import { hasSupabaseAdminEnv } from "@/integrations/supabase/supabase-admin";

type HouseOrganizationPanelProps = {
  house: House;
  organization: HouseOrganization;
  currentUserRole?: House["members"][number]["role"];
};

const inputClassName =
  "min-h-11 rounded-2xl border border-border bg-background/80 px-4 text-sm text-foreground outline-none transition placeholder:text-muted focus:border-primary/40";

export function HouseOrganizationPanel({
  house,
  organization,
  currentUserRole
}: HouseOrganizationPanelProps) {
  const rooms = sortRooms(organization.rooms);
  const categories = sortCategories(organization.categories);

  return (
    <div className="grid gap-4">
      <Card className="space-y-4">
        <div className="flex flex-wrap items-center gap-3">
          <Badge variant="primary">Phase 5</Badge>
          {currentUserRole ? <Badge variant="neutral">{houseRoleLabel[currentUserRole]}</Badge> : null}
          <Badge variant={hasSupabaseAdminEnv() ? "success" : "warning"}>
            {hasSupabaseAdminEnv() ? "Supabase active" : "Cookie fallback active"}
          </Badge>
        </div>
        <h1 className="text-3xl font-semibold tracking-tight">Rooms and categories for {house.name}</h1>
        <p className="max-w-3xl text-sm leading-6 text-muted">
          This house now carries its first organization layer. Create rooms with a fixed color
          palette, define functional categories, and keep the next item phase attached to real
          house structure.
        </p>
        {!hasSupabaseAdminEnv() ? (
          <p className="text-sm leading-6 text-muted">
            Supabase envs are not configured yet, so this page uses temporary cookie persistence
            until the database setup is added.
          </p>
        ) : null}
      </Card>

      <div className="grid gap-4 xl:grid-cols-2">
        <Card className="space-y-4">
          <div className="space-y-1">
            <Badge variant="accent">Rooms</Badge>
            <h2 className="text-2xl font-semibold tracking-tight">Map the house by space.</h2>
          </div>

          <form action={createRoomAction} className="grid gap-3 md:grid-cols-[1fr_0.8fr_auto]">
            <input type="hidden" name="houseId" value={house.id} />
            <input className={inputClassName} type="text" name="name" placeholder="Room name" required />
            <select className={inputClassName} name="color" defaultValue="sand">
              {roomColorOptions.map((color) => (
                <option key={color} value={color}>
                  {roomColorLabel[color]}
                </option>
              ))}
            </select>
            <Button type="submit">Add room</Button>
          </form>

          <div className="grid gap-3">
            {rooms.length ? (
              rooms.map((room) => (
                <Card key={room.id} tone="subtle" className="flex flex-wrap items-center justify-between gap-3 p-4">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className={`rounded-pill px-3 py-1 text-xs font-semibold ${roomColorClassName[room.color]}`}>
                      {roomColorLabel[room.color]}
                    </span>
                    <p className="font-semibold">{room.name}</p>
                  </div>
                  <form action={deleteRoomAction}>
                    <input type="hidden" name="houseId" value={house.id} />
                    <input type="hidden" name="roomId" value={room.id} />
                    <Button type="submit" variant="ghost" size="sm">
                      Remove
                    </Button>
                  </form>
                </Card>
              ))
            ) : (
              <p className="text-sm leading-6 text-muted">
                No room exists yet. Start with spaces like kitchen, bedroom, service area, or office.
              </p>
            )}
          </div>
        </Card>

        <Card className="space-y-4">
          <div className="space-y-1">
            <Badge variant="neutral">Categories</Badge>
            <h2 className="text-2xl font-semibold tracking-tight">Define functional groupings.</h2>
          </div>

          <form action={createCategoryAction} className="grid gap-3 md:grid-cols-[1fr_auto]">
            <input type="hidden" name="houseId" value={house.id} />
            <input
              className={inputClassName}
              type="text"
              name="name"
              placeholder="Category name"
              required
            />
            <Button type="submit">Add category</Button>
          </form>

          <div className="grid gap-3">
            {categories.length ? (
              categories.map((category) => (
                <Card key={category.id} tone="subtle" className="flex flex-wrap items-center justify-between gap-3 p-4">
                  <p className="font-semibold">{category.name}</p>
                  <form action={deleteCategoryAction}>
                    <input type="hidden" name="houseId" value={house.id} />
                    <input type="hidden" name="categoryId" value={category.id} />
                    <Button type="submit" variant="ghost" size="sm">
                      Remove
                    </Button>
                  </form>
                </Card>
              ))
            ) : (
              <p className="text-sm leading-6 text-muted">
                No category exists yet. Add labels like essentials, decor, cleaning, or renovation.
              </p>
            )}
          </div>
        </Card>
      </div>

      <Card className="space-y-4" tone="subtle">
        <Badge variant="warning">Next dependency</Badge>
        <p className="max-w-3xl text-sm leading-6 text-muted">
          Items should be created on top of this structure so each entry can later connect to rooms
          and categories without route churn.
        </p>
        <div>
          <Link href={`/app/houses/${house.id}`}>
            <Button type="button" variant="outline">
              Back to house overview
            </Button>
          </Link>
        </div>
      </Card>
    </div>
  );
}
