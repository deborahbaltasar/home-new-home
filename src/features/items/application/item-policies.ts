import type {
  Item,
  ItemEssentiality,
  ItemPriority,
  ItemStatus
} from "@/features/items/domain/item.types";
import type { Category, Room } from "@/features/organization/domain/organization.types";

export const itemPriorityLabel: Record<ItemPriority, string> = {
  now: "Now",
  next: "Next",
  later: "Later"
};

export const itemEssentialityLabel: Record<ItemEssentiality, string> = {
  essential: "Essential",
  helpful: "Helpful",
  optional: "Optional"
};

export const itemStatusLabel: Record<ItemStatus, string> = {
  planning: "Planning",
  researching: "Researching",
  ready_to_buy: "Ready to buy",
  reserved: "Reserved",
  purchased: "Purchased"
};

export const itemPriorityOptions = Object.keys(itemPriorityLabel) as ItemPriority[];
export const itemEssentialityOptions = Object.keys(itemEssentialityLabel) as ItemEssentiality[];
export const itemStatusOptions = Object.keys(itemStatusLabel) as ItemStatus[];

export type ItemView = "all" | "essentials" | "open" | "completed";

export const itemViewLabel: Record<ItemView, string> = {
  all: "All",
  essentials: "Essentials",
  open: "Open",
  completed: "Completed"
};

export const itemViewOptions = Object.keys(itemViewLabel) as ItemView[];

export function sortItems(items: Item[]) {
  return [...items].sort((left, right) => {
    const priorityRank = itemPriorityOptions.indexOf(left.priority) - itemPriorityOptions.indexOf(right.priority);

    if (priorityRank !== 0) {
      return priorityRank;
    }

    return left.name.localeCompare(right.name);
  });
}

export function filterItemsByView(items: Item[], view: ItemView) {
  if (view === "essentials") {
    return items.filter((item) => item.essentiality === "essential");
  }

  if (view === "open") {
    return items.filter((item) => item.status !== "purchased");
  }

  if (view === "completed") {
    return items.filter((item) => item.status === "purchased");
  }

  return items;
}

export function getItemViewSummary(items: Item[]) {
  return {
    total: items.length,
    essentials: items.filter((item) => item.essentiality === "essential").length,
    open: items.filter((item) => item.status !== "purchased").length,
    completed: items.filter((item) => item.status === "purchased").length
  };
}

export function findRoomLabel(rooms: Room[], roomId?: string) {
  if (!roomId) {
    return "No room";
  }

  return rooms.find((room) => room.id === roomId)?.name ?? "Unknown room";
}

export function findCategoryLabel(categories: Category[], categoryId?: string) {
  if (!categoryId) {
    return "No category";
  }

  return categories.find((category) => category.id === categoryId)?.name ?? "Unknown category";
}
