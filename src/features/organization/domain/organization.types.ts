export type RoomColor = "sand" | "sky" | "sage" | "terracotta" | "slate";

export type Room = {
  id: string;
  houseId: string;
  name: string;
  color: RoomColor;
  createdAt: string;
};

export type Category = {
  id: string;
  houseId: string;
  name: string;
  createdAt: string;
};

export type HouseOrganization = {
  rooms: Room[];
  categories: Category[];
};

export type CreateRoomInput = {
  houseId: string;
  name: string;
  color: RoomColor;
};

export type CreateCategoryInput = {
  houseId: string;
  name: string;
};

export type DeleteRoomInput = {
  houseId: string;
  roomId: string;
};

export type DeleteCategoryInput = {
  houseId: string;
  categoryId: string;
};
