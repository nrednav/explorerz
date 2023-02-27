import { getMintingPhase } from "@/flow/cadence/scripts/getMintingPhase";
import { useQuery } from "@tanstack/react-query";

const useMintingPhase = () => {
  return useQuery({
    queryKey: ["mintingPhase"],
    queryFn: getMintingPhase,
    refetchInterval: 60 * 0.5 * 1000,
    refetchOnWindowFocus: false,
  });
};

export default useMintingPhase;
