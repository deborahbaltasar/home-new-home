import type { AuthUser } from "@/integrations/clerk/clerk-boundary";
import type {
  CreateCategoryInput,
  CreateRoomInput,
  DeleteCategoryInput,
  DeleteRoomInput,
  HouseOrganization
} from "@/features/organization/domain/organization.types";

export interface OrganizationRepository {
  getByHouse(user: AuthUser, houseId: string): Promise<HouseOrganization>;
  createRoom(user: AuthUser, input: CreateRoomInput): Promise<HouseOrganization>;
  deleteRoom(user: AuthUser, input: DeleteRoomInput): Promise<HouseOrganization>;
  createCategory(user: AuthUser, input: CreateCategoryInput): Promise<HouseOrganization>;
  deleteCategory(user: AuthUser, input: DeleteCategoryInput): Promise<HouseOrganization>;
}
