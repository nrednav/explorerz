import React, { FC } from "react";
import Image from "next/image";
import { TileSchema } from "@/shared/types";
import clsx from "clsx";
import { z } from "zod";

type TileProps = {
  className?: string;
  tile?: z.infer<typeof TileSchema>;
  onClick?: () => void;
};

const Tile: FC<TileProps> = ({ className, tile, onClick }) => {
  return (
    <div
      onClick={onClick}
      className={clsx(
        "group relative flex aspect-square w-full items-center justify-center border border-black",
        className
      )}
    >
      {tile && (
        <Image
          src={tile.image}
          alt={`Image of ${tile.kind}-${tile.variant} tile`}
          fill={true}
          className="group-hover:brightness-75"
        />
      )}
    </div>
  );
};

export const EmptyTile: FC<TileProps> = ({ className, ...props }) => (
  <Tile
    className={clsx("bg-slate-500 hover:brightness-90", className)}
    {...props}
  />
);

export default Tile;
