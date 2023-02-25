import { TileGrid, TileGridSchema } from "@/shared/types";
import * as fcl from "@onflow/fcl";

const code = `
import Cartographer from 0xCartographer

pub fun main(): [[UInt64?]] {
    return Cartographer.getMap()
}
`;

export const getMap = async (): Promise<TileGrid | null> => {
  try {
    const tiles = await fcl.query({ cadence: code });
    return TileGridSchema.parse(tiles);
  } catch (error) {
    console.error(error);
    return null;
  }
};
