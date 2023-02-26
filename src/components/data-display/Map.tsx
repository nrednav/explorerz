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
      <GridOfTiles tiles={tiles} />
    </div>
  );
};

const GridOfTiles = ({ tiles }: { tiles: TileGrid }) => {
  const [selectedCoordinate, setSelectedCoordinate] = useAtom(
    selectedCoordinateAtom
  );

  const selectTile = useCallback(
    (x: number, y: number) => () => setSelectedCoordinate({ x, y }),
    [tiles, setSelectedCoordinate]
  );

  const selectedTileStyles = "border-yellow-400 sm:!border-4";

  return (
    <>
      {tiles.map((row, rowIndex) => {
        return row.map((tile, colIndex) => {
          const key = `${rowIndex}-${colIndex}`;

          const isSelected = selectedCoordinate
            ? selectedCoordinate.x === colIndex &&
              selectedCoordinate.y === rowIndex
            : false;

          return tile ? (
            <Tile
              key={key}
              tile={tile}
              onClick={selectTile(colIndex, rowIndex)}
              className={clsx(isSelected && selectedTileStyles)}
            />
          ) : (
            <EmptyTile
              key={key}
              onClick={selectTile(colIndex, rowIndex)}
              className={clsx(isSelected && selectedTileStyles)}
            />
          );
        });
      })}
    </>
  );
};
