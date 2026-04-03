"use client";

import Link from "next/link";
import { startTransition, useEffect, useState } from "react";
import { SlidersHorizontal } from "lucide-react";

import { Badge } from "@/design-system/primitives/badge";
import { Card } from "@/design-system/primitives/card";
import { Skeleton } from "@/design-system/primitives/skeleton";
import {
  buildProgressGroups,
  isProgressView,
  progressViewLabel,
  type ProgressView
} from "@/features/houses/application/progress-groups";
import type { Item } from "@/features/items/domain/item.types";
import type { HouseOrganization } from "@/features/organization/domain/organization.types";
import { cn } from "@/shared/lib/cn";

type HouseProgressPanelProps = {
  houseId: string;
  organization: HouseOrganization;
  items: Item[];
  initialView?: string;
};

const progressViews: ProgressView[] = ["room", "priority", "status", "category"];

export function HouseProgressPanel({
  houseId,
  organization,
  items,
  initialView
}: HouseProgressPanelProps) {
  const [progressView, setProgressView] = useState<ProgressView>(
    isProgressView(initialView) ? initialView : "room"
  );
  const [isSwitching, setIsSwitching] = useState(false);

  useEffect(() => {
    if (!isProgressView(initialView)) {
      return;
    }

    setProgressView(initialView);
  }, [initialView]);

  const progressGroups = buildProgressGroups(progressView, organization, items);

  function handleViewChange(nextView: ProgressView) {
    if (nextView === progressView) {
      return;
    }

    setIsSwitching(true);
    window.clearTimeout((handleViewChange as typeof handleViewChange & { timeoutId?: number }).timeoutId);
    startTransition(() => {
      setProgressView(nextView);
    });
    (handleViewChange as typeof handleViewChange & { timeoutId?: number }).timeoutId = window.setTimeout(
      () => setIsSwitching(false),
      220
    );
  }

  return (
    <Card className="space-y-4" tone="subtle">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="space-y-1">
          <Badge variant="accent">Progress</Badge>
          <h2 className="text-2xl font-semibold tracking-tight">{progressViewLabel[progressView]}</h2>
        </div>

        <details className="relative">
          <summary className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-border-strong bg-transparent text-foreground transition hover:bg-surface-muted/70">
            <SlidersHorizontal className="h-4 w-4" />
          </summary>
          <div className="absolute right-0 z-10 mt-2 min-w-44 rounded-[1.25rem] border border-border bg-surface p-2 shadow-panel">
            {progressViews.map((view) => (
              <button
                key={view}
                type="button"
                onClick={() => handleViewChange(view)}
                className={cn(
                  "block w-full rounded-2xl px-3 py-2 text-left text-sm transition",
                  progressView === view
                    ? "bg-primary/12 text-primary"
                    : "text-foreground hover:bg-surface-muted/70"
                )}
              >
                {progressViewLabel[view].replace(/\.$/, "")}
              </button>
            ))}
          </div>
        </details>
      </div>

      <div
        className={cn(
          "grid gap-3 transition-all duration-200",
          isSwitching ? "translate-y-1 opacity-60" : "translate-y-0 opacity-100"
        )}
      >
        {isSwitching ? (
          Array.from({ length: 3 }).map((_, index) => (
            <Card key={index} className="space-y-3 p-4">
              <div className="flex items-center justify-between gap-3">
                <div className="space-y-2">
                  <Skeleton className="h-5 w-28" />
                  <Skeleton className="h-4 w-36" />
                </div>
                <Skeleton className="h-8 w-14 rounded-pill" />
              </div>
              <Skeleton className="h-3 w-full rounded-pill" />
            </Card>
          ))
        ) : progressGroups.length ? (
          progressGroups.map(({ id, label, totalItems, completedItems, percentage }) => {
            const isRoomCard = progressView === "room" && id !== "no-room";
            const content = (
              <>
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div className="space-y-1">
                    <p className="font-semibold">{label}</p>
                    <p className="text-sm text-muted">
                      {completedItems}/{totalItems} items completed
                    </p>
                  </div>
                  <Badge variant={percentage === 100 && totalItems > 0 ? "success" : "neutral"}>
                    {percentage}%
                  </Badge>
                </div>
                <div className="h-3 overflow-hidden rounded-pill bg-surface-strong">
                  <div
                    className="h-full rounded-pill bg-primary transition-[width] duration-300"
                    style={{ width: `${percentage}%` }}
                  />
                </div>
              </>
            );

            return isRoomCard ? (
              <Link
                key={id}
                href={`/app/houses/${houseId}/items?roomId=${id}`}
                className="block"
              >
                <Card className="space-y-3 p-4 transition hover:border-primary/30 hover:shadow-soft">
                  {content}
                </Card>
              </Link>
            ) : (
              <Card key={id} className="space-y-3 p-4">
                {content}
              </Card>
            );
          })
        ) : (
          <p className="text-sm leading-6 text-muted">
            Add structure and items first to start tracking progress here.
          </p>
        )}
      </div>

      <p className="text-sm leading-6 text-muted">
        Completion is based on purchased items over total items in the selected grouping.
      </p>
    </Card>
  );
}
