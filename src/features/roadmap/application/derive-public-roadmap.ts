import type { ChecklistPhase, ChecklistTask } from "@/features/checklist/domain/checklist.types";
import type {
  ProductRoadmapEntry,
  PublicRoadmapStatus
} from "@/features/roadmap/domain/roadmap.types";

type DerivedRoadmapEntry = ProductRoadmapEntry & {
  completion: number;
  status: PublicRoadmapStatus;
};

const flattenTasks = (phases: ChecklistPhase[]) =>
  phases.flatMap((phase) => phase.tasks.flatMap((task) => flattenTask(task)));

const flattenTask = (task: ChecklistTask): ChecklistTask[] =>
  task.subtasks?.length
    ? [task, ...task.subtasks.flatMap((subtask) => flattenTask(subtask))]
    : [task];

const taskCompletion = (status: ChecklistTask["status"]) => {
  if (status === "done") return 1;
  if (status === "in_progress") return 0.5;
  return 0;
};

export function derivePublicRoadmap(
  entries: ProductRoadmapEntry[],
  phases: ChecklistPhase[]
): DerivedRoadmapEntry[] {
  const taskMap = new Map(flattenTasks(phases).map((task) => [task.id, task]));

  return entries.map((entry) => {
    const mappedTasks = entry.mappedTaskIds
      .map((taskId) => taskMap.get(taskId))
      .filter((task): task is ChecklistTask => Boolean(task));

    const completion =
      mappedTasks.length === 0
        ? 0
        : Math.round(
            (mappedTasks.reduce((sum, task) => sum + taskCompletion(task.status), 0) /
              mappedTasks.length) *
              100
          );

    const status: PublicRoadmapStatus =
      completion === 100 ? "Available" : completion > 0 ? "In Progress" : "Coming Soon";

    return {
      ...entry,
      completion,
      status
    };
  });
}
