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

pub fun main(address: Address): [Reward?] {
    let rewardCollection = getAccount(address)
        .getCapability(Cartographer.RewardCollectionPublicPath)
        .borrow<&{Cartographer.RewardCollectionPublic}>()
        ?? panic("Could not get reference to the signer's Reward Collection")

    let rewardIds = rewardCollection.getIDs()

    let rewards: [Reward?] = []

    for rewardId in rewardIds {
        if let reward = getRewardById(address: address, id: rewardId) {
            rewards.append(reward)
        }
    }

    return rewards 
}

pub fun getRewardById(address: Address, id: UInt64): Reward? {
    let account = getAccount(address)

    if let collection = account.getCapability<&Cartographer.RewardCollection{Cartographer.RewardCollectionPublic}>(Cartographer.RewardCollectionPublicPath).borrow() {
        if let reward = collection.borrowReward(id: id) {
            return Reward(
                id: id,
                tier: reward.tier,
                image: reward.image
            )
        }
    }

    return nil
}
