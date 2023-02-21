import React, { FC } from "react";
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
};

export const Tile: FC<TileProps> = ({ className }) => {
  return (
    <div
      className={clsx(
        "flex aspect-square w-full items-center justify-center border border-black hover:brightness-90",
        className
      )}
    ></div>
  );
};
