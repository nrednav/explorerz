import { getExplorerz } from "@/flow/cadence/scripts/getExplorerz";
import { useQuery } from "@tanstack/react-query";

const MAP_REFRESH_INTERVAL = 60; // in seconds

const useExplorerz = () => {
  return useQuery({
    queryKey: ["explorerz"],
    queryFn: getExplorerz,
    refetchInterval: MAP_REFRESH_INTERVAL * 1000,
    refetchOnWindowFocus: false,
  });
};

export default useExplorerz;
