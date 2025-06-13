import { useEffect } from "react";
import React from "react";
import type { TileType, Player } from "../../types";
import { Tile } from "../Tile";
import "./Map.css";

interface EntranceHallMapProps {
  player: Player;
  onZoneChange: (zone: string, spawn: { x: number; y: number }) => void;
}

export const width = 15;
export const height = 12;

// Exportable tile layout function for logic and rendering
export const generateEntranceHallTiles = (): TileType[][] => {
  const map: TileType[][] = [];

  for (let y = 0; y < height; y++) {
    const row: TileType[] = [];
    for (let x = 0; x < width; x++) {
      if (y === 1 && x === 7) {
        row.push("door"); // to Great Hall
      } else if (y === 0 || y === height - 1 || x === 0 || x === width - 1) {
        row.push("wall");
      } else if (y === 10 && (x === 5 || x === 9)) {
        row.push("stairs"); // stairs to dungeon/upper floors
      } else {
        row.push("floor");
      }
    }
    map.push(row);
  }

  return map;
};

export const EntranceHallMap: React.FC<EntranceHallMapProps> = ({
  player,
  onZoneChange,
}) => {
  const tiles = generateEntranceHallTiles();

  useEffect(() => {
    if (player.x === 7 && player.y === 1) {
      onZoneChange("great-hall", { x: 7, y: height - 2 });
    }
  }, [player.x, player.y, onZoneChange]);

  return (
    <div className="map-container">
      <div
        className="map"
        style={{ gridTemplateColumns: `repeat(${width}, 32px)` }}
      >
        {tiles.flatMap((row, y) =>
          row.map((type, x) => {
            return (
              <div
                key={`${x}-${y}`}
                style={{
                  width: 32,
                  height: 32,
                  position: "relative",
                  boxSizing: "border-box",
                }}
              >
                <Tile x={x} y={y} type={type} player={player} />
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
