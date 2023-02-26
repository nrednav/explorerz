import React, { FC, useCallback } from "react";
import type { TileGrid } from "@/shared/types";
import Tile, { EmptyTile } from "./Tile";
import { selectedCoordinateAtom } from "@/store";
import clsx from "clsx";
import { useAtom } from "jotai";

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
  const [selectedCoordinate, setSelectedCoordinate] = useAtom(
    selectedCoordinateAtom
  );
  const selectTile = useCallback(
    (x: number, y: number) => setSelectedCoordinate({ x, y }),
    [tiles]
  );

  return tiles.map((row, rowIndex) => {
    return row.map((tile, colIndex) => {
      const key = `${rowIndex}-${colIndex}`;
      const isSelected = selectedCoordinate
        ? selectedCoordinate.x === colIndex && selectedCoordinate.y === rowIndex
        : false;
      return tile ? (
        <Tile
          key={key}
          tile={tile}
          onClick={() => selectTile(colIndex, rowIndex)}
          className={clsx(isSelected && "!border-4 border-yellow-400")}
        />
      ) : (
        <EmptyTile
          key={key}
          onClick={() => selectTile(colIndex, rowIndex)}
          className={clsx(isSelected && "!border-4 border-yellow-400")}
        />
      );
    });
  });
};
