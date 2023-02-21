import { useEffect, useState } from "react";
import { TileGrid } from "@/shared/types";
import { getMap } from "@/flow/cadence/scripts/getMap";

const MAP_REFRESH_INTERVAL = 10; // in seconds

const useMap = () => {
  const [tiles, setTiles] = useState<TileGrid | null>();

  const getTiles = () => getMap().then(setTiles).catch(console.error);

  useEffect(() => {
    getTiles();
    const getMapInterval = setInterval(getTiles, MAP_REFRESH_INTERVAL * 1000);
    return () => clearInterval(getMapInterval);
  }, []);

  return { tiles };
};

export default useMap;
