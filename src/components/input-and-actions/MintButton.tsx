import { FC, useCallback } from "react";
import Button, { ButtonProps } from "./Button";
import { mintTiles } from "@/flow/cadence/transactions/mintTiles";
import useMintingPhase from "@/hooks/useMintingPhase";

const MintButton: FC<Partial<ButtonProps>> = () => {
  const { refetch: refetchMintingPhase } = useMintingPhase();

  const mint = useCallback(() => {
    mintTiles({
      onSuccess: refetchMintingPhase,
    });
  }, [refetchMintingPhase]);

  return (
    <Button
      onClick={mint}
      className="bg-blue-400 text-white after:text-blue-600 hover:text-white"
    >
      Mint
    </Button>
  );
};

export default MintButton;
