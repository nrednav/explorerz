import { getMap } from "@/flow/cadence/scripts/getMap";
import { useQuery } from "@tanstack/react-query";

const MAP_REFRESH_INTERVAL = 30; // in seconds

const useMap = () => {
  return useQuery({
    queryKey: ["map"],
    queryFn: getMap,
    refetchInterval: MAP_REFRESH_INTERVAL * 1000,
  });
};

export default useMap;
