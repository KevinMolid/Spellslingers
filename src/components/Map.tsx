import React from "react";
import { Tile } from "./Tile";
import { PlayerComponent } from "./Player";
import type { TileData, TileType, Player } from "../types";
import "./Map.css";

interface MapProps {
  player: Player;
}

const mapWidth = 15;
const mapHeight = 12;

const generateMap = (): TileData[] => {
  const tiles: TileData[] = [];
  for (let y = 0; y < mapHeight; y++) {
    for (let x = 0; x < mapWidth; x++) {
      let type: TileType = "grass";
      if (x === 0 || y === 0 || x === mapWidth - 1 || y === mapHeight - 1) {
        type = "wall";
      }
      tiles.push({ x, y, type });
    }
  }
  return tiles;
};

export const Map: React.FC<MapProps> = ({ player }) => {
  const tiles = generateMap();

  return (
    <div className="map-container">
      <div className="map">
        {tiles.map((tile) => (
          <Tile key={`${tile.x}-${tile.y}`} tile={tile} />
        ))}
        <PlayerComponent player={player} />
      </div>
    </div>
  );
};
