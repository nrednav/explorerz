import Head from "next/head";
import Error from "@/components/data-display/Error";
import InventoryPanel from "@/components/data-display/InventoryPanel";
import Loading from "@/components/data-display/Loading";
import { Map } from "@/components/data-display/Map";
import MintingPhases from "@/components/data-display/MintingPhases";
import PlaySummary from "@/components/data-display/PlaySummary";
import Button from "@/components/input-and-actions/Button";
import ClaimRewardButton from "@/components/input-and-actions/ClaimRewardButton";
import DPad from "@/components/input-and-actions/DPad";
import LoginButton from "@/components/input-and-actions/LoginButton";
import MintButton from "@/components/input-and-actions/MintButton";
import PlayButton from "@/components/input-and-actions/PlayButton";
import { initialiseAccount } from "@/flow/cadence/transactions/initialiseAccount";
import useHasInitialisedAccount from "@/hooks/useHasInitialisedAccount";
import useMap from "@/hooks/useMap";
import useModal from "@/hooks/useModal";
import useUser from "@/hooks/useUser";
import { selectedCoordinateAtom, selectedTileAtom } from "@/store";
import { useAtomValue } from "jotai";

export const Home = () => {
  const selectedTile = useAtomValue(selectedTileAtom);
  const selectedCoordinate = useAtomValue(selectedCoordinateAtom);
  const inventoryPanel = useModal();

  const {
    data: map,
    isLoading: isLoadingMap,
    isError: errorLoadingMap,
  } = useMap();

  const { user } = useUser();
  const { data: hasInitialisedAccount } = useHasInitialisedAccount({
    address: user.addr ?? "",
  });

  if (errorLoadingMap) return <Error message="Could not load game..." />;
  if (isLoadingMap) return <Loading />;
  if (!map) return <Error message="Could not load game..." />;

  return (
    <>
      <Head>
        <title>Explorerz</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Map tiles={map.tiles} />
      {map.completed && <GameOver />}
      {!map.completed && hasInitialisedAccount === false && (
        <div className="flex flex-row items-center justify-center py-8">
          <Button
            onClick={initialiseAccount}
            className="bg-emerald-500 text-white after:text-emerald-700 hover:text-white"
          >
            Initialise
          </Button>
        </div>
      )}
      {!user.loggedIn && (
        <div className="flex flex-row items-center justify-center py-8 opacity-90">
          <LoginButton />
        </div>
      )}
      {!map.completed &&
        user.loggedIn === true &&
        hasInitialisedAccount === true && (
          <>
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
                  map.tiles[selectedCoordinate.y][selectedCoordinate.x] !== null
                }
              />
            </div>
            <MintingPhases />
            <InventoryPanel
              isOpen={inventoryPanel.isOpen}
              onClose={inventoryPanel.close}
            />
          </>
        )}
    </>
  );
};

const GameOver = () => {
  return (
    <div className="flex flex-col items-center justify-center space-y-8 py-8">
      <h3 className="pixelated border bg-slate-100 p-4 text-2xl">Game Over!</h3>
      <p>The map has been completed, you can now claim your reward.</p>
      <ClaimRewardButton />
      <p>Thank you for participating!</p>
    </div>
  );
};

export default Home;
