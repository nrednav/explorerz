import Head from "next/head";
import { CountDown } from "@/components/data-display/CountDown";
import Error from "@/components/data-display/Error";
import InventoryPanel from "@/components/data-display/InventoryPanel";
import Loading from "@/components/data-display/Loading";
import { Map } from "@/components/data-display/Map";
import MintingPhases from "@/components/data-display/MintingPhases";
import PlaySummary from "@/components/data-display/PlaySummary";
import Button from "@/components/input-and-actions/Button";
import DPad from "@/components/input-and-actions/DPad";
import MintButton from "@/components/input-and-actions/MintButton";
import PlayButton from "@/components/input-and-actions/PlayButton";
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

  const { tiles } = mapDetails;

  return (
    <>
      <Head>
        <title>Explorerz</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <CountDown subTitle="The lower the timer, the more land you receive. When the map is full, the game ends." />
      <Map tiles={tiles} />
      <PlaySummary />
      <DPad />
      <div className="my-4 flex w-full flex-col items-stretch justify-center gap-4 sm:flex-row">
        <MintButton />
        <Button
          onClick={inventoryPanel.open}
          className="bg-indigo-400 text-white after:text-indigo-600 hover:text-white"
        >
          Inventory
        </Button>
        <PlayButton
          disabled={
            !selectedCoordinate ||
            !selectedTile ||
            tiles[selectedCoordinate.y][selectedCoordinate.x] !== null
          }
        />
      </div>
      <MintingPhases />
      <InventoryPanel
        isOpen={inventoryPanel.isOpen}
        onClose={inventoryPanel.close}
      />
    </>
  );
};

export default Home;
