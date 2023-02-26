import "Cartographer"
import "NonFungibleToken"

pub struct Map {
    pub let tiles: [[Cartographer.TileDetails?]]
    pub let size: UInt64
    pub var tilesOccupied: UInt64
    pub var completed: Bool

    init(tiles: [[Cartographer.TileDetails?]], size: UInt64, tilesOccupied: UInt64, completed: Bool) {
        self.tiles = tiles
        self.size = size
        self.tilesOccupied = tilesOccupied
        self.completed = completed
    }
}

pub fun main(): Map {
    let transformed: [[Cartographer.TileDetails?]] = []

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

        transformed.append(rowOfTileDetails)
    }

    return Map(
        tiles: transformed,
        size: Cartographer.map.size,
        tilesOccupied: Cartographer.map.tilesOccupied,
        completed: Cartographer.map.completed,
    )
}
