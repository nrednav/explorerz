import React, { FC } from "react";
import Image from "next/image";
import { TileSchema } from "@/shared/types";
import clsx from "clsx";
import { z } from "zod";

type TileProps = {
  className?: string;
  tile?: z.infer<typeof TileSchema>;
};

const Tile: FC<TileProps> = ({ className, tile }) => {
  return (
    <div
      className={clsx(
        "relative flex aspect-square w-full items-center justify-center border border-black hover:brightness-90",
        className
      )}
    >
      {tile && (
        <Image
          src={tile.image}
          alt={`Image of ${tile.kind}-${tile.variant} tile`}
          fill={true}
        />
      )}
    </div>
  );
};

export const EmptyTile: FC<TileProps> = () => <Tile className="bg-slate-500" />;

export default Tile;
