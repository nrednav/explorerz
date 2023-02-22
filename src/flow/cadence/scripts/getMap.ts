import { TileGrid, TileGridSchema } from "@/shared/types";
import * as fcl from "@onflow/fcl";

const code = `
import Cartographer from 0xf3fcd2c1a78f5eee

pub fun main(): [[UInt64?]] {
    return Cartographer.getMap()
}
`;

export const getMap = async (): Promise<TileGrid | null> => {
  try {
    const queryOptions = {
      cadence: code,
    };

    const tiles = await fcl.query(queryOptions);

    return TileGridSchema.parse(tiles);
  } catch (error) {
    console.error(error);
    return null;
  }
};