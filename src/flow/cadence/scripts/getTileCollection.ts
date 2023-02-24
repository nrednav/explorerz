import { TileCollection, TileCollectionSchema } from "@/shared/types";
import * as fcl from "@onflow/fcl";

const code = `
import TileMinter from 0xTileMinter
import MetadataViews from 0xMetadataViews
import NonFungibleToken from 0xNonFungibleToken

pub struct Tile {
    pub let id: UInt64
    pub let kind: String
    pub let variant: UInt64 
    pub let image: String

    init(id: UInt64, kind: String, variant: UInt64, image: String) {
        self.id = id
        self.kind = kind
        self.variant = variant
        self.image = image
    }
}

pub fun main(address: Address): {String: [Tile]} {
    let account = getAccount(address)

    let tileCollectionRef = account
        .getCapability(TileMinter.CollectionPublicPath)!
        .borrow<&{NonFungibleToken.CollectionPublic}>()
        ?? panic("Could not borrow reference to tile collection")

    let tileIds = tileCollectionRef.getIDs()

    let tileCollection: {String: [Tile]} = {}

    for kind in TileMinter.tileRegistry.keys {
        tileCollection[kind] = []
    }

    for tileId in tileIds {
        if let tile = getTileById(address: address, id: tileId) {
            // If the kind is not registered, we wont display it in the inventory
            tileCollection[tile.kind]?.append(tile)
        }
    }

    return tileCollection
}

pub fun getTileById(address: Address, id: UInt64): Tile? {
    let account = getAccount(address)

    if let collection = account.getCapability<&TileMinter.Collection{NonFungibleToken.CollectionPublic, TileMinter.TileCollectionPublic}>(TileMinter.CollectionPublicPath).borrow() {
        if let tile = collection.borrowTile(id: id) {
            return Tile(
                id: id,
                kind: tile.kind,
                variant: tile.variant,
                image: tile.image
            )
        }
    }

    return nil
}
`;

type ScriptArgs = {
  address: string;
};

export const getTileCollection = async ({
  address,
}: ScriptArgs): Promise<TileCollection | null> => {
  if (!address) return null;

  try {
    const tileCollection = await fcl.query({
      cadence: code,
      args: (arg: any, t: any) => [arg(address, t.Address)],
    });
    return TileCollectionSchema.parse(tileCollection);
  } catch (error) {
    console.error(error);
    return null;
  }
};
