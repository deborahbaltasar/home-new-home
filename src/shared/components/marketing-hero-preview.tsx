"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Badge } from "@/design-system/primitives/badge";
import { Card } from "@/design-system/primitives/card";
import { Sheet } from "@/design-system/primitives/sheet";
import { cn } from "@/shared/lib/cn";
import {
  CircleHelp,
  Dices,
  HeartHandshake,
  House,
  ShoppingBag,
  SplitSquareHorizontal,
  Wallet
} from "lucide-react";
import { useMemo, useState } from "react";

type HeroTabId = "rooms" | "priorities" | "budget";

const tabs: Array<{ id: HeroTabId; label: string }> = [
  { id: "rooms", label: "Rooms" },
  { id: "priorities", label: "Priority" },
  { id: "budget", label: "Budget" }
];

const previewContent = {
  rooms: {
    heading: "Kitchen essentials",
    status: "Researching",
    statusVariant: "warning" as const,
    metrics: [
      ["7", "missing"],
      ["2", "shared"],
      ["1", "urgent"]
    ],
    left: ["shopping", "Lighting", "3 store options", "9.2 work hours"] as const,
    right: ["heart", "Gift-ready", "Public link active", "Reservation open"] as const,
    bottom: ["Priority poker", "Do I need this?", "This or that"]
  },
  priorities: {
    heading: "Move-in priorities",
    status: "Aligned",
    statusVariant: "success" as const,
    metrics: [
      ["5", "essential"],
      ["8", "desirable"],
      ["12", "optional"]
    ],
    left: ["house", "Bathroom setup", "Need before move-in", "High impact"] as const,
    right: ["heart", "Living room decor", "Can wait", "Lower urgency"] as const,
    bottom: ["Priority poker", "Do I need this?", "This or that"]
  },
  budget: {
    heading: "Budget snapshot",
    status: "Tracking",
    statusVariant: "primary" as const,
    metrics: [
      ["$980", "planned"],
      ["$420", "saved"],
      ["$560", "gap"]
    ],
    left: ["shopping", "Best option", "Kitchen bundle", "$185 target"] as const,
    right: ["wallet", "Work hours", "Lighting package", "9.2 hours"] as const,
    bottom: ["Priority poker", "Do I need this?", "This or that"]
  }
} as const;

function GameIcon({ label }: { label: string }) {
  if (label === "Priority poker") return <Dices className="h-6 w-6 text-primary" />;
  if (label === "Do I need this?") return <CircleHelp className="h-6 w-6 text-accent" />;
  return <SplitSquareHorizontal className="h-6 w-6 text-primary" />;
}

function PreviewIcon({ type }: { type: "shopping" | "heart" | "house" | "wallet" }) {
  if (type === "shopping") return <ShoppingBag className="h-4 w-4 text-accent" />;
  if (type === "wallet") return <Wallet className="h-4 w-4 text-primary" />;
  if (type === "house") return <House className="h-4 w-4 text-primary" />;
  return <HeartHandshake className="h-4 w-4 text-primary" />;
}

export function MarketingHeroPreview({ progress }: { progress: number }) {
  const [activeTab, setActiveTab] = useState<HeroTabId>("rooms");
  const [direction, setDirection] = useState(1);
  const active = previewContent[activeTab];
  const tabIndexMap = useMemo(
    () => Object.fromEntries(tabs.map((tab, index) => [tab.id, index])) as Record<HeroTabId, number>,
    []
  );

  const handleTabChange = (nextTab: HeroTabId) => {
    if (nextTab === activeTab) return;

    setDirection(tabIndexMap[nextTab] > tabIndexMap[activeTab] ? 1 : -1);
    setActiveTab(nextTab);
  };

  return (
    <Card tone="emphasis" className="w-full space-y-5 overflow-hidden p-6 sm:p-7">
      <div className="flex min-w-0 flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div className="min-w-0 space-y-1">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-primary">
            Overview
          </p>
          <h2 className="min-w-0 text-2xl font-semibold">Home Sweet Home</h2>
        </div>
        <Badge variant="success" className="w-fit self-start">
          {progress}% shaping up
        </Badge>
      </div>

      <div className="inline-flex max-w-full flex-wrap rounded-pill bg-surface-muted p-1">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => handleTabChange(tab.id)}
            className={cn(
              "rounded-pill px-4 py-2 text-sm font-medium transition",
              activeTab === tab.id
                ? "bg-surface text-foreground shadow-soft"
                : "text-muted hover:text-foreground"
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="relative overflow-hidden">
        <AnimatePresence initial={false} mode="wait" custom={direction}>
          <motion.div
            key={activeTab}
            custom={direction}
            variants={{
              enter: (dir: number) => ({
                x: dir > 0 ? 64 : -64,
                opacity: 0
              }),
              center: {
                x: 0,
                opacity: 1
              },
              exit: (dir: number) => ({
                x: dir > 0 ? -64 : 64,
                opacity: 0
              })
            }}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              duration: 0.42,
              ease: [0.22, 1, 0.36, 1]
            }}
            className="min-w-0 space-y-5"
          >
            <div className="grid min-w-0 gap-3">
              <Card tone="subtle" className="min-w-0 space-y-3">
                <div className="flex min-w-0 flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex min-w-0 items-center gap-3">
                    <div className="rounded-pill bg-primary/12 p-2 text-primary">
                      <House className="h-4 w-4" />
                    </div>
                    <p className="min-w-0 break-words font-semibold">{active.heading}</p>
                  </div>
                  <Badge variant={active.statusVariant} className="w-fit self-start">
                    {active.status}
                  </Badge>
                </div>
                <div className="grid min-w-0 grid-cols-3 gap-2 text-center">
                  {active.metrics.map(([value, label]) => (
                    <div
                      key={`${value}-${label}`}
                      className="min-w-0 rounded-2xl bg-surface px-3 py-2"
                    >
                      <p className="text-lg font-semibold">{value}</p>
                      <p className="text-xs uppercase tracking-[0.15em] text-muted">{label}</p>
                    </div>
                  ))}
                </div>
              </Card>

              <div className="grid gap-3 sm:grid-cols-2">
                <Card tone="subtle" className="min-w-0 space-y-2">
                  <div className="flex items-center gap-2">
                    <PreviewIcon type={active.left[0]} />
                    <p className="font-semibold">{active.left[1]}</p>
                  </div>
                  <p className="text-sm text-muted">{active.left[2]}</p>
                </Card>
                <Card tone="subtle" className="min-w-0 space-y-2">
                  <div className="flex items-center gap-2">
                    <PreviewIcon type={active.right[0]} />
                    <p className="font-semibold">{active.right[1]}</p>
                  </div>
                  <p className="text-sm text-muted">{active.right[2]}</p>
                  <p className="text-sm text-muted">{active.right[3]}</p>
                </Card>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      <Sheet className="overflow-hidden bg-canvas/80">
        <div className="grid min-w-0 gap-3 sm:grid-cols-3">
          {previewContent.rooms.bottom.map((label) => (
            <div key={label} className="min-w-0 rounded-2xl bg-surface px-4 py-3">
              <div className="flex items-center gap-2">
                <GameIcon label={label} />
                <p className="min-w-0 break-words text-xs font-semibold leading-5 sm:text-sm">
                  {label}
                </p>
              </div>
            </div>
          ))}
        </div>
      </Sheet>
    </Card>
  );
}
