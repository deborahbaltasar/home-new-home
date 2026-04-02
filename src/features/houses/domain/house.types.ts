export type HouseRole = "owner" | "admin" | "member";

export type InviteRole = Exclude<HouseRole, "owner">;

export type HouseCoverTone = "coastal" | "garden" | "sunset" | "stone";

export type HouseMember = {
  id: string;
  userId: string;
  name: string;
  email?: string;
  role: HouseRole;
  joinedAt: string;
};

export type HouseInvite = {
  id: string;
  token: string;
  label: string;
  role: InviteRole;
  createdAt: string;
  createdByUserId: string;
  inviteUrl: string;
};

export type House = {
  id: string;
  name: string;
  city?: string;
  coverTone: HouseCoverTone;
  createdAt: string;
  members: HouseMember[];
  invites: HouseInvite[];
};

export type CreateHouseInput = {
  name: string;
  city?: string;
  coverTone: HouseCoverTone;
};

export type CreateHouseInviteInput = {
  houseId: string;
  label: string;
  role: InviteRole;
};

export type UpdateHouseMemberRoleInput = {
  houseId: string;
  memberId: string;
  role: InviteRole;
};

export type RemoveHouseMemberInput = {
  houseId: string;
  memberId: string;
};
