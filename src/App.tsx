import React, { useEffect, useState } from "react";
import {
  GreatHallMap,
  generateGreatHallTiles,
} from "./components/maps/GreatHallMap";
import {
  EntranceHallMap,
  generateEntranceHallTiles,
} from "./components/maps/EntranceHall";
import type { Player, House } from "./types";
import { houses } from "./types";
import { HouseSelector } from "./components/HouseSelector";

const App: React.FC = () => {
  const [zone1, setZone1] = useState("great-hall");
  const [zone2, setZone2] = useState("great-hall");

  const [player1, setPlayer1] = useState<Player>({
    id: 1,
    x: 1,
    y: 1,
    color: "",
  });

  const [player2, setPlayer2] = useState<Player>({
    id: 2,
    x: 13,
    y: 10,
    color: "",
  });

  const [houseChosen1, setHouseChosen1] = useState(false);
  const [houseChosen2, setHouseChosen2] = useState(false);

  const [houseSelectedIndex1, setHouseSelectedIndex1] = useState(0);
  const [houseSelectedIndex2, setHouseSelectedIndex2] = useState(0);

  const houseColors: Record<House, string> = {
    Gryffindor: "#7F0909", // dark red
    Hufflepuff: "#EEE117", // yellow
    Ravenclaw: "#000A90", // dark blue
    Slytherin: "#1A472A", // dark green
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!houseChosen1) {
        // Player 1 controls for selection screen
        if (e.key === "a") {
          setHouseSelectedIndex1((i) => (i === 0 ? houses.length - 1 : i - 1));
        } else if (e.key === "d") {
          setHouseSelectedIndex1((i) => (i === houses.length - 1 ? 0 : i + 1));
        } else if (e.key === "w") {
          const house = houses[houseSelectedIndex1];
          setPlayer1((prev) => ({
            ...prev,
            house,
            color: houseColors[house], // <-- ADD THIS LINE
          }));
          setHouseChosen1(true);
        }
      }

      if (!houseChosen2) {
        // Player 2 controls for selection screen
        if (e.key === "ArrowLeft") {
          setHouseSelectedIndex2((i) => (i === 0 ? houses.length - 1 : i - 1));
        } else if (e.key === "ArrowRight") {
          setHouseSelectedIndex2((i) => (i === houses.length - 1 ? 0 : i + 1));
        } else if (e.key === "ArrowUp") {
          const house = houses[houseSelectedIndex2];
          setPlayer2((prev) => ({
            ...prev,
            house,
            color: houseColors[house], // <-- ADD THIS LINE
          }));
          setHouseChosen2(true);
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [houseChosen1, houseChosen2, houseSelectedIndex1, houseSelectedIndex2]);

  // --- Tile-based collision logic ---
  const isWalkable = (zone: string, x: number, y: number): boolean => {
    const tiles =
      zone === "great-hall"
        ? generateGreatHallTiles()
        : zone === "entrance-hall"
        ? generateEntranceHallTiles()
        : [];

    const tile = tiles[y]?.[x];
    return tile && tile !== "wall"; // Add more blocking types if needed
  };

  const renderMap = (
    zone: string,
    player: Player,
    onZoneChange: (zone: string, spawn: { x: number; y: number }) => void
  ) => {
    switch (zone) {
      case "great-hall":
        return <GreatHallMap player={player} onZoneChange={onZoneChange} />;
      case "entrance-hall":
        return <EntranceHallMap player={player} onZoneChange={onZoneChange} />;
      default:
        return null;
    }
  };

  const handleZoneChange1 = (zone: string, spawn: { x: number; y: number }) => {
    setZone1(zone);
    setPlayer1((prev) => ({ ...prev, ...spawn }));
  };

  const handleZoneChange2 = (zone: string, spawn: { x: number; y: number }) => {
    setZone2(zone);
    setPlayer2((prev) => ({ ...prev, ...spawn }));
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const key = e.key;

      if (["w", "a", "s", "d"].includes(key.toLowerCase())) {
        setPlayer1((prev) => {
          let { x, y } = prev;
          let newX = x;
          let newY = y;

          switch (key.toLowerCase()) {
            case "w":
              newY = y - 1;
              break;
            case "s":
              newY = y + 1;
              break;
            case "a":
              newX = x - 1;
              break;
            case "d":
              newX = x + 1;
              break;
          }

          return isWalkable(zone1, newX, newY)
            ? { ...prev, x: newX, y: newY }
            : prev;
        });
      }

      if (key.startsWith("Arrow")) {
        setPlayer2((prev) => {
          let { x, y } = prev;
          let newX = x;
          let newY = y;

          switch (key) {
            case "ArrowUp":
              newY = y - 1;
              break;
            case "ArrowDown":
              newY = y + 1;
              break;
            case "ArrowLeft":
              newX = x - 1;
              break;
            case "ArrowRight":
              newX = x + 1;
              break;
          }

          return isWalkable(zone2, newX, newY)
            ? { ...prev, x: newX, y: newY }
            : prev;
        });
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [zone1, zone2]);

  if (!houseChosen1 || !houseChosen2) {
    return (
      <div className="house-selection-screen">
        {!houseChosen1 && (
          <HouseSelector
            playerId={1}
            selectedIndex={houseSelectedIndex1}
            onSelect={(house) => {
              const typedHouse = house as House;
              console.log(
                "Player 1 choosing house",
                typedHouse,
                houseColors[typedHouse]
              );

              setPlayer1((prev) => ({
                ...prev,
                house: typedHouse,
                color: houseColors[typedHouse],
              }));
              setHouseChosen1(true);
            }}
          />
        )}
        {!houseChosen2 && (
          <HouseSelector
            playerId={2}
            selectedIndex={houseSelectedIndex2}
            onSelect={(house) => {
              const typedHouse = house as House;
              setPlayer2((prev) => ({
                ...prev,
                house: typedHouse,
                color: houseColors[typedHouse],
              }));
              setHouseChosen2(true);
            }}
          />
        )}
      </div>
    );
  }

  return (
    <div className="gamescreen">
      <div style={{ textAlign: "center" }}>
        <h2 style={{ color: "white" }}>Player 1 - {player1.house}</h2>
        {renderMap(zone1, player1, handleZoneChange1)}
      </div>
      <div style={{ textAlign: "center" }}>
        <h2 style={{ color: "white" }}>Player 2 - {player2.house}</h2>
        {renderMap(zone2, player2, handleZoneChange2)}
      </div>
    </div>
  );
};

export default App;
