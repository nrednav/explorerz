import { getTileCollection } from "@/flow/cadence/scripts/getTileCollection";
import { useQuery } from "@tanstack/react-query";

const useTileCollection = ({ address }: { address: string }) => {
  return useQuery({
    queryKey: ["tileCollection", address],
    queryFn: () => getTileCollection({ address }),
    refetchOnWindowFocus: false,
  });
};

export default useTileCollection;
