// Tile.tsx
import React from "react";
import type { TileType, Player } from "../types";

export interface TileProps {
  x: number;
  y: number;
  type: TileType;
  player: Player;
}

export const Tile: React.FC<TileProps> = ({ x, y, type, player }) => {
  const isPlayerHere = player.x === x && player.y === y;

  const tileColors: Record<TileType, string> = {
    grass: "#7CFC00",
    water: "#00FFFF",
    floor: "#777",
    wall: "#444",
    door: "#AA8844",
    table: "#8B4513",
    torch: "#FFA500",
    banner: "#550000",
    stairs: "#999999",
  };

  const style: React.CSSProperties = {
    width: 32,
    height: 32,
    backgroundColor: isPlayerHere ? player.color : tileColors[type],
    border: "1px solid #222",
  };

  return <div style={style} />;
};
