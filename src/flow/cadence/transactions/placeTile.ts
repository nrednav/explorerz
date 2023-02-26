import { MapCoordinate } from "@/shared/types";
import * as fcl from "@onflow/fcl";

const code = `
import TileMinter from 0xTileMinter
import Cartographer from 0xCartographer

transaction(tileId: UInt64, coordinate: [Int64; 2]) {

    let owner: Address
    let tileCollection: &TileMinter.Collection

    prepare(signer: AuthAccount) {
        self.owner = signer.address

		self.tileCollection = signer.borrow<&TileMinter.Collection>(from: TileMinter.CollectionStoragePath) 
		?? panic("Could not borrow the users tile NFT Collection")
    }

    execute {
        let tile = Cartographer.MapTile(
            owner: self.owner,
            id: tileId,
            coordinate: Cartographer.MapCoordinate(x: coordinate[0], y: coordinate[1])
        )

        Cartographer.placeTile(tile: tile, source: self.tileCollection)
    }
}
`;

export const placeTile = async ({
  id,
  coordinate,
}: {
  id: number;
  coordinate: MapCoordinate;
}) => {
  try {
    return await fcl.mutate({
      cadence: code,
      args: (arg: any, t: any) => [
        arg(id, t.UInt64),
        arg([coordinate.x, coordinate.y], t.Array(t.Int64)),
      ],
    });
  } catch (error) {
    console.error(error);
  }
};
