import { useEffect } from "react";
import React from "react";
import type { TileType, Player } from "../../types";
import { Tile } from "../Tile";
import "./Map.css";

interface GreatHallMapProps {
  player: Player;
  onZoneChange: (zone: string, spawn: { x: number; y: number }) => void;
}

export const width = 15;
export const height = 12;

// Exported tile generator for external use (e.g., in App.tsx)
export const generateGreatHallTiles = (): TileType[][] => {
  const map: TileType[][] = [];

  for (let y = 0; y < height; y++) {
    const row: TileType[] = [];
    for (let x = 0; x < width; x++) {
      if (y === height - 1 && x === 7) {
        row.push("door"); // leads to entrance hall
      } else if (y === 0 || y === height - 1 || x === 0 || x === width - 1) {
        row.push("wall");
      } else if (y === 2 && x > 1 && x < 13) {
        row.push("table");
      } else if (y === 4 && x > 1 && x < 13) {
        row.push("table");
      } else {
        row.push("floor");
      }
    }
    map.push(row);
  }

  return map;
};

export const GreatHallMap: React.FC<GreatHallMapProps> = ({
  player,
  onZoneChange,
}) => {
  const tiles = generateGreatHallTiles();

  useEffect(() => {
    if (player.x === 7 && player.y === height - 1) {
      onZoneChange("entrance-hall", { x: 7, y: 2 });
    }
  }, [player.x, player.y, onZoneChange]);

  return (
    <div className="map-container">
      <div
        className="map"
        style={{ gridTemplateColumns: `repeat(${width}, 32px)` }}
      >
        {tiles.flatMap((row, y) =>
          row.map((type, x) => (
            <Tile key={`${x}-${y}`} x={x} y={y} type={type} player={player} />
          ))
        )}
      </div>
    </div>
  );
};
