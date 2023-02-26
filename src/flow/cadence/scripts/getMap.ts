import { TileGrid, TileGridSchema } from "@/shared/types";
import * as fcl from "@onflow/fcl";

const code = `
import Cartographer from 0xCartographer
import NonFungibleToken from 0xNonFungibleToken

pub fun main(): [[Cartographer.TileDetails?]] {

    let map: [[Cartographer.TileDetails?]] = []

    for row in Cartographer.map.tiles {
        let rowOfTileDetails: [Cartographer.TileDetails?] = []

        for tile in row {
            if tile == nil {
                rowOfTileDetails.append(nil)
                continue
            }

            let tileDetails = Cartographer.getTileDetails(id: tile!.id)
            rowOfTileDetails.append(tileDetails)
        }

        map.append(rowOfTileDetails)
    }

    return map
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
