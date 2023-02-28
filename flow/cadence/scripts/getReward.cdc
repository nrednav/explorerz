import "Cartographer"

pub struct Reward {
    pub let id: UInt64
    pub let tier: Cartographer.RewardTier 
    pub let image: String

    init(id: UInt64, tier: Cartographer.RewardTier, image: String) {
        self.id = id
        self.tier = tier
        self.image = image
    }
}

pub fun main(address: Address, id: UInt64): Reward? {
    let rewardCollection = getAccount(address)
        .getCapability(Cartographer.RewardCollectionPublicPath)
        .borrow<&{Cartographer.RewardCollectionPublic}>()
        ?? panic("Could not get reference to the signer's Reward Collection")

    let reward = rewardCollection.borrowReward(id: id)

    if reward != nil {
        return Reward(id: reward!.id, tier: reward!.tier, image: reward!.image)
    }
    
    return nil
}
