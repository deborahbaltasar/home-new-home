import Link from "next/link";
import { Pencil, Trash2 } from "lucide-react";

import { Badge } from "@/design-system/primitives/badge";
import { Button } from "@/design-system/primitives/button";
import { Card } from "@/design-system/primitives/card";
import {
  filterItemsByView,
  findCategoryLabel,
  findRoomLabel,
  getItemViewSummary,
  itemEssentialityLabel,
  itemEssentialityOptions,
  itemPriorityLabel,
  itemPriorityOptions,
  itemStatusLabel,
  itemStatusOptions,
  itemViewLabel,
  itemViewOptions,
  sortItems,
  type ItemView
} from "@/features/items/application/item-policies";
import type { Item } from "@/features/items/domain/item.types";
import { createItemAction, deleteItemAction, updateItemAction } from "@/features/items/presentation/item-actions";
import { SubmitButton } from "@/features/items/presentation/submit-button";
import { houseRoleLabel } from "@/features/houses/application/house-policies";
import type { House } from "@/features/houses/domain/house.types";
import type { HouseOrganization } from "@/features/organization/domain/organization.types";
import {
  roomColorClassName,
  roomColorLabel,
  sortCategories,
  sortRooms
} from "@/features/organization/application/organization-policies";
import { hasSupabaseAdminEnv } from "@/integrations/supabase/supabase-admin";

type HouseItemsPanelProps = {
  house: House;
  organization: HouseOrganization;
  items: Item[];
  currentUserRole?: House["members"][number]["role"];
  activeView: ItemView;
  activeEditItemId?: string;
  selectedRoomId?: string;
};

const inputClassName =
  "min-h-11 rounded-2xl border border-border bg-background/80 px-4 text-sm text-foreground outline-none transition placeholder:text-muted focus:border-primary/40";

export function HouseItemsPanel({
  house,
  organization,
  items,
  currentUserRole,
  activeView,
  activeEditItemId,
  selectedRoomId
}: HouseItemsPanelProps) {
  const rooms = sortRooms(organization.rooms);
  const categories = sortCategories(organization.categories);
  const selectedRoom = selectedRoomId ? rooms.find((room) => room.id === selectedRoomId) : undefined;
  const scopedItems = selectedRoom ? items.filter((item) => item.roomId === selectedRoom.id) : items;
  const sortedItems = sortItems(scopedItems);
  const visibleItems = filterItemsByView(sortedItems, activeView);
  const summary = getItemViewSummary(sortedItems);

  function buildItemsHref(view: ItemView, editItemId?: string) {
    const searchParams = new URLSearchParams();

    if (view !== "all") {
      searchParams.set("view", view);
    }

    if (selectedRoom) {
      searchParams.set("roomId", selectedRoom.id);
    }

    if (editItemId) {
      searchParams.set("edit", editItemId);
    }

    const query = searchParams.toString();

    return `/app/houses/${house.id}/items${query ? `?${query}` : ""}`;
  }

  return (
    <div className="grid gap-4">
      <Card className="space-y-4">
        <div className="flex flex-wrap items-center gap-3">
          <Badge variant="primary">Phase 6</Badge>
          {currentUserRole ? <Badge variant="neutral">{houseRoleLabel[currentUserRole]}</Badge> : null}
          <Badge variant={hasSupabaseAdminEnv() ? "success" : "warning"}>
            {hasSupabaseAdminEnv() ? "Supabase active" : "Cookie fallback active"}
          </Badge>
        </div>

        <div className="space-y-2">
          <h1 className="text-3xl font-semibold tracking-tight">Items for {house.name}</h1>
          <p className="max-w-3xl text-sm leading-6 text-muted">
            This is the operational layer of the house. Each item can now live inside a room and a
            category, carry priority and essentiality, track quantity and status, and keep image or
            attachment references close to the purchase decision.
          </p>
        </div>

        {selectedRoom ? (
          <div className="flex flex-wrap items-center gap-3">
            <span className={`rounded-pill px-3 py-1 text-xs font-semibold ${roomColorClassName[selectedRoom.color]}`}>
              {selectedRoom.name} - {roomColorLabel[selectedRoom.color]}
            </span>
            <p className="text-sm text-muted">Showing only items connected to this room.</p>
            <Link href={`/app/houses/${house.id}/items`}>
              <Button type="button" variant="ghost" size="sm">
                Show all items
              </Button>
            </Link>
          </div>
        ) : null}

        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          <Card tone="subtle" className="space-y-1 p-4">
            <p className="text-xs uppercase tracking-[0.12em] text-muted">Total</p>
            <p className="text-2xl font-semibold">{summary.total}</p>
          </Card>
          <Card tone="subtle" className="space-y-1 p-4">
            <p className="text-xs uppercase tracking-[0.12em] text-muted">Essentials</p>
            <p className="text-2xl font-semibold">{summary.essentials}</p>
          </Card>
          <Card tone="subtle" className="space-y-1 p-4">
            <p className="text-xs uppercase tracking-[0.12em] text-muted">Open</p>
            <p className="text-2xl font-semibold">{summary.open}</p>
          </Card>
          <Card tone="subtle" className="space-y-1 p-4">
            <p className="text-xs uppercase tracking-[0.12em] text-muted">Purchased</p>
            <p className="text-2xl font-semibold">{summary.completed}</p>
          </Card>
        </div>
      </Card>

      <div className="grid gap-4 xl:grid-cols-[0.95fr_1.05fr]">
        <Card className="space-y-4 min-w-0">
          <div className="space-y-1">
            <Badge variant="accent">Create item</Badge>
            <h2 className="text-2xl font-semibold tracking-tight">Add the next home need.</h2>
          </div>

          <form action={createItemAction} className="grid gap-3">
            <input type="hidden" name="houseId" value={house.id} />
            <input className={inputClassName} type="text" name="name" placeholder="Item name" required />
            <textarea
              className={`${inputClassName} min-h-28 py-3`}
              name="notes"
              placeholder="Notes, purchase constraints, or brand preference"
            />

            <div className="grid gap-3 sm:grid-cols-2">
              <select className={inputClassName} name="roomId" defaultValue={selectedRoom?.id ?? ""}>
                <option value="">No room yet</option>
                {rooms.map((room) => (
                  <option key={room.id} value={room.id}>
                    {room.name}
                  </option>
                ))}
              </select>

              <select className={inputClassName} name="categoryId" defaultValue="">
                <option value="">No category yet</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="grid gap-3 sm:grid-cols-3">
              <select className={inputClassName} name="priority" defaultValue="next">
                {itemPriorityOptions.map((priority) => (
                  <option key={priority} value={priority}>
                    {itemPriorityLabel[priority]}
                  </option>
                ))}
              </select>

              <select className={inputClassName} name="essentiality" defaultValue="helpful">
                {itemEssentialityOptions.map((essentiality) => (
                  <option key={essentiality} value={essentiality}>
                    {itemEssentialityLabel[essentiality]}
                  </option>
                ))}
              </select>

              <select className={inputClassName} name="status" defaultValue="planning">
                {itemStatusOptions.map((status) => (
                  <option key={status} value={status}>
                    {itemStatusLabel[status]}
                  </option>
                ))}
              </select>
            </div>

            <div className="grid gap-3 sm:grid-cols-[0.45fr_1fr]">
              <input
                className={inputClassName}
                type="number"
                name="quantity"
                min={1}
                defaultValue={1}
                placeholder="Qty"
              />
              <input
                className={inputClassName}
                type="url"
                name="imageUrl"
                placeholder="Image URL"
              />
            </div>

            <textarea
              className={`${inputClassName} min-h-24 py-3`}
              name="attachmentUrls"
              placeholder="Attachment URLs, one per line"
            />

            <div className="flex flex-wrap items-center gap-3">
              <SubmitButton idleLabel="Add item" pendingLabel="Adding..." />
              <Link href={`/app/houses/${house.id}/rooms`}>
                <Button type="button" variant="outline">
                  Manage rooms and categories
                </Button>
              </Link>
            </div>
          </form>
        </Card>

        <Card className="space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="space-y-1">
              <Badge variant="neutral">Views</Badge>
              <h2 className="text-2xl font-semibold tracking-tight">Review what matters now.</h2>
            </div>
            <Link href={`/app/houses/${house.id}`}>
              <Button type="button" variant="ghost" size="sm">
                Back to house
              </Button>
            </Link>
          </div>

          <div className="flex flex-wrap gap-2">
            {itemViewOptions.map((view) => (
              <Link
                key={view}
                href={buildItemsHref(view)}
              >
                <Button type="button" variant={activeView === view ? "primary" : "outline"} size="sm">
                  {itemViewLabel[view]}
                </Button>
              </Link>
            ))}
          </div>

          <div className="grid gap-3 min-w-0">
            {visibleItems.length ? (
              visibleItems.map((item) => {
                const room = rooms.find((entry) => entry.id === item.roomId);
                const isEditing = activeEditItemId === item.id;
                const editHref = buildItemsHref(activeView, item.id);
                const closeEditHref = buildItemsHref(activeView);

                return (
                  <Card key={item.id} tone="subtle" className="space-y-4 p-4 min-w-0 overflow-hidden">
                    <div className="flex flex-wrap items-start justify-between gap-3">
                      <div className="space-y-2">
                        <div className="flex flex-wrap items-center gap-2">
                          <Badge variant={item.priority === "now" ? "warning" : item.priority === "next" ? "primary" : "neutral"}>
                            {itemPriorityLabel[item.priority]}
                          </Badge>
                          <Badge variant={item.essentiality === "essential" ? "accent" : "neutral"}>
                            {itemEssentialityLabel[item.essentiality]}
                          </Badge>
                          <Badge variant={item.status === "purchased" ? "success" : item.status === "reserved" ? "warning" : "neutral"}>
                            {itemStatusLabel[item.status]}
                          </Badge>
                        </div>
                        <div>
                          <p className="text-lg font-semibold">{item.name}</p>
                          {item.notes ? (
                            <p className="max-w-2xl text-sm leading-6 text-muted">{item.notes}</p>
                          ) : null}
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <Link href={isEditing ? closeEditHref : editHref} aria-label={isEditing ? "Close item editing" : "Edit item"}>
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            className="h-10 w-10 rounded-full p-0"
                            title={isEditing ? "Close editing" : "Edit item"}
                          >
                            <Pencil className="h-4 w-4" />
                          </Button>
                        </Link>
                        <form action={deleteItemAction}>
                          <input type="hidden" name="houseId" value={house.id} />
                          <input type="hidden" name="itemId" value={item.id} />
                          <SubmitButton
                            idleContent={<Trash2 className="h-4 w-4" />}
                            pendingContent={<Trash2 className="h-4 w-4" />}
                            variant="ghost"
                            size="sm"
                            className="h-10 w-10 rounded-full p-0 text-danger hover:bg-danger/10 hover:text-danger"
                            title="Remove item"
                            ariaLabel="Remove item"
                          />
                        </form>
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-2">
                      {room ? (
                        <span className={`rounded-pill px-3 py-1 text-xs font-semibold ${roomColorClassName[room.color]}`}>
                          {findRoomLabel(rooms, item.roomId)} - {roomColorLabel[room.color]}
                        </span>
                      ) : (
                        <span className="rounded-pill border border-border px-3 py-1 text-xs font-semibold text-muted">
                          {findRoomLabel(rooms, item.roomId)}
                        </span>
                      )}
                      <span className="rounded-pill border border-border px-3 py-1 text-xs font-semibold text-muted">
                        {findCategoryLabel(categories, item.categoryId)}
                      </span>
                      <span className="rounded-pill border border-border px-3 py-1 text-xs font-semibold text-muted">
                        Qty {item.quantity}
                      </span>
                      {item.imageUrl ? (
                        <a
                          className="rounded-pill border border-border px-3 py-1 text-xs font-semibold text-muted transition hover:text-foreground"
                          href={item.imageUrl}
                          target="_blank"
                          rel="noreferrer"
                        >
                          Image
                        </a>
                      ) : null}
                      {item.attachmentUrls.length ? (
                        <span className="rounded-pill border border-border px-3 py-1 text-xs font-semibold text-muted">
                          {item.attachmentUrls.length} attachment{item.attachmentUrls.length > 1 ? "s" : ""}
                        </span>
                      ) : null}
                    </div>

                    {isEditing ? (
                      <form action={updateItemAction} className="space-y-3 rounded-[1.5rem] border border-border/70 bg-background/60 p-4">
                        <input type="hidden" name="houseId" value={house.id} />
                        <input type="hidden" name="itemId" value={item.id} />

                        <div className="grid gap-3 md:grid-cols-2">
                          <div className="space-y-2">
                            <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-muted">
                              Room
                            </p>
                            <select className={inputClassName} name="roomId" defaultValue={item.roomId ?? ""}>
                              <option value="">No room yet</option>
                              {rooms.map((entry) => (
                                <option key={entry.id} value={entry.id}>
                                  {entry.name}
                                </option>
                              ))}
                            </select>
                          </div>

                          <div className="space-y-2">
                            <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-muted">
                              Category
                            </p>
                            <select
                              className={inputClassName}
                              name="categoryId"
                              defaultValue={item.categoryId ?? ""}
                            >
                              <option value="">No category yet</option>
                              {categories.map((entry) => (
                                <option key={entry.id} value={entry.id}>
                                  {entry.name}
                                </option>
                              ))}
                            </select>
                          </div>
                        </div>

                        <div className="grid gap-3 md:grid-cols-3">
                          <div className="space-y-2">
                            <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-muted">
                              Status
                            </p>
                            <select className={inputClassName} name="status" defaultValue={item.status}>
                              {itemStatusOptions.map((status) => (
                                <option key={status} value={status}>
                                  {itemStatusLabel[status]}
                                </option>
                              ))}
                            </select>
                          </div>

                          <div className="space-y-2">
                            <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-muted">
                              Priority
                            </p>
                            <select className={inputClassName} name="priority" defaultValue={item.priority}>
                              {itemPriorityOptions.map((priority) => (
                                <option key={priority} value={priority}>
                                  {itemPriorityLabel[priority]}
                                </option>
                              ))}
                            </select>
                          </div>

                          <div className="space-y-2">
                            <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-muted">
                              Quantity
                            </p>
                            <input
                              className={`${inputClassName} min-w-0`}
                              type="number"
                              name="quantity"
                              min={1}
                              defaultValue={item.quantity}
                            />
                          </div>
                        </div>

                        <div className="flex flex-wrap gap-3">
                          <SubmitButton idleLabel="Save changes" pendingLabel="Saving..." variant="outline" size="sm" />
                          <Link href={closeEditHref}>
                            <Button type="button" variant="ghost" size="sm">
                              Cancel
                            </Button>
                          </Link>
                        </div>
                      </form>
                    ) : null}
                  </Card>
                );
              })
            ) : (
              <p className="text-sm leading-6 text-muted">
                No item matches this view yet. Add the next purchase, gift, or setup task for this
                house and link it to a room or category immediately.
              </p>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
}
