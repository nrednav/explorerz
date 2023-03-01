import { FC, useCallback } from "react";
import Button, { ButtonProps } from "./Button";
import { claimReward } from "@/flow/cadence/transactions/claimReward";
import useHasClaimedReward from "@/hooks/useHasClaimedReward";
import useUser from "@/hooks/useUser";

const ClaimRewardButton: FC<Partial<ButtonProps>> = () => {
  const { user } = useUser();
  const { data: hasClaimedReward, refetch: refetchHasClaimedReward } =
    useHasClaimedReward({ address: user.addr ?? "" });

  const claim = useCallback(() => {
    claimReward({ onSuccess: refetchHasClaimedReward });
  }, [refetchHasClaimedReward]);

  return (
    <Button
      disabled={hasClaimedReward === true}
      onClick={claim}
      className="bg-yellow-400 text-black opacity-80 after:text-yellow-600 hover:text-black"
    >
      {hasClaimedReward === true ? "Reward Claimed" : "Claim Reward"}
    </Button>
  );
};

export default ClaimRewardButton;
