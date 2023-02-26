import "Cartographer"
import "NonFungibleToken"

pub fun main(): [[Cartographer.TileDetails?]]{

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
