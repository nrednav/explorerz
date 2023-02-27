import { PhaseDetails, PhaseDetailsSchema } from "@/shared/types";
import * as fcl from "@onflow/fcl";

const code = `
import TileMinter from 0xTileMinter

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
`;

export const getMintingPhase = async (): Promise<PhaseDetails | null> => {
  try {
    const phaseDetails = await fcl.query({ cadence: code });
    return PhaseDetailsSchema.parse(phaseDetails);
  } catch (error) {
    console.error(error);
    return null;
  }
};
