import type { ProductRoadmapEntry } from "@/features/roadmap/domain/roadmap.types";

export const publicRoadmapSeed: ProductRoadmapEntry[] = [
  {
    id: "organize-home",
    title: "Organize by rooms and categories",
    description: "See what the house needs by space, purpose, and priority.",
    mappedTaskIds: ["phase-5-rooms-categories", "phase-6-items-core"],
    weight: 3
  },
  {
    id: "compare-options",
    title: "Compare purchase options",
    description: "Track stores, prices, and better buying choices in one place.",
    mappedTaskIds: ["phase-7-store-options", "phase-10-work-hours"],
    weight: 2
  },
  {
    id: "share-publicly",
    title: "Share items publicly",
    description: "Let other people reserve or buy items through simple links.",
    mappedTaskIds: ["phase-8-public-sharing"],
    weight: 2
  },
  {
    id: "decide-together",
    title: "Decide together",
    description: "Prepare collaborative voting and planning flows for the household.",
    mappedTaskIds: ["phase-9-decisions"],
    weight: 2
  },
  {
    id: "public-roadmap",
    title: "Follow the product roadmap in plain language",
    description: "Track progress with friendly statuses instead of technical implementation jargon.",
    mappedTaskIds: ["phase-2-public-roadmap", "phase-11-roadmap-sync"],
    weight: 2
  }
];
