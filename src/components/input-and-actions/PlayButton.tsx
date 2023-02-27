import { FC, useCallback } from "react";
import Button, { ButtonProps } from "./Button";
import { placeTile } from "@/flow/cadence/transactions/placeTile";
import { selectedCoordinateAtom, selectedTileAtom } from "@/store";
import { useAtomValue } from "jotai";

const PlayButton: FC<Partial<ButtonProps>> = ({ disabled = false }) => {
  const selectedTile = useAtomValue(selectedTileAtom);
  const selectedCoordinate = useAtomValue(selectedCoordinateAtom);

  const play = useCallback(
    () =>
      selectedTile && selectedCoordinate
        ? placeTile({ id: selectedTile.id, coordinate: selectedCoordinate })
        : null,
    [selectedTile, selectedCoordinate]
  );

  return (
    <Button
      onClick={play}
      className="bg-red-400 text-white after:text-red-600 hover:text-white"
      disabled={disabled}
    >
      Play
    </Button>
  );
};

export default PlayButton;
