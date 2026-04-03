import type { AuthUser } from "@/integrations/clerk/clerk-boundary";
import type { CreateItemInput, DeleteItemInput, Item, UpdateItemInput } from "@/features/items/domain/item.types";

export interface ItemRepository {
  listByHouse(user: AuthUser, houseId: string): Promise<Item[]>;
  createItem(user: AuthUser, input: CreateItemInput): Promise<Item[]>;
  updateItem(user: AuthUser, input: UpdateItemInput): Promise<Item[]>;
  deleteItem(user: AuthUser, input: DeleteItemInput): Promise<Item[]>;
}
