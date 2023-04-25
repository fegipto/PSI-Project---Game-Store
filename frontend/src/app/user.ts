import { Item } from "./item";

export interface User {
    id: number;
    name: string;
    lists: {"Default": Item[]};
    library: {"Default": Item[]};
    following: User[];
    followers: User[];
  }