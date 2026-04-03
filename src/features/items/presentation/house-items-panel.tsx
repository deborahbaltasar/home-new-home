"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { Pencil, Plus, ShoppingBag, Trash2, X } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

import { Badge } from "@/design-system/primitives/badge";
import { Button } from "@/design-system/primitives/button";
import { Card } from "@/design-system/primitives/card";
import { Sheet } from "@/design-system/primitives/sheet";
import {
  filterItemsByView,
  findCategoryLabel,
  findRoomLabel,
  formatPrice,
  getItemViewSummary,
  getStoreOptionComparison,
  itemEssentialityLabel,
  itemEssentialityOptions,
  itemPriorityLabel,
  itemPriorityOptions,
  itemStatusLabel,
  itemStatusOptions,
  itemViewLabel,
  itemViewOptions,
  sortStoreOptions,
  sortItems,
  type ItemView
} from "@/features/items/application/item-policies";
import type { Item } from "@/features/items/domain/item.types";
import {
  createItemAction,
  createStoreOptionAction,
  deleteItemAction,
  deleteStoreOptionAction,
  updateItemAction
} from "@/features/items/presentation/item-actions";
import { QuickPurchasedToggle } from "@/features/items/presentation/quick-purchased-toggle";
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
  activeAddStoreOptionItemId?: string;
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
  activeAddStoreOptionItemId,
  selectedRoomId
}: HouseItemsPanelProps) {
  const [currentView, setCurrentView] = useState<ItemView>(activeView);
  const [currentEditItemId, setCurrentEditItemId] = useState<string | undefined>(activeEditItemId);
  const [isCreateDrawerOpen, setIsCreateDrawerOpen] = useState(false);
  const [currentAddStoreOptionItemId, setCurrentAddStoreOptionItemId] = useState<string | undefined>(
    activeAddStoreOptionItemId
  );
  const [currentSelectedRoomId, setCurrentSelectedRoomId] = useState<string | undefined>(selectedRoomId);
  const rooms = sortRooms(organization.rooms);
  const categories = sortCategories(organization.categories);
  const selectedRoom = currentSelectedRoomId
    ? rooms.find((room) => room.id === currentSelectedRoomId)
    : undefined;
  const scopedItems = selectedRoom ? items.filter((item) => item.roomId === selectedRoom.id) : items;
  const sortedItems = sortItems(scopedItems);
  const visibleItems = filterItemsByView(sortedItems, currentView);
  const summary = getItemViewSummary(sortedItems);
  const activeEditItem = currentEditItemId ? items.find((entry) => entry.id === currentEditItemId) : undefined;
  const activeAddStoreOptionItem = currentAddStoreOptionItemId
    ? items.find((entry) => entry.id === currentAddStoreOptionItemId)
    : undefined;
  const activeDrawerMode: "create" | "edit" | null = isCreateDrawerOpen
    ? "create"
    : activeEditItem
      ? "edit"
      : null;
  const sortedActiveEditStoreOptions = useMemo(
    () => sortStoreOptions(activeEditItem?.storeOptions ?? []),
    [activeEditItem]
  );

  useEffect(() => {
    if (!activeDrawerMode) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [activeDrawerMode]);

  return (
    <div className="grid gap-4">
      <Card className="space-y-4">
        <div className="flex flex-wrap items-center gap-3">
          <Badge variant="primary">Purchase planning</Badge>
          {currentUserRole ? <Badge variant="neutral">{houseRoleLabel[currentUserRole]}</Badge> : null}
          <Badge variant={hasSupabaseAdminEnv() ? "success" : "warning"}>
            {hasSupabaseAdminEnv() ? "Supabase active" : "Cookie fallback active"}
          </Badge>
        </div>

        <div className="space-y-2">
          <h1 className="text-3xl font-semibold tracking-tight">Items for {house.name}</h1>
          <p className="max-w-3xl text-sm leading-6 text-muted">
            This is the operational layer of the house. Each item can now live inside a room and a
            category, carry priority and essentiality, track quantity and status, keep image or
            attachment references close to the purchase decision, and compare multiple store options
            against an optional target price.
          </p>
        </div>

        {selectedRoom ? (
          <div className="flex flex-wrap items-center gap-3">
            <span className={`rounded-pill px-3 py-1 text-xs font-semibold ${roomColorClassName[selectedRoom.color]}`}>
              {selectedRoom.name} - {roomColorLabel[selectedRoom.color]}
            </span>
            <p className="text-sm text-muted">Showing only items connected to this room.</p>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => setCurrentSelectedRoomId(undefined)}
            >
              Show all items
            </Button>
          </div>
        ) : null}

        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-5">
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
          <Card tone="subtle" className="space-y-1 p-4">
            <p className="text-xs uppercase tracking-[0.12em] text-muted">With options</p>
            <p className="text-2xl font-semibold">{summary.optionsTracked}</p>
          </Card>
        </div>
      </Card>

      <div className="grid gap-4">
        <Card className="space-y-4">
          <div className="flex items-start justify-between gap-4">
            <div className="space-y-1">
              <Badge variant="neutral">Views</Badge>
              <h2 className="text-2xl font-semibold tracking-tight">Review what matters now.</h2>
            </div>
            <Button
              type="button"
              variant="primary"
              size="sm"
              className="h-11 w-11 rounded-full p-0"
              aria-label="Add item"
              title="Add item"
              onClick={() => {
                setCurrentEditItemId(undefined);
                setCurrentAddStoreOptionItemId(undefined);
                setIsCreateDrawerOpen(true);
              }}
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>

          <div className="flex flex-wrap gap-2">
            {itemViewOptions.map((view) => (
              <Button
                key={view}
                type="button"
                onClick={() => setCurrentView(view)}
                variant={currentView === view ? "primary" : "outline"}
                size="sm"
              >
                {itemViewLabel[view]}
              </Button>
            ))}
          </div>

          <div className="grid gap-3 min-w-0">
            {visibleItems.length ? (
              visibleItems.map((item) => {
                const room = rooms.find((entry) => entry.id === item.roomId);
                const isEditing = currentEditItemId === item.id;
                const comparison = getStoreOptionComparison(item);
                const sortedStoreOptions = sortStoreOptions(item.storeOptions);

                return (
                  <Card
                    key={item.id}
                    tone="subtle"
                    className="relative space-y-4 p-4 min-w-0 overflow-hidden"
                    data-item-card
                  >
                    <div
                      data-item-loading-overlay
                      className="pointer-events-auto absolute inset-0 z-20 hidden rounded-[inherit] bg-background/28 backdrop-blur-[1px]"
                      aria-hidden="true"
                    >
                      <div className="h-full w-full overflow-hidden rounded-[inherit]">
                        <div className="h-full w-1/2 animate-pulse bg-gradient-to-r from-transparent via-surface-muted/50 to-transparent" />
                      </div>
                    </div>

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
                        <QuickPurchasedToggle
                          houseId={house.id}
                          itemId={item.id}
                          checked={item.status === "purchased"}
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="h-10 w-10 rounded-full p-0"
                          title={isEditing ? "Close editing" : "Edit item"}
                          aria-label={isEditing ? "Close item editing" : "Edit item"}
                          onClick={() => {
                            setCurrentAddStoreOptionItemId(undefined);
                            setCurrentEditItemId(isEditing ? undefined : item.id);
                          }}
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                        {/*
                        Keep delete as a server form; opening UI affordances stay client-side.
                        */}
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
                      {item.targetPrice !== undefined ? (
                        <span className="rounded-pill border border-border px-3 py-1 text-xs font-semibold text-muted">
                          Target {formatPrice(item.targetPrice)}
                        </span>
                      ) : null}
                      {comparison.cheapestOption ? (
                        <span className="rounded-pill border border-success/30 bg-success/10 px-3 py-1 text-xs font-semibold text-success">
                          Best {comparison.cheapestOption.storeName} {formatPrice(comparison.cheapestOption.price)}
                        </span>
                      ) : null}
                    </div>

                    {comparison.optionCount ? (
                      <Card className="grid gap-3 border-border/70 bg-background/60 p-4 md:grid-cols-3">
                        <div className="space-y-1">
                          <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-muted">
                            Options
                          </p>
                          <p className="text-lg font-semibold">{comparison.optionCount}</p>
                        </div>
                        <div className="space-y-1">
                          <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-muted">
                            Lowest price
                          </p>
                          <p className="text-lg font-semibold">
                            {comparison.cheapestOption ? formatPrice(comparison.cheapestOption.price) : "-"}
                          </p>
                        </div>
                        <div className="space-y-1">
                          <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-muted">
                            Spread
                          </p>
                          <p className="text-lg font-semibold">{formatPrice(comparison.priceSpread)}</p>
                        </div>
                        {comparison.targetGap !== undefined ? (
                          <p className="text-sm text-muted md:col-span-3">
                            {comparison.targetGap <= 0
                              ? `${comparison.optionsWithinTarget.length} option${comparison.optionsWithinTarget.length === 1 ? "" : "s"} already meet the target price.`
                              : `The cheapest option is ${formatPrice(comparison.targetGap)} above the target price.`}
                          </p>
                        ) : null}
                      </Card>
                    ) : null}

                    {sortedStoreOptions.length ? (
                      <div className="grid gap-3">
                        {sortedStoreOptions.map((option, index) => {
                          const meetsTarget =
                            item.targetPrice !== undefined && option.price <= item.targetPrice;

                          return (
                            <Card key={option.id} className="space-y-3 border-border/70 bg-background/70 p-4">
                              <div className="flex flex-wrap items-start justify-between gap-3">
                                <div className="space-y-1">
                                  <div className="flex flex-wrap items-center gap-2">
                                    <p className="font-semibold">{option.storeName}</p>
                                    {index === 0 ? <Badge variant="success">Best price</Badge> : null}
                                    {meetsTarget ? <Badge variant="accent">Within target</Badge> : null}
                                  </div>
                                  <p className="text-sm text-muted">{formatPrice(option.price)}</p>
                                </div>

                                <form action={deleteStoreOptionAction}>
                                  <input type="hidden" name="houseId" value={house.id} />
                                  <input type="hidden" name="itemId" value={item.id} />
                                  <input type="hidden" name="optionId" value={option.id} />
                                  <SubmitButton
                                    idleContent={<Trash2 className="h-4 w-4" />}
                                    pendingContent={<Trash2 className="h-4 w-4" />}
                                    variant="ghost"
                                    size="sm"
                                    className="h-10 w-10 rounded-full p-0 text-danger hover:bg-danger/10 hover:text-danger"
                                    title="Remove store option"
                                    ariaLabel="Remove store option"
                                  />
                                </form>
                              </div>

                              <div className="flex flex-wrap items-center gap-2">
                                {option.productUrl ? (
                                  <a
                                    className="rounded-pill border border-border px-3 py-1 text-xs font-semibold text-muted transition hover:text-foreground"
                                    href={option.productUrl}
                                    target="_blank"
                                    rel="noreferrer"
                                  >
                                    Open link
                                  </a>
                                ) : null}
                                {option.notes ? (
                                  <span className="rounded-pill border border-border px-3 py-1 text-xs font-semibold text-muted">
                                    {option.notes}
                                  </span>
                                ) : null}
                              </div>
                            </Card>
                          );
                        })}
                      </div>
                    ) : (
                      <p className="text-sm leading-6 text-muted">
                        No store options yet. Add at least two offers to compare where this item
                        should be bought.
                      </p>
                    )}

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

      <AnimatePresence>
        {activeDrawerMode ? (
          <motion.div
            className="fixed inset-0 z-50 bg-slate-950/35 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
          >
            <button
              type="button"
              className="absolute inset-0"
              aria-label={activeDrawerMode === "create" ? "Close item creation" : "Close item editing"}
              onClick={() => {
                setCurrentEditItemId(undefined);
                setIsCreateDrawerOpen(false);
              }}
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
              className="absolute right-0 top-0 h-full w-full max-w-[44rem]"
            >
              <Sheet
                side="right"
                className="flex h-full w-full flex-col overflow-y-auto rounded-none border-l border-border/70 bg-surface px-5 py-5 shadow-panel md:px-6 md:py-6"
              >
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div className="space-y-1">
                      <Badge variant="accent">{activeDrawerMode === "create" ? "Create item" : "Edit item"}</Badge>
                      <h3 className="text-2xl font-semibold tracking-tight">
                        {activeDrawerMode === "create" ? "Add the next home need." : activeEditItem?.name}
                      </h3>
                      <p className="text-sm text-muted">
                        {activeDrawerMode === "create"
                          ? "Create a new item with structure, status, and purchase context in one place."
                          : "Update the item structure and register store offers in one place."}
                      </p>
                    </div>

                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="h-10 w-10 rounded-full p-0"
                      aria-label={activeDrawerMode === "create" ? "Close create drawer" : "Close edit drawer"}
                      title="Close"
                      onClick={() => {
                        setCurrentEditItemId(undefined);
                        setIsCreateDrawerOpen(false);
                      }}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>

                  <div className="mt-5 grid gap-4 pb-28">
                    <form
                      id="item-drawer-form"
                      action={activeDrawerMode === "create" ? createItemAction : updateItemAction}
                      className="space-y-3 rounded-[1.5rem] border border-border/70 bg-background/60 p-4 min-w-0"
                    >
                      <input type="hidden" name="houseId" value={house.id} />
                      {activeDrawerMode === "edit" && activeEditItem ? (
                        <input type="hidden" name="itemId" value={activeEditItem.id} />
                      ) : null}

                      <div className="space-y-1">
                        <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-muted">
                          {activeDrawerMode === "create" ? "Item details" : "Update item"}
                        </p>
                        <p className="text-sm text-muted">
                          {activeDrawerMode === "create"
                            ? "Define structure, progress, quantity, and the price you want to hit."
                            : "Adjust structure, progress, quantity, and the price you want to hit."}
                        </p>
                      </div>

                      <input
                        className={`${inputClassName} min-w-0 w-full`}
                        type="text"
                        name="name"
                        placeholder="Item name"
                        defaultValue={activeEditItem?.name ?? ""}
                        required
                      />

                      <textarea
                        className={`${inputClassName} min-h-24 py-3`}
                        name="notes"
                        placeholder="Notes, purchase constraints, or brand preference"
                        defaultValue={activeEditItem?.notes ?? ""}
                      />

                      <div className="grid gap-3 xl:grid-cols-2">
                        <div className="space-y-2 min-w-0">
                          <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-muted">
                            Room
                          </p>
                          <select
                            className={`${inputClassName} min-w-0 w-full`}
                            name="roomId"
                            defaultValue={activeEditItem?.roomId ?? selectedRoom?.id ?? ""}
                          >
                            <option value="">No room yet</option>
                            {rooms.map((entry) => (
                              <option key={entry.id} value={entry.id}>
                                {entry.name}
                              </option>
                            ))}
                          </select>
                        </div>

                        <div className="space-y-2 min-w-0">
                          <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-muted">
                            Category
                          </p>
                          <select
                            className={`${inputClassName} min-w-0 w-full`}
                            name="categoryId"
                            defaultValue={activeEditItem?.categoryId ?? ""}
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

                      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
                        <div className="space-y-2 min-w-0">
                          <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-muted">
                            Status
                          </p>
                          <select
                            className={`${inputClassName} min-w-0 w-full`}
                            name="status"
                            defaultValue={activeEditItem?.status ?? "planning"}
                          >
                            {itemStatusOptions.map((status) => (
                              <option key={status} value={status}>
                                {itemStatusLabel[status]}
                              </option>
                            ))}
                          </select>
                        </div>

                        <div className="space-y-2 min-w-0">
                          <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-muted">
                            Priority
                          </p>
                          <select
                            className={`${inputClassName} min-w-0 w-full`}
                            name="priority"
                            defaultValue={activeEditItem?.priority ?? "next"}
                          >
                            {itemPriorityOptions.map((priority) => (
                              <option key={priority} value={priority}>
                                {itemPriorityLabel[priority]}
                              </option>
                            ))}
                          </select>
                        </div>

                        <div className="space-y-2 min-w-0 sm:col-span-2 xl:col-span-1">
                          <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-muted">
                            Quantity
                          </p>
                          <input
                            className={`${inputClassName} min-w-0`}
                            type="number"
                            name="quantity"
                            min={1}
                            defaultValue={activeEditItem?.quantity ?? 1}
                          />
                        </div>
                      </div>

                      <div className="space-y-2 min-w-0">
                        <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-muted">
                          Target price
                        </p>
                        <input
                          className={`${inputClassName} min-w-0`}
                          type="number"
                          name="targetPrice"
                          min="0"
                          step="0.01"
                          defaultValue={activeEditItem?.targetPrice ?? ""}
                          placeholder="Optional target price"
                        />
                      </div>

                      <div className="grid gap-3 sm:grid-cols-[0.45fr_1fr]">
                        <input
                          className={`${inputClassName} min-w-0`}
                          type="url"
                          name="imageUrl"
                          placeholder="Image URL"
                          defaultValue={activeEditItem?.imageUrl ?? ""}
                        />
                        <textarea
                          className={`${inputClassName} min-h-24 py-3`}
                          name="attachmentUrls"
                          placeholder="Attachment URLs, one per line"
                          defaultValue={activeEditItem?.attachmentUrls.join("\n") ?? ""}
                        />
                      </div>
                    </form>

                    {activeDrawerMode === "edit" && activeEditItem ? (
                      <div className="space-y-3 rounded-[1.5rem] border border-border/70 bg-background/60 p-4 min-w-0">
                        <div className="flex items-start justify-between gap-3">
                          <div className="space-y-1">
                            <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-muted">
                              Store options
                            </p>
                            <p className="text-sm text-muted">
                              Added offers appear here so you can quickly remove them later.
                            </p>
                          </div>
                          <Button
                            type="button"
                            aria-label="Add store option"
                            onClick={() => {
                              setCurrentAddStoreOptionItemId(activeEditItem.id);
                            }}
                            variant="outline"
                            size="sm"
                            className="h-10 w-10 rounded-full border-primary/30 bg-primary/10 p-0 text-primary hover:bg-primary/15"
                            title="Add store option"
                          >
                            <ShoppingBag className="h-4 w-4" />
                          </Button>
                        </div>

                        {sortedActiveEditStoreOptions.length ? (
                          <div className="flex flex-wrap gap-2">
                            {sortedActiveEditStoreOptions.map((option) => (
                              <div
                                key={option.id}
                                className="inline-flex items-center gap-2 rounded-pill border border-border bg-background px-3 py-2 text-sm font-medium text-foreground"
                              >
                                <span>{option.storeName}</span>
                                <form action={deleteStoreOptionAction}>
                                  <input type="hidden" name="houseId" value={house.id} />
                                  <input type="hidden" name="itemId" value={activeEditItem.id} />
                                  <input type="hidden" name="optionId" value={option.id} />
                                  <SubmitButton
                                    idleContent={<X className="h-3.5 w-3.5" />}
                                    pendingContent={<X className="h-3.5 w-3.5" />}
                                    variant="ghost"
                                    size="sm"
                                    className="h-6 min-h-0 w-6 rounded-full p-0"
                                    title={`Remove ${option.storeName}`}
                                    ariaLabel={`Remove ${option.storeName}`}
                                  />
                                </form>
                              </div>
                            ))}
                          </div>
                        ) : null}
                      </div>
                    ) : null}
                  </div>

                  <div className="absolute bottom-0 left-0 right-0 flex items-center justify-end gap-3 border-t border-border/70 bg-surface px-5 py-4 md:px-6">
                    <Button
                      type="button"
                      variant="ghost"
                      size="md"
                      onClick={() => {
                        setCurrentEditItemId(undefined);
                        setIsCreateDrawerOpen(false);
                      }}
                    >
                      Cancel
                    </Button>
                    <SubmitButton
                      idleLabel={activeDrawerMode === "create" ? "Add item" : "Save changes"}
                      pendingLabel={activeDrawerMode === "create" ? "Adding..." : "Saving..."}
                      variant="primary"
                      size="md"
                      form="item-drawer-form"
                    />
                  </div>
              </Sheet>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>

      {activeAddStoreOptionItem ? (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-slate-950/45 p-4 backdrop-blur-sm">
          <button
            type="button"
            className="absolute inset-0"
            aria-label="Close add store option modal"
            onClick={() => setCurrentAddStoreOptionItemId(undefined)}
          />
          <Card className="relative z-10 w-full max-w-lg space-y-4 bg-surface p-5 shadow-panel">
            <div className="flex items-start justify-between gap-3">
              <div className="space-y-1">
                <Badge variant="accent">Add store option</Badge>
                <h3 className="text-2xl font-semibold tracking-tight">{activeAddStoreOptionItem.name}</h3>
                <p className="text-sm text-muted">
                  Add one more place to compare before deciding where to buy.
                </p>
              </div>

              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="h-10 w-10 rounded-full p-0"
                aria-label="Close add store option modal"
                title="Close"
                onClick={() => setCurrentAddStoreOptionItemId(undefined)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>

            <form action={createStoreOptionAction} className="space-y-3">
              <input type="hidden" name="houseId" value={house.id} />
              <input type="hidden" name="itemId" value={activeAddStoreOptionItem.id} />
              <input className={`${inputClassName} min-w-0 w-full`} type="text" name="storeName" placeholder="Store name" required />
              <input className={`${inputClassName} min-w-0 w-full`} type="url" name="productUrl" placeholder="Product link" />
              <input
                className={`${inputClassName} min-w-0 w-full`}
                type="number"
                name="price"
                min="0"
                step="0.01"
                placeholder="Price"
                required
              />
              <textarea
                className={`${inputClassName} min-h-24 py-3`}
                name="notes"
                placeholder="Delivery note, coupon, or availability detail"
              />

              <SubmitButton idleLabel="Add option" pendingLabel="Adding..." variant="primary" size="md" className="w-full" />
            </form>
          </Card>
        </div>
      ) : null}
    </div>
  );
}
