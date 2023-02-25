import React, { FC } from "react";
import type { TileGrid } from "@/shared/types";
import Tile, { EmptyTile } from "./Tile";

type MapProps = {
  tiles: TileGrid;
};

export const Map: FC<MapProps> = ({ tiles }) => {
  return (
    <div className="notched-module mx-auto grid max-w-[1024px] cursor-pointer grid-cols-16 grid-rows-16 gap-0 border-4 border-black">
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
