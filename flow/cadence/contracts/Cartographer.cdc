import "TileMinter"
import "NonFungibleToken"
import "MetadataViews"

// A simple cartographer contract 
pub contract Cartographer {
    // Data
    pub var map: [[UInt64?]]
    pub var numberOfTilesPlaced: Int

    pub let CollectionStoragePath: StoragePath
    pub let CollectionPublicPath: PublicPath
    pub let StoragePath: StoragePath

    // Events
    pub event ContractInitialized()
    pub event CoolEvent()
    pub event Withdraw(id: UInt64, from: Address?)
    pub event Deposit(id: UInt64, to: Address?)
    pub event TilePlaced(id: UInt64, coordinates: [Int64; 2])

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

        self.CollectionStoragePath = /storage/Collection
        self.CollectionPublicPath = /public/Collection
        self.StoragePath = /storage/Cartographer

        // Create a Tile collection resource and save it to storage
        self.account.save(<- create Collection(), to: self.CollectionStoragePath)
        self.account.link<&Collection{NonFungibleToken.CollectionPublic, MetadataViews.ResolverCollection}>(
            self.CollectionPublicPath,
            target: self.CollectionStoragePath
        )

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
        if self.numberOfTilesPlaced == 0 {
            return true
        }

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

    pub fun placeTile(tileCollection: &TileMinter.Collection, id: UInt64, coordinates: [Int64; 2]) {
        pre {
            self.map[coordinates[0]][coordinates[1]] == nil: "Tile already placed at these coordinates"
            self.hasAdjacentTile(coordinates: coordinates) == true: "Tile not adjacent to another tile"
        }
        
        let tile <- tileCollection.withdraw(withdrawID: id)

        let tileId = tile.id
        
        let receiverRef = self.account.borrow<&Cartographer.Collection{NonFungibleToken.Receiver}>(from: Cartographer.CollectionStoragePath)
                    ?? panic("Could not borrow a reference to the receiver")

        // deposit your tile to Cartographer.Collection
        receiverRef.deposit(token: <- tile)

        self.map[coordinates[0]][coordinates[1]] = tileId
        self.numberOfTilesPlaced = self.numberOfTilesPlaced + 1
        emit TilePlaced(id: tileId, coordinates: coordinates)
        emit CoolEvent()
    }

    // Resource
    pub resource Collection: NonFungibleToken.Provider, NonFungibleToken.Receiver, NonFungibleToken.CollectionPublic, MetadataViews.ResolverCollection {
        pub var ownedNFTs: @{UInt64: NonFungibleToken.NFT}

        init () {
            self.ownedNFTs <- {}
        }

        pub fun withdraw(withdrawID: UInt64): @NonFungibleToken.NFT {
            let tile <- self.ownedNFTs.remove(key: withdrawID) ?? panic("missing Tile NFT")
            emit Withdraw(id: tile.id, from: self.owner?.address)
            return <-tile
        }

        pub fun deposit(token: @NonFungibleToken.NFT) {
            let tile <- token as! @NonFungibleToken.NFT
            let tileId: UInt64 = tile.id
            let oldTile <- self.ownedNFTs[tileId] <- tile

            emit Deposit(id: tileId, to: self.owner?.address)
            destroy oldTile 
        }

        pub fun getIDs(): [UInt64] {
            return self.ownedNFTs.keys
        }

        pub fun borrowNFT(id: UInt64): &NonFungibleToken.NFT {
            return (&self.ownedNFTs[id] as &NonFungibleToken.NFT?)!
        }

        pub fun borrowTile(id: UInt64): &NonFungibleToken.NFT? {
            if self.ownedNFTs[id] != nil {
                let authorizedTileRef = (&self.ownedNFTs[id] as auth &NonFungibleToken.NFT?)!
                return authorizedTileRef as! &NonFungibleToken.NFT
            } else {
                return nil
            }    
        }

        pub fun borrowViewResolver(id: UInt64): &AnyResource{MetadataViews.Resolver} {
            let authorizedTileRef = (&self.ownedNFTs[id] as auth &NonFungibleToken.NFT?)!
            let Tile = authorizedTileRef as! &TileMinter.NFT
            return Tile as &AnyResource{MetadataViews.Resolver}
        }

        destroy() {
            destroy self.ownedNFTs
        }
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
//     - if number of tiled placed is equal to 0, then we do not do adjacent check X
//     - if the coordinate free, no other tile place there X
//     - if it adjacent to an existing tile (below y-1, top y+1, right x+1, left x-1) / loop X
// - place tile (contract level) / commands
//     - withdraw the tile NFT, using the id from the user Tile collection 
//     - deposit the tile NFT in the Cartographer Tile's collection using the coordinates
//     - in the same method, we create a struct that hold the user info's that led the expedition as well as the id of the tileNFT
// - emit the tilePlacedEvent 
// - if number of tiled placed is equal to map size then we call the complete map function 

// - add in cartographer
//     - collection for Tiles X
