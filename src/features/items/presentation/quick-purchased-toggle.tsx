"use client";

import { useEffect, useRef, useState, useTransition } from "react";

import { updateItemStatusAction } from "@/features/items/presentation/item-actions";

type QuickPurchasedToggleProps = {
  houseId: string;
  itemId: string;
  checked: boolean;
};

export function QuickPurchasedToggle({
  houseId,
  itemId,
  checked
}: QuickPurchasedToggleProps) {
  const [isPending, startTransition] = useTransition();
  const [optimisticChecked, setOptimisticChecked] = useState(checked);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setOptimisticChecked(checked);
  }, [checked]);

  function setCardLoadingState(nextValue: boolean) {
    const cardElement = inputRef.current?.closest("[data-item-card]") as HTMLElement | null;
    const overlayElement = cardElement?.querySelector("[data-item-loading-overlay]") as HTMLElement | null;

    if (!cardElement || !overlayElement) {
      return;
    }

    if (nextValue) {
      cardElement.setAttribute("data-item-loading", "true");
      overlayElement.classList.remove("hidden");
    } else {
      cardElement.removeAttribute("data-item-loading");
      overlayElement.classList.add("hidden");
    }
  }

  function handleChange() {
    const nextChecked = !optimisticChecked;
    setOptimisticChecked(nextChecked);
    setCardLoadingState(true);

    startTransition(async () => {
      try {
        await updateItemStatusAction({
          houseId,
          itemId,
          status: nextChecked ? "purchased" : "planning"
        });
      } catch {
        setOptimisticChecked(!nextChecked);
      } finally {
        setCardLoadingState(false);
      }
    });
  }

  return (
    <div className="flex items-center">
      <label className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-2xl border border-border bg-background/70 transition hover:border-primary/30 hover:bg-surface-muted/50">
        <input
          ref={inputRef}
          type="checkbox"
          checked={optimisticChecked}
          onChange={handleChange}
          className="h-4 w-4 rounded border-border accent-[var(--color-success)]"
          aria-label={optimisticChecked ? "Mark item as not purchased" : "Mark item as purchased"}
          disabled={isPending}
        />
      </label>
    </div>
  );
}
