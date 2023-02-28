import { trackTransactionStatus } from "@/utils/transaction";
import * as fcl from "@onflow/fcl";
import { toast } from "react-hot-toast";

const code = `
import TileMinter from 0xTileMinter
import NonFungibleToken from 0xNonFungibleToken
import MetadataViews from 0xMetadataViews

transaction {
    let tileCollectionRef: &{NonFungibleToken.CollectionPublic}

    let totalSupplyBefore: UInt64

    prepare(signer: AuthAccount) {
        self.totalSupplyBefore = TileMinter.totalSupply

        let tileCollectionCapability = signer.getCapability<&{NonFungibleToken.CollectionPublic}>(TileMinter.CollectionPublicPath)
        if !tileCollectionCapability.check() {
            signer.save(<- TileMinter.createEmptyCollection(), to: TileMinter.CollectionStoragePath)
            signer.link<&TileMinter.Collection{NonFungibleToken.Receiver, NonFungibleToken.CollectionPublic, TileMinter.TileCollectionPublic, MetadataViews.ResolverCollection}>(
                TileMinter.CollectionPublicPath,
                target: TileMinter.CollectionStoragePath
            )
        }

        self.tileCollectionRef = signer
            .getCapability(TileMinter.CollectionPublicPath)
            .borrow<&{NonFungibleToken.CollectionPublic}>()
            ?? panic("Could not get receiver reference to the Tile NFT Collection")
    }

    execute {
        TileMinter.mint(recipient: self.tileCollectionRef)
    }

    post {
        [1,2,3,4].contains(Int(TileMinter.totalSupply - self.totalSupplyBefore)): "The total supply should have increased by a count between 1 and 4"
    }
}
 
`;

export const mintTiles = async ({ onSuccess }: { onSuccess: () => void }) => {
  try {
    toast.loading("Loading wallet...", { id: "loading-wallet" });

    const txId = await fcl.mutate({ cadence: code, limit: 1000 });

    toast.dismiss("loading-wallet");

    trackTransactionStatus({
      txId,
      loadingMessage: "Minting...",
      onError: () => "Could not mint tiles",
      onSuccess: (txState) => {
        onSuccess();
        const numberOfTilesMinted = txState.events.filter((event) =>
          event.type.includes("TileMinted")
        ).length;
        return `Minted ${numberOfTilesMinted} tile(s)`;
      },
    });
  } catch (error) {
    toast.dismiss("loading-wallet");
    console.error(error);
  }
};
