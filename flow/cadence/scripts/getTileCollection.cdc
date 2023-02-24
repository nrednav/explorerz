import "TileMinter"
import "MetadataViews"
import "NonFungibleToken"

pub struct Tile {
    pub let id: UInt64
    pub let kind: String
    pub let variant: String
    pub let image: String

    init(id: UInt64, kind: String, variant: String, image: String) {
        self.id = id
        self.kind = kind
        self.variant = variant
        self.image = image
    }
}

pub fun main(address: Address): [Tile] {
    let account = getAccount(address)

    let tileCollectionRef = account
        .getCapability(TileMinter.CollectionPublicPath)!
        .borrow<&{NonFungibleToken.CollectionPublic}>()
        ?? panic("Could not borrow reference to tile collection")

    let tileIds = tileCollectionRef.getIDs()

    let tileCollection: [Tile] = []

    for tileId in tileIds {
        if let tile = getTileById(address: address, id: tileId) {
            tileCollection.append(tile)
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
 
