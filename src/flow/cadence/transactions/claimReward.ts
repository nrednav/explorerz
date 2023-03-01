import { trackTransactionStatus } from "@/utils/transaction";
import * as fcl from "@onflow/fcl";
import { toast } from "react-hot-toast";

const code = `
import Cartographer from 0xCartographer

transaction {
    let signerAddress: Address
    let rewardCollectionRef: &{Cartographer.RewardCollectionPublic}

    prepare(signer: AuthAccount) {
        self.signerAddress = signer.address

        let rewardCollectionCapability = signer.getCapability<&{Cartographer.RewardCollectionPublic}>(Cartographer.RewardCollectionPublicPath)
        if !rewardCollectionCapability.check() {
            signer.save(<- Cartographer.createEmptyRewardCollection(), to: Cartographer.RewardCollectionStoragePath)
            signer.link<&Cartographer.RewardCollection{Cartographer.RewardCollectionPublic}>(
                Cartographer.RewardCollectionPublicPath,
                target: Cartographer.RewardCollectionStoragePath
            )
        }

        self.rewardCollectionRef = signer
            .getCapability(Cartographer.RewardCollectionPublicPath)
            .borrow<&{Cartographer.RewardCollectionPublic}>()
            ?? panic("Could not get reference to the signer's Reward Collection")
    }

    execute {
        Cartographer.claimReward(recipient: self.signerAddress, collection: self.rewardCollectionRef)
    }
}
`;

export const claimReward = async ({ onSuccess }: { onSuccess: () => void }) => {
  try {
    toast.loading("Loading wallet...", { id: "loading-wallet" });

    const txId = await fcl.mutate({ cadence: code, limit: 1000 });

    toast.dismiss("loading-wallet");

    trackTransactionStatus({
      txId,
      loadingMessage: "Claiming reward...",
      onError: (errorMessage) => {
        const error = errorMessage.toLowerCase();
        if (error.includes("complete")) return "The map is not yet complete";
        if (error.includes("found"))
          return "You need to have participated in the game to claim a reward";
        if (error.includes("claimed")) return "Reward has already been claimed";
        return "Could not claim reward";
      },
      onSuccess: () => {
        onSuccess();
        return "Reward claimed";
      },
    });
  } catch (error) {
    toast.dismiss("loading-wallet");
    console.error(error);
  }
};
