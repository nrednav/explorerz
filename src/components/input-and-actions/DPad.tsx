import { FC } from "react";
import { MapCoordinate } from "@/shared/types";
import TriangleIcon from "../icons/TriangleIcon";
import Button, { ButtonProps } from "./Button";
import { selectedCoordinateAtom } from "@/store";
import { clamp } from "@/utils/math";
import clsx from "clsx";
import { useAtom } from "jotai";

type DPadDirection = "left" | "right" | "up" | "down";

const DPad: FC = () => {
  const [selectedCoordinate, setSelectedCoordinate] = useAtom(
    selectedCoordinateAtom
  );

  const handleClick = (direction: DPadDirection) => () => {
    if (!selectedCoordinate) return setSelectedCoordinate({ x: 0, y: 0 });
    const nextCoordinate = move(selectedCoordinate, direction);
    setSelectedCoordinate(nextCoordinate);
  };

  return (
    <div className="my-8 flex flex-row items-center justify-evenly sm:hidden">
      <DPadButton direction="left" onClick={handleClick("left")} />
      <DPadButton direction="down" onClick={handleClick("down")} />
      <DPadButton direction="up" onClick={handleClick("up")} />
      <DPadButton direction="right" onClick={handleClick("right")} />
    </div>
  );
};

const DPadButton: FC<ButtonProps & { direction: DPadDirection }> = ({
  direction,
  onClick,
}) => {
  return (
    <Button
      onClick={onClick}
      className="flex items-center justify-center bg-slate-400 text-white after:text-slate-600 hover:text-white"
    >
      <TriangleIcon
        className={clsx(
          "h-6 w-6 -translate-x-[2px] -translate-y-[2px] text-slate-200",
          direction === "left" && "rotate-90",
          direction === "right" && "-rotate-90",
          direction === "up" && "rotate-180",
          direction === "down" && ""
        )}
      />
    </Button>
  );
};

const move = (
  { x, y }: MapCoordinate,
  direction: DPadDirection
): MapCoordinate => {
  switch (direction) {
    case "left":
      return { x: clamp(x - 1, 0, 15), y };
    case "right":
      return { x: clamp(x + 1, 0, 15), y };
    case "up":
      return { x, y: clamp(y - 1, 0, 15) };
    case "down":
      return { x, y: clamp(y + 1, 0, 15) };
  }
};

export default DPad;
