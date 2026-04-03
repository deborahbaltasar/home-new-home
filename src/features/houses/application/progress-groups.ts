import { getHouseCompletionPercentage } from "@/features/houses/application/house-policies";
import type { Item } from "@/features/items/domain/item.types";
import type { HouseOrganization } from "@/features/organization/domain/organization.types";

export type ProgressView = "room" | "priority" | "status" | "category";

export type ProgressGroup = {
  id: string;
  label: string;
  totalItems: number;
  completedItems: number;
  percentage: number;
};

export const progressViewLabel: Record<ProgressView, string> = {
  room: "Progress by room.",
  priority: "Progress by priority.",
  status: "Progress by status.",
  category: "Progress by category."
};

export function isProgressView(value: string | undefined): value is ProgressView {
  return value === "room" || value === "priority" || value === "status" || value === "category";
}

export function buildProgressGroups(
  view: ProgressView,
  organization: HouseOrganization,
  items: Item[]
): ProgressGroup[] {
  const rawGroups =
    view === "priority"
      ? [
          { id: "now", label: "Now", items: items.filter((item) => item.priority === "now") },
          { id: "next", label: "Next", items: items.filter((item) => item.priority === "next") },
          { id: "later", label: "Later", items: items.filter((item) => item.priority === "later") }
        ]
      : view === "status"
        ? [
            { id: "planning", label: "Planning", items: items.filter((item) => item.status === "planning") },
            { id: "researching", label: "Researching", items: items.filter((item) => item.status === "researching") },
            { id: "ready_to_buy", label: "Ready to buy", items: items.filter((item) => item.status === "ready_to_buy") },
            { id: "reserved", label: "Reserved", items: items.filter((item) => item.status === "reserved") },
            { id: "purchased", label: "Purchased", items: items.filter((item) => item.status === "purchased") }
          ]
        : view === "category"
          ? [
              ...organization.categories.map((category) => ({
                id: category.id,
                label: category.name,
                items: items.filter((item) => item.categoryId === category.id)
              })),
              {
                id: "no-category",
                label: "No category",
                items: items.filter((item) => !item.categoryId)
              }
            ]
          : [
              ...organization.rooms.map((room) => ({
                id: room.id,
                label: room.name,
                items: items.filter((item) => item.roomId === room.id)
              })),
              {
                id: "no-room",
                label: "No room",
                items: items.filter((item) => !item.roomId)
              }
            ];

  return rawGroups.map((group) => {
    const completedItems = group.items.filter((item) => item.status === "purchased").length;

    return {
      id: group.id,
      label: group.label,
      totalItems: group.items.length,
      completedItems,
      percentage: getHouseCompletionPercentage(group.items.length, completedItems)
    };
  });
}
