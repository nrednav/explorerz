import React, { FC } from "react";
import Image from "next/image";
import type { TileSchema } from "@/shared/types";
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
        "relative flex aspect-square w-full items-center justify-center hover:brightness-90",
        className
      )}
    >
      {tile && <Image src={tile.image.src} alt={tile.image.alt} fill={true} />}
    </div>
  );
};

export const EmptyTile = () => (
  <Tile className="border border-black bg-slate-400" />
);

export default Tile;
