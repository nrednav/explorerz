import Tile from "./Tile";
import useModal from "@/hooks/useModal";
import { selectedCoordinateAtom, selectedTileAtom } from "@/store";
import clsx from "clsx";
import { useAtomValue } from "jotai";

const PlaySummary = () => {
  const selectedTile = useAtomValue(selectedTileAtom);
  const selectedCoordinate = useAtomValue(selectedCoordinateAtom);
  const inventoryPanel = useModal();

  return (
    <div className="mx-auto flex min-h-[64px] max-w-[320px] flex-col items-stretch justify-center sm:max-w-[initial] sm:flex-row sm:space-x-8">
      <div className="grid grid-cols-[2fr_1fr] items-center justify-items-end space-x-4 pt-4 text-xs sm:flex sm:flex-row sm:py-4 sm:text-sm">
        <p className="justify-self-start">Tile selected:</p>
        {selectedTile ? (
          <Tile
            tile={selectedTile}
            className="h-8 w-8 cursor-pointer sm:h-12 sm:w-12"
            onClick={inventoryPanel.open}
          />
        ) : (
          <p className="text-red-600">None</p>
        )}
      </div>
      <div className="grid grid-cols-[2fr_1fr] items-center justify-items-end space-x-4 pt-4 text-xs sm:flex sm:flex-row sm:py-4 sm:text-sm">
        <p className="justify-self-start">Place at:</p>
        <p
          className={clsx(
            "w-auto sm:w-24",
            selectedCoordinate ? "text-emerald-600" : "text-red-600"
          )}
        >
          {selectedCoordinate
            ? `${selectedCoordinate.x},${selectedCoordinate.y}`
            : "None"}
        </p>
      </div>
    </div>
  );
};

export default PlaySummary;
