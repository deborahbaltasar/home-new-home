export type PublicRoadmapStatus = "Available" | "In Progress" | "Coming Soon";

export type ProductRoadmapEntry = {
  id: string;
  title: string;
  description: string;
  mappedTaskIds: string[];
  weight: number;
};

