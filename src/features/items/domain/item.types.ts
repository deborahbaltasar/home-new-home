export type ItemPriority = "now" | "next" | "later";

export type ItemEssentiality = "essential" | "helpful" | "optional";

export type ItemStatus = "planning" | "researching" | "ready_to_buy" | "reserved" | "purchased";

export type ItemStoreOption = {
  id: string;
  houseId: string;
  itemId: string;
  storeName: string;
  productUrl?: string;
  price: number;
  notes?: string;
  createdAt: string;
  updatedAt: string;
};

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
  targetPrice?: number;
  imageUrl?: string;
  attachmentUrls: string[];
  storeOptions: ItemStoreOption[];
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
  targetPrice?: number;
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
  targetPrice?: number | null;
  imageUrl?: string;
  attachmentUrls?: string[];
};

export type DeleteItemInput = {
  houseId: string;
  itemId: string;
};

export type CreateItemStoreOptionInput = {
  houseId: string;
  itemId: string;
  storeName: string;
  productUrl?: string;
  price: number;
  notes?: string;
};

export type UpdateItemStoreOptionInput = {
  houseId: string;
  itemId: string;
  optionId: string;
  storeName?: string;
  productUrl?: string;
  price?: number;
  notes?: string;
};

export type DeleteItemStoreOptionInput = {
  houseId: string;
  itemId: string;
  optionId: string;
};
