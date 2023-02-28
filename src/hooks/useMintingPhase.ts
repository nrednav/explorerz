import { getMintingPhase } from "@/flow/cadence/scripts/getMintingPhase";
import { useQuery } from "@tanstack/react-query";

const useMintingPhase = () => {
  return useQuery({
    queryKey: ["mintingPhase"],
    queryFn: getMintingPhase,
    refetchInterval: 60 * 1000, // Every minute
    refetchOnWindowFocus: false,
  });
};

export default useMintingPhase;
