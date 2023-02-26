import { TileGrid, TileGridSchema } from "@/shared/types";
import * as fcl from "@onflow/fcl";

const code = `
import Cartographer from 0xCartographer

pub fun main(): Cartographer.Map {
    return Cartographer.map
}
`;

export const getMap = async (): Promise<TileGrid | null> => {
  try {
    const map = await fcl.query({ cadence: code });
    return TileGridSchema.parse(map.tiles);
  } catch (error) {
    console.error(error);
    return null;
  }
};
