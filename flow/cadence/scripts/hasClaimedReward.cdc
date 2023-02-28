import "Cartographer"

pub fun main(address: Address): Bool {
    let explorer = Cartographer.explorerz[address]

    if (explorer != nil) {
        return explorer!.claimedReward
    }

    return false
}
