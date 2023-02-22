import "NonFungibleToken"
import "TileMinter"
import "MetadataViews"
import "FungibleToken"

transaction(
    kind: String,
    image: String,
    variant: String
) {
    let tileCollectionRef: &{NonFungibleToken.CollectionPublic}

    let totalSupplyBefore: UInt64

    prepare(signer: AuthAccount) {
        self.totalSupplyBefore = TileMinter.totalSupply

        let tileCollectionCap = signer.getCapability<&{NonFungibleToken.CollectionPublic}>(TileMinter.CollectionPublicPath)
        if !tileCollectionCap.check() {
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

    pre {}

    execute {
        TileMinter.mint(recipient: self.tileCollectionRef)
    }

    post {
        [1,2,3,4].contains(Int(TileMinter.totalSupply - self.totalSupplyBefore)): "The total supply should have increased by 1 to 4"
    }
}
