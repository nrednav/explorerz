import { Tile } from "@/components/data-display/Tile";
import * as fcl from "@onflow/fcl";

const code = `
import Cartographer from 0xf3fcd2c1a78f5eee

pub fun main(): [[UInt64?]] {
    return Cartographer.getMap()
}

`;

export const getMap = async (): Promise<(Tile | null)[][] | null> => {
  try {
    const queryOptions = {
      cadence: code,
    };

    const map = (await fcl.query(queryOptions)) as unknown as (Tile | null)[][];

    return map;
  } catch (error) {
    return null;
  }
};
