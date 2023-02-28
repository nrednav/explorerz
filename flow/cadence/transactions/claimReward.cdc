import "Cartographer"
import "NonFungibleToken"
import "TileMinter"
import "MetadataViews"

transaction {
    let signerAddress: Address
    let tileCollectionRef: &{NonFungibleToken.CollectionPublic}

    prepare(signer: AuthAccount) {
        self.signerAddress = signer.address

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
        Cartographer.claimReward(recipient: self.signerAddress, collection: self.tileCollectionRef)
    }

    post {
    }
}
