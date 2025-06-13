export const houses = [
  "Gryffindor",
  "Hufflepuff",
  "Ravenclaw",
  "Slytherin",
] as const;
export type House = (typeof houses)[number];

export type TileType =
  | "grass"
  | "water"
  | "floor"
  | "wall"
  | "door"
  | "table"
  | "torch"
  | "banner"
  | "stairs";

export interface TileData {
  x: number;
  y: number;
  type: TileType;
}

export interface Player {
  id: number;
  x: number;
  y: number;
  color: string;
  house?: House;
}

export interface Zone {
  id: string;
  name: string;
  mapComponent: React.FC<any>;
  connections: {
    up?: string;
    down?: string;
    left?: string;
    right?: string;
  };
}
