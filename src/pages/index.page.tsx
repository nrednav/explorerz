import Head from "next/head";
import Error from "@/components/data-display/Error";
import InventoryPanel from "@/components/data-display/InventoryPanel";
import Loading from "@/components/data-display/Loading";
import { Map } from "@/components/data-display/Map";
import Button from "@/components/input-and-actions/Button";
import { mintTiles } from "@/flow/cadence/transactions/mintTiles";
import useMap from "@/hooks/useMap";
import useModal from "@/hooks/useModal";

export const Home = () => {
  const { data: tiles, isLoading, isError } = useMap();
  const inventoryPanel = useModal();

  if (isError) return <Error message="Could not load map..." />;
  if (isLoading) return <Loading />;
  if (!tiles) return <Error message="Could not load map..." />;

  return (
    <>
      <Head>
        <title>Explorerz</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Map tiles={tiles} />
      <div className="flex w-full flex-col items-stretch justify-center gap-4 py-8 sm:flex-row">
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
          onClick={() => null}
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
