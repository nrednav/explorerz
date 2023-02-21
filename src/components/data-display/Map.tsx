import React, { FC } from "react";
import type { TileGrid } from "@/shared/types";
import Tile, { EmptyTile } from "./Tile";

type MapProps = {
  tiles: TileGrid;
};

export const Map: FC<MapProps> = ({ tiles }) => {
  return (
    <div className="grid cursor-pointer grid-cols-12 grid-rows-12 gap-0">
      {renderGridOfTiles(tiles)}
    </div>
  );
};

const renderGridOfTiles = (tiles: TileGrid) => {
  return tiles.map((row, rowIndex) => {
    return row.map((tile, colIndex) => {
      const key = `${rowIndex}-${colIndex}`;
      return tile ? <Tile key={key} tile={tile} /> : <EmptyTile key={key} />;
    });
  });
};
