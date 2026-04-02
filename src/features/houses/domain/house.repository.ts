import type { AuthUser } from "@/integrations/clerk/clerk-boundary";

import type {
  CreateHouseInput,
  CreateHouseInviteInput,
  House,
  RemoveHouseMemberInput,
  UpdateHouseMemberRoleInput
} from "@/features/houses/domain/house.types";

export interface HouseRepository {
  listByUser(user: AuthUser): Promise<House[]>;
  findByIdForUser(user: AuthUser, houseId: string): Promise<House | null>;
  createHouse(user: AuthUser, input: CreateHouseInput): Promise<House>;
  createInvite(user: AuthUser, input: CreateHouseInviteInput): Promise<House>;
  updateMemberRole(user: AuthUser, input: UpdateHouseMemberRoleInput): Promise<House>;
  removeMember(user: AuthUser, input: RemoveHouseMemberInput): Promise<House>;
}
