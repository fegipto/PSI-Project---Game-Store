import { Item } from "./item";

export interface User {
    id: number;
    name: string;
    password: string,
    lists: {"Default": Item[]} | undefined;
    library: {"Default": Item[]} | undefined;
    following: User[] | undefined;
    followers: User[] | undefined;
    imagens: {
      data: string;
      contentType: string;
    };
    imagens_profile : string,
    cart: Map<Item, number> | undefined;
  }