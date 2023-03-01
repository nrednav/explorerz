import { hasClaimedReward } from "@/flow/cadence/scripts/hasClaimedReward";
import { useQuery } from "@tanstack/react-query";

const useHasClaimedReward = ({ address }: { address: string }) => {
  return useQuery({
    queryKey: ["hasClaimedReward", address],
    queryFn: () => hasClaimedReward({ address }),
    refetchOnWindowFocus: false,
  });
};

export default useHasClaimedReward;
