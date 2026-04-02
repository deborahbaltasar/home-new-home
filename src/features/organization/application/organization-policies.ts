import type { Category, Room, RoomColor } from "@/features/organization/domain/organization.types";

export const roomColorLabel: Record<RoomColor, string> = {
  sand: "Sand",
  sky: "Sky",
  sage: "Sage",
  terracotta: "Terracotta",
  slate: "Slate"
};

export const roomColorClassName: Record<RoomColor, string> = {
  sand: "bg-amber-100 text-amber-800 dark:bg-amber-400/15 dark:text-amber-100",
  sky: "bg-sky-100 text-sky-800 dark:bg-sky-400/15 dark:text-sky-100",
  sage: "bg-emerald-100 text-emerald-800 dark:bg-emerald-400/15 dark:text-emerald-100",
  terracotta: "bg-orange-100 text-orange-800 dark:bg-orange-400/15 dark:text-orange-100",
  slate: "bg-slate-200 text-slate-800 dark:bg-slate-300/15 dark:text-slate-100"
};

export const roomColorOptions = Object.keys(roomColorLabel) as RoomColor[];

export function sortRooms(rooms: Room[]) {
  return [...rooms].sort((left, right) => left.name.localeCompare(right.name));
}

export function sortCategories(categories: Category[]) {
  return [...categories].sort((left, right) => left.name.localeCompare(right.name));
}
