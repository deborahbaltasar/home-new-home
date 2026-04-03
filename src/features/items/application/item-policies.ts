import type {
  Item,
  ItemEssentiality,
  ItemPriority,
  ItemStatus,
  ItemStoreOption
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
    completed: items.filter((item) => item.status === "purchased").length,
    optionsTracked: items.filter((item) => item.storeOptions.length > 0).length
  };
}

export function formatPrice(value: number) {
  return value.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });
}

export function sortStoreOptions(options: ItemStoreOption[]) {
  return [...options].sort((left, right) => left.price - right.price);
}

export function getStoreOptionComparison(item: Item) {
  const sortedOptions = sortStoreOptions(item.storeOptions);
  const cheapestOption = sortedOptions[0];
  const mostExpensiveOption = sortedOptions.at(-1);
  const priceSpread =
    cheapestOption && mostExpensiveOption ? mostExpensiveOption.price - cheapestOption.price : 0;
  const optionsWithinTarget =
    item.targetPrice === undefined
      ? []
      : sortedOptions.filter((option) => option.price <= item.targetPrice);

  return {
    optionCount: sortedOptions.length,
    cheapestOption,
    mostExpensiveOption,
    priceSpread,
    optionsWithinTarget,
    targetGap:
      item.targetPrice !== undefined && cheapestOption
        ? cheapestOption.price - item.targetPrice
        : undefined
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
