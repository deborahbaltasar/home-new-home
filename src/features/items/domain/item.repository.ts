import type { AuthUser } from "@/integrations/clerk/clerk-boundary";
import type {
  CreateItemInput,
  CreateItemStoreOptionInput,
  DeleteItemInput,
  DeleteItemStoreOptionInput,
  Item,
  UpdateItemInput,
  UpdateItemStoreOptionInput
} from "@/features/items/domain/item.types";

export interface ItemRepository {
  listByHouse(user: AuthUser, houseId: string): Promise<Item[]>;
  createItem(user: AuthUser, input: CreateItemInput): Promise<Item[]>;
  updateItem(user: AuthUser, input: UpdateItemInput): Promise<Item[]>;
  deleteItem(user: AuthUser, input: DeleteItemInput): Promise<Item[]>;
  createStoreOption(user: AuthUser, input: CreateItemStoreOptionInput): Promise<Item[]>;
  updateStoreOption(user: AuthUser, input: UpdateItemStoreOptionInput): Promise<Item[]>;
  deleteStoreOption(user: AuthUser, input: DeleteItemStoreOptionInput): Promise<Item[]>;
}
