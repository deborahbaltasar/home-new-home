import type {
  ChecklistPhase,
  ChecklistStatus,
  ChecklistTask
} from "@/features/checklist/domain/checklist.types";

const taskWeight = (task: ChecklistTask): number =>
  task.subtasks?.length
    ? task.subtasks.reduce((total, subtask) => total + taskWeight(subtask), 0)
    : 1;

const statusValue: Record<ChecklistStatus, number> = {
  not_started: 0,
  blocked: 0,
  in_progress: 0.5,
  done: 1
};

const taskProgress = (task: ChecklistTask): number => {
  if (!task.subtasks?.length) {
    return statusValue[task.status];
  }

  const totalWeight = task.subtasks.reduce((total, subtask) => total + taskWeight(subtask), 0);
  const completedWeight = task.subtasks.reduce(
    (total, subtask) => total + taskProgress(subtask) * taskWeight(subtask),
    0
  );

  return totalWeight === 0 ? statusValue[task.status] : completedWeight / totalWeight;
};

export function calculatePhaseProgress(phase: ChecklistPhase) {
  const totalWeight = phase.tasks.reduce((total, task) => total + taskWeight(task), 0);
  const completedWeight = phase.tasks.reduce(
    (total, task) => total + taskProgress(task) * taskWeight(task),
    0
  );

  return totalWeight === 0 ? 0 : Math.round((completedWeight / totalWeight) * 100);
}

export function calculateOverallProgress(phases: ChecklistPhase[]) {
  if (phases.length === 0) {
    return 0;
  }

  const total = phases.reduce((sum, phase) => sum + calculatePhaseProgress(phase), 0);
  return Math.round(total / phases.length);
}

