import React, { FC } from "react";
import Image from "next/image";
import clsx from "clsx";

export type Tile = {
  id: number;
  kind: "grass" | "water" | "sand" | "stone";
  image: {
    src: string;
    alt: string;
  };
};

type TileProps = {
  className?: string;
  tile?: Tile;
};

export const Tile: FC<TileProps> = ({ className, tile }) => {
  console.log(tile);
  return (
    <div
      className={clsx(
        "relative flex aspect-square w-full items-center justify-center hover:brightness-90",
        !tile && "border border-black",
        className
      )}
    >
      {tile && <Image src={tile.image.src} fill={true} alt={tile.image.alt} />}
    </div>
  );
};
