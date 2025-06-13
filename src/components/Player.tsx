import React from "react";
import type { Player } from "../types";
import "./Player.css";

interface PlayerProps {
  player: Player;
}

export const PlayerComponent: React.FC<PlayerProps> = ({ player }) => {
  return (
    <div
      className="player"
      style={{
        left: `${player.x * 32}px`,
        top: `${player.y * 32}px`,
        backgroundColor: player.color,
      }}
    />
  );
};
