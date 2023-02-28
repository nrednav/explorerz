import "TileMinter"

pub struct PhaseDetails {
    pub let phase: TileMinter.Phase
    pub let blockHeight: UInt64

    init(phase: TileMinter.Phase, blockHeight: UInt64) {
        self.phase = phase
        self.blockHeight = blockHeight
    }
}

pub fun main(): PhaseDetails {
    return PhaseDetails(
        phase: TileMinter.phase,
        blockHeight: getCurrentBlock().height
    )
}
