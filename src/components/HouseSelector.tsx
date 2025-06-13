import React from "react";
import "./HouseSelector.css";

interface HouseSelectorProps {
  playerId: number;
  onSelect: (house: string) => void;
  selectedIndex?: number;
}

export const HouseSelector: React.FC<HouseSelectorProps> = ({
  playerId,
  onSelect,
  selectedIndex = -1,
}) => {
  const houses = ["Gryffindor", "Hufflepuff", "Ravenclaw", "Slytherin"];

  return (
    <div className="house-selector">
      <h2 style={{ color: "white" }}>Player {playerId}, choose your house:</h2>
      <div style={{ display: "flex", gap: "1rem", justifyContent: "center" }}>
        {houses.map((house, i) => (
          <button
            key={house}
            className={`${house.toLowerCase()} ${
              i === selectedIndex ? "selected" : ""
            }`}
            onClick={() => onSelect(house)}
          >
            {house}
          </button>
        ))}
      </div>
    </div>
  );
};
