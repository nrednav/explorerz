import { FC, useCallback } from "react";
import Button, { ButtonProps } from "./Button";
import { placeTile } from "@/flow/cadence/transactions/placeTile";
import useMap from "@/hooks/useMap";
import useMintingPhase from "@/hooks/useMintingPhase";
import { selectedCoordinateAtom, selectedTileAtom } from "@/store";
import { useAtom, useAtomValue } from "jotai";

const PlayButton: FC<Partial<ButtonProps>> = ({ disabled = false }) => {
  const [selectedTile, setSelectedTile] = useAtom(selectedTileAtom);
  const { refetch: refetchMap } = useMap();
  const { refetch: refetchMintingPhase } = useMintingPhase();
  const selectedCoordinate = useAtomValue(selectedCoordinateAtom);

  const play = useCallback(() => {
    if (!selectedTile || !selectedCoordinate) return null;
    placeTile({
      data: { id: selectedTile.id, coordinate: selectedCoordinate },
      onSuccess: () => {
        refetchMap();
        refetchMintingPhase();
      },
    });
    setSelectedTile(null);
  }, [
    selectedTile,
    selectedCoordinate,
    refetchMap,
    setSelectedTile,
    refetchMintingPhase,
  ]);

  return (
    <Button
      onClick={play}
      className="bg-red-400 text-white after:text-red-600 hover:text-white"
      disabled={disabled}
    >
      Place
    </Button>
  );
};

export default PlayButton;
