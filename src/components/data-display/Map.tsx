import React, { FC } from "react";
import { Tile } from "./Tile";

type MapProps = {
  tiles: (Tile | null)[][];
};

export const Map: FC<MapProps> = ({ tiles }) => {
  return (
    <div className="grid grid-cols-12 grid-rows-12 gap-0">
      {tiles.map((row, index) =>
        row.map((tile) =>
          tile ? (
            <Tile key={tile.id} />
          ) : (
            <Tile key={index} className="bg-slate-400" />
          )
        )
      )}
    </div>
  );
};
