import Head from "next/head";
import Error from "@/components/data-display/Error";
import InventoryPanel from "@/components/data-display/InventoryPanel";
import Loading from "@/components/data-display/Loading";
import { Map } from "@/components/data-display/Map";
import Button from "@/components/input-and-actions/Button";
import DPad from "@/components/input-and-actions/DPad";
import { mintTiles } from "@/flow/cadence/transactions/mintTiles";
import { placeTile } from "@/flow/cadence/transactions/placeTile";
import useMap from "@/hooks/useMap";
import useModal from "@/hooks/useModal";
import { selectedCoordinateAtom, selectedTileAtom } from "@/store";
import { useAtomValue } from "jotai";

export const Home = () => {
  const selectedTile = useAtomValue(selectedTileAtom);
  const selectedCoordinate = useAtomValue(selectedCoordinateAtom);

  const { data: mapDetails, isLoading, isError } = useMap();
  const inventoryPanel = useModal();

  if (isError) return <Error message="Could not load map..." />;
  if (isLoading) return <Loading />;
  if (!mapDetails) return <Error message="Could not load map..." />;

  const { tiles, tilesOccupied } = mapDetails;

  return (
    <>
      <Head>
        <title>Explorerz</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <p>Tiles Occupied: {tilesOccupied}</p>
      <p>Selected Tile: {selectedTile ? selectedTile.id : "None"}</p>
      <p>
        Selected Coordinate:{" "}
        {selectedCoordinate
          ? `${selectedCoordinate.x}, ${selectedCoordinate.y}`
          : "None"}
      </p>
      <Map tiles={tiles} />
      <DPad />
      <div className="my-4 flex w-full flex-col items-stretch justify-center gap-4 sm:flex-row">
        <Button
          onClick={mintTiles}
          className="bg-blue-400 text-white after:text-blue-600 hover:text-white"
        >
          Mint
        </Button>
        <Button
          onClick={inventoryPanel.open}
          className="bg-indigo-400 text-white after:text-indigo-600 hover:text-white"
        >
          Inventory
        </Button>
        <Button
          isDisabled={
            !selectedCoordinate ||
            !selectedTile ||
            tiles[selectedCoordinate.y][selectedCoordinate.x] !== null
          }
          onClick={() =>
            selectedTile && selectedCoordinate
              ? placeTile({
                  id: selectedTile.id,
                  coordinate: selectedCoordinate,
                })
              : null
          }
          className="bg-red-400 text-white after:text-red-600 hover:text-white"
        >
          Play
        </Button>
      </div>
      <InventoryPanel
        isOpen={inventoryPanel.isOpen}
        onClose={inventoryPanel.close}
      />
    </>
  );
};

export default Home;
