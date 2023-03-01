import { getRewardCollection } from "@/flow/cadence/scripts/getRewardCollection";
import { useQuery } from "@tanstack/react-query";

const useRewardCollection = ({ address }: { address: string }) => {
  return useQuery({
    queryKey: ["reward", address],
    queryFn: () => getRewardCollection({ address }),
    refetchOnWindowFocus: false,
  });
};

export default useRewardCollection;
