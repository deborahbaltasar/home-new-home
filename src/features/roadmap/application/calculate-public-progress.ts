import type { ProductRoadmapEntry } from "@/features/roadmap/domain/roadmap.types";

type RoadmapEntryWithCompletion = ProductRoadmapEntry & {
  completion: number;
};

export function calculatePublicProgress(entries: RoadmapEntryWithCompletion[]) {
  const totalWeight = entries.reduce((sum, entry) => sum + entry.weight, 0);

  if (totalWeight === 0) {
    return 0;
  }

  const weightedCompletion = entries.reduce(
    (sum, entry) => sum + entry.completion * entry.weight,
    0
  );

  return Math.round(weightedCompletion / totalWeight);
}
