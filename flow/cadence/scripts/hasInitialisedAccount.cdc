import "Cartographer"
import "TileMinter"
import "NonFungibleToken"

pub fun main(address: Address): Bool {
    let account = getAccount(address)

    let tileCollectionCap = account
        .getCapability<&TileMinter.Collection{NonFungibleToken.CollectionPublic}>(TileMinter.CollectionPublicPath)

    let rewardCollectionCap = account
        .getCapability<&Cartographer.RewardCollection{Cartographer.RewardCollectionPublic}>(Cartographer.RewardCollectionPublicPath)

    return tileCollectionCap.check() && rewardCollectionCap.check()
}
