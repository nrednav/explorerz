import { Explorerz, ExplorerzSchema } from "@/shared/types";
import * as fcl from "@onflow/fcl";

const code = `
import Cartographer from 0xCartographer

pub fun main(): {Address: Cartographer.Explorer} {
    return Cartographer.explorerz
}
`;

export const getExplorerz = async (): Promise<Explorerz | null> => {
  try {
    const explorerz = await fcl.query({ cadence: code });
    return ExplorerzSchema.parse(explorerz);
  } catch (error) {
    console.error(error);
    return null;
  }
};
