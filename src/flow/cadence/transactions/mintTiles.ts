import * as fcl from "@onflow/fcl";

const code = `
import TileMinter from 0xf3fcd2c1a78f5eee
import NonFungibleToken from 0xf3fcd2c1a78f5eee
import MetadataViews from 0xf3fcd2c1a78f5eee

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

export const mintTiles = async () => {
  try {
    return await fcl.mutate({ cadence: code, limit: 1000 });
  } catch (error) {
    console.error(error);
  }
};
