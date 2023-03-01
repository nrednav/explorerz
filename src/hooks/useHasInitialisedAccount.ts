import { hasInitialisedAccount } from "@/flow/cadence/scripts/hasInitialisedAccount";
import { useQuery } from "@tanstack/react-query";

const useHasInitialisedAccount = ({ address }: { address: string }) => {
  return useQuery({
    queryKey: ["hasInitialisedAccount", address],
    queryFn: () => hasInitialisedAccount({ address }),
    refetchOnWindowFocus: false,
  });
};

export default useHasInitialisedAccount;
