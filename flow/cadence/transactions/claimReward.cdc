import "Cartographer"

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
