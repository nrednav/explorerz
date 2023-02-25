import "NonFungibleToken"
import "MetadataViews"

// A simple cartographer contract 
pub contract Cartographer {
    // Data
    pub var map: [[UInt64?]]
    pub var numberOfTilesPlaced: Int

    pub let TileCollectionStoragePath: StoragePath
    pub let TileCollectionPublicPath: PublicPath
    pub let StoragePath: StoragePath

    // Events
    pub event ContractInitialized()
    pub event CoolEvent()

    // Initialization, runs on deployment
    init() {

        // Create empty map
        let map: [[UInt64?]] = []
        let rowOfEmptyTiles: [UInt64?] = []

        var col = 0
        while col < 16 {
            rowOfEmptyTiles.append(nil)
            col = col + 1
        }

        var row = 0 
        while row < 16 {
            map.append(rowOfEmptyTiles)
            row = row + 1
        }

        self.map = map
        self.numberOfTilesPlaced = 0

        self.TileCollectionStoragePath = /storage/TileCollection
        self.TileCollectionPublicPath = /public/TileCollection
        self.StoragePath = /storage/Cartographer

        // Create a Tile collection resource and save it to storage
        // self.account.save(<- create Collection(), to: self.TileCollectionStoragePath)
        // self.account.link<&TileMinter.Collection{NonFungibleToken.CollectionPublic, TileMinter.TileCollectionPublic, MetadataViews.ResolverCollection}>(
        //     self.TileCollectionPublicPath,
        //     target: self.TileCollectionStoragePath
        // )

        emit ContractInitialized()

    }

    // Functions
    view pub fun getMap(): [[UInt64?]] {
        return self.map
    }

    view pub fun getNumberOfTilesPlaced(): Int {
        return self.numberOfTilesPlaced
    }

    view pub fun hasAdjacentTile (coordinates: [Int64; 2]): Bool {
        let x = coordinates[0] 
        let y = coordinates[1]
        // Check if the tile is out of bounds
        if x < 0 || x > 15 || y < 0 || y > 15 {
            return false
        }
        
        // If no tiles have been placed, then the user can place a tile anywhere
        // if self.numberOfTilesPlaced == 0 {
        //     return true
        // }

        let adjacentTiles = [[x-1, y], [x, y-1], [x+1, y], [x, y+1]]

        for adjacentTile in adjacentTiles {
            let x = adjacentTile[0]
            let y = adjacentTile[1]

            // Check if the tile is out of bounds
            if x < 0 || x > 15 || y < 0 || y > 15 {
                continue
            }

            // Check if the adjacent tile is already placed
            if self.map[adjacentTile[0]][adjacentTile[1]] != nil {
                return true
            }   
        }
        return false
    }

    pub fun placeTile(id: UInt64, coordinates: [Int64; 2]) {
        pre {
            self.map[coordinates[0]][coordinates[1]] == nil: "Tile already placed at these coordinates"
            self.hasAdjacentTile(coordinates: coordinates) == true: "Tile not adjacent to another tile"
        }
        emit CoolEvent()
    }
}

 
// ## Data
// ### Input
// > All input data
// - Tile (explicit) (id)
// - Map (implicit, already there in smart contract)
// - Coordinates

// ### Dependencies
// > All dependent operations or services
// - Smart Contracts
//     - Cartographer
//     - TileMinter

// ### Outputs
// > These are the events & results

// - Success:
//     - TilePlaced (event)
//     - Tile is transferred & stored in `map`
    
// - Failure:
//     - TileOccupied (error)
//     - TileNotAdjacent (error)

// ## Behaviour
// ### Trigger
// > The triggering event or actor who triggers it
// - User

// ### Side-Effects
// > What happens after the operation

// ---

// ## Workflow

// - public function in Cartographer  X
// - input is the id of the NFT and the coordinates X
// - (pre) validation/ conditions
//     - if number of tiled placed is equal to 0, then we do not do adjacent check
//     - if the coordinate free, no other tile place there
//     - if it adjacent to an existing tile (below y-1, top y+1, right x+1, left x-1) / loop
// - place tile (contract level) / commands
//     - withdraw the tile NFT, using the id from the user Tile collection 
//     - deposit the tile NFT in the Cartographer Tile's collection using the coordinates
//     - in the same method, we create a struct that hold the user info's that led the expedition as well as the id of the tileNFT
// - emit the tilePlacedEvent 
// - if number of tiled placed is equal to map size then we call the complete map function 

// - add in cartographer
//     - collection for Tiles X
