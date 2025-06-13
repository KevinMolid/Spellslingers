// mapData.ts
import {
  generateGreatHallTiles,
  width as ghWidth,
  height as ghHeight,
} from "./GreatHallMap";
import {
  generateEntranceHallTiles,
  width as ehWidth,
  height as ehHeight,
} from "./EntranceHall";

export const mapTileGenerators = {
  "great-hall": generateGreatHallTiles,
  "entrance-hall": generateEntranceHallTiles,
};

export const mapConfigs = {
  "great-hall": { width: ghWidth, height: ghHeight },
  "entrance-hall": { width: ehWidth, height: ehHeight },
};
