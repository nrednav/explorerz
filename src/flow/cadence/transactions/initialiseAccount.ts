import { trackTransactionStatus } from "@/utils/transaction";
import * as fcl from "@onflow/fcl";
import { toast } from "react-hot-toast";

const code = `
import Cartographer from 0xCartographer
import TileMinter from 0xTileMinter
import NonFungibleToken from 0xNonFungibleToken
import MetadataViews from 0xMetadataViews 

transaction {
    prepare(signer: AuthAccount) {
        let tileCollectionCap = signer 
            .getCapability<&TileMinter.Collection{NonFungibleToken.CollectionPublic}>(TileMinter.CollectionPublicPath)
        if !tileCollectionCap.check() {
            signer.save(<- TileMinter.createEmptyCollection(), to: TileMinter.CollectionStoragePath)
            signer.link<&TileMinter.Collection{NonFungibleToken.Receiver, NonFungibleToken.CollectionPublic, TileMinter.TileCollectionPublic, MetadataViews.ResolverCollection}>(
                TileMinter.CollectionPublicPath,
                target: TileMinter.CollectionStoragePath
            )
        }

        let rewardCollectionCap = signer 
            .getCapability<&Cartographer.RewardCollection{Cartographer.RewardCollectionPublic}>(Cartographer.RewardCollectionPublicPath)
        if !rewardCollectionCap.check() {
            signer.save(<- Cartographer.createEmptyRewardCollection(), to: Cartographer.RewardCollectionStoragePath)
            signer.link<&Cartographer.RewardCollection{Cartographer.RewardCollectionPublic}>(
                Cartographer.RewardCollectionPublicPath,
                target: Cartographer.RewardCollectionStoragePath
            )
        }
    }
}
`;

export const initialiseAccount = async () => {
  try {
    toast.loading("Loading wallet...", { id: "loading-wallet" });

    const txId = await fcl.mutate({ cadence: code, limit: 1000 });

    toast.dismiss("loading-wallet");

    trackTransactionStatus({
      txId,
      loadingMessage: "Initialising...",
      onError: () => "Could not initialise account",
      onSuccess: () => "Initialised account",
    });
  } catch (error) {
    toast.dismiss("loading-wallet");
    console.error(error);
  }
};
