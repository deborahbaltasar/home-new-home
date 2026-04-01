export type ChecklistStatus = "not_started" | "in_progress" | "blocked" | "done";

export type ChecklistTask = {
  id: string;
  title: string;
  status: ChecklistStatus;
  dependencies: string[];
  acceptanceCriteria: string;
  subtasks?: ChecklistTask[];
};

export type ChecklistPhase = {
  id: string;
  title: string;
  objective: string;
  tasks: ChecklistTask[];
};

