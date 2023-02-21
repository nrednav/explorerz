import React, { FC } from "react";
import Image from "next/image";
import clsx from "clsx";
import type {Tile} from "@/shared/types";

type TileProps = {
  className?: string;
  tile?: Tile;
};

const Tile: FC<TileProps> = ({ className, tile }) => {
  return (
    <div
      className={clsx(
        "relative flex aspect-square w-full items-center justify-center hover:brightness-90",
        tile ? "border-none" : "border border-black",
        className
      )}
    >
      {tile && <Image src={tile.image.src} alt={tile.image.alt} fill={true} />}
    </div>
  );
};

export const EmptyTile = () => <Tile className="bg-slate-400" />

export default Tile;
