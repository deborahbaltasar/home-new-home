export type ItemPriority = "now" | "next" | "later";

export type ItemEssentiality = "essential" | "helpful" | "optional";

export type ItemStatus = "planning" | "researching" | "ready_to_buy" | "reserved" | "purchased";

export type Item = {
  id: string;
  houseId: string;
  roomId?: string;
  categoryId?: string;
  name: string;
  notes?: string;
  priority: ItemPriority;
  essentiality: ItemEssentiality;
  quantity: number;
  status: ItemStatus;
  imageUrl?: string;
  attachmentUrls: string[];
  createdAt: string;
  updatedAt: string;
};

export type CreateItemInput = {
  houseId: string;
  roomId?: string;
  categoryId?: string;
  name: string;
  notes?: string;
  priority: ItemPriority;
  essentiality: ItemEssentiality;
  quantity: number;
  status: ItemStatus;
  imageUrl?: string;
  attachmentUrls: string[];
};

export type UpdateItemInput = {
  houseId: string;
  itemId: string;
  roomId?: string;
  categoryId?: string;
  name?: string;
  notes?: string;
  priority?: ItemPriority;
  essentiality?: ItemEssentiality;
  quantity?: number;
  status?: ItemStatus;
  imageUrl?: string;
  attachmentUrls?: string[];
};

export type DeleteItemInput = {
  houseId: string;
  itemId: string;
};
