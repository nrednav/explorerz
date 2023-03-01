import "Cartographer"
import "TileMinter"
import "NonFungibleToken"
import "MetadataViews"

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
