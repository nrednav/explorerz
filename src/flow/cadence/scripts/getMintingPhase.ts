import { MintingPhase, MintingPhaseSchema } from "@/shared/types";
import * as fcl from "@onflow/fcl";

const code = `
import TileMinter from 0xTileMinter

pub fun main(): TileMinter.Phase {
    return TileMinter.phase
}
`;

export const getMintingPhase = async (): Promise<MintingPhase | null> => {
  try {
    const mintingPhase = await fcl.query({ cadence: code });
    return MintingPhaseSchema.parse(mintingPhase);
  } catch (error) {
    console.error(error);
    return null;
  }
};
