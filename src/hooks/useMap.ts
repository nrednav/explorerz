import { useEffect, useState } from "react";
import { Tile } from "@/components/data-display/Tile";
import { getMap } from "@/flow/cadence/scripts/getMap";

const useMap = () => {
  const [tiles, setTiles] = useState<(Tile | null)[][] | null>();

  const getTiles = () => getMap().then(setTiles).catch(console.error);

  useEffect(() => {
    getTiles();
    const getMapInterval = setInterval(getTiles, 10000);
    return () => clearInterval(getMapInterval);
  }, []);

  return {
    tiles,
  };
};

export default useMap;
