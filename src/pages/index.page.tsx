import { useState } from "react";
import Head from "next/head";
import Error from "@/components/data-display/Error";
import InventoryPanel from "@/components/data-display/InventoryPanel";
import Loading from "@/components/data-display/Loading";
import { Map } from "@/components/data-display/Map";
import Button from "@/components/input-and-actions/Button";
import { mintTiles } from "@/flow/cadence/transactions/mintTiles";
import useMap from "@/hooks/useMap";

export const Home = () => {
  const { data: tiles, isLoading, isError } = useMap();
  const [openInventory, setOpenInventory] = useState(false);

  const InventoryPanelOnClick = () => setOpenInventory(!openInventory);

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
      <div>
        <Button onClick={mintTiles} ctaText="Mint" />
        <Button onClick={InventoryPanelOnClick} ctaText="Inventory" />
      </div>
      <InventoryPanel onClick={InventoryPanelOnClick} open={openInventory} />
    </>
  );
};

export default Home;
