import type {
  House,
  HouseCoverTone,
  HouseInvite,
  HouseMember,
  HouseRole
} from "@/features/houses/domain/house.types";

const roleWeight: Record<HouseRole, number> = {
  owner: 3,
  admin: 2,
  member: 1
};

export const houseRoleLabel: Record<HouseRole, string> = {
  owner: "Owner",
  admin: "Admin",
  member: "Member"
};

export const houseCoverToneLabel: Record<HouseCoverTone, string> = {
  coastal: "Coastal light",
  garden: "Garden calm",
  sunset: "Warm sunset",
  stone: "Stone neutral"
};

export const houseCoverToneClassName: Record<HouseCoverTone, string> = {
  coastal: "from-sky-500/30 via-cyan-400/20 to-background",
  garden: "from-emerald-500/25 via-lime-400/15 to-background",
  sunset: "from-orange-500/25 via-amber-400/15 to-background",
  stone: "from-slate-400/20 via-zinc-300/15 to-background"
};

export function getHouseMemberForUser(house: House, userId: string) {
  return house.members.find((member) => member.userId === userId) ?? null;
}

export function canManageHouse(house: House, userId: string) {
  const member = getHouseMemberForUser(house, userId);
  return member?.role === "owner" || member?.role === "admin";
}

export function sortHouseMembers(members: HouseMember[]) {
  return [...members].sort((left, right) => {
    const roleDifference = roleWeight[right.role] - roleWeight[left.role];

    if (roleDifference !== 0) {
      return roleDifference;
    }

    return left.name.localeCompare(right.name);
  });
}

export function sortHouseInvites(invites: HouseInvite[]) {
  return [...invites].sort((left, right) => right.createdAt.localeCompare(left.createdAt));
}

export function getHouseStats(house: House) {
  const admins = house.members.filter((member) => member.role !== "member").length;

  return {
    members: house.members.length,
    admins,
    invites: house.invites.length
  };
}

export function getHouseCompletionPercentage(totalItems: number, completedItems: number) {
  if (totalItems <= 0) {
    return 0;
  }

  return Math.round((completedItems / totalItems) * 100);
}
