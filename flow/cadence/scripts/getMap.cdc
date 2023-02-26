import "Cartographer"
import "NonFungibleToken"

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

pub fun main(): [[Tile?]]{

    let tiles: [[Tile?]] = []

    for row in Cartographer.map.tiles {
        let tileRow: [Tile?] = []
        for tile in row {
          let nft = tile != nil ? getTileById(id: tile!.id) : nil
          tileRow.append(nft)
        }
        tiles.append(tileRow)
    }

    return tiles
}
 
pub fun getTileById(id: UInt64): Tile? {

        let tile = Cartographer.getTile(id: id) 
        if tile != nil {
            return Tile(
                id: id,
                kind: tile!.kind,
                variant: tile!.variant,
                image: tile!.image
            )
        }

    return nil
}
 