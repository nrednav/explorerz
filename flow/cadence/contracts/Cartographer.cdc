import "TileMinter"
import "NonFungibleToken"
import "MetadataViews"

// A simple cartographer contract 
pub contract Cartographer {
    // Data
    pub let map: Map

    pub let TileCollectionStoragePath: StoragePath
    pub let TileCollectionPublicPath: PublicPath
    pub let StoragePath: StoragePath

    // Events
    pub event ContractInitialized()
    pub event TileWithdrawn(id: UInt64, from: Address?)
    pub event TileDeposited(id: UInt64, to: Address?)
    pub event TilePlaced(id: UInt64, coordinate: String)
    pub event MapCompleted()

    // Initialization, runs on deployment
    init() {
        self.map = Map()

        self.TileCollectionStoragePath = /storage/CartographerTileCollection
        self.TileCollectionPublicPath = /public/CartographerTileCollection
        self.StoragePath = /storage/Cartographer

        // Create a Tile collection resource and save it to storage
        self.account.save(<- create Collection(), to: self.TileCollectionStoragePath)
        self.account.link<&Collection{NonFungibleToken.CollectionPublic, MetadataViews.ResolverCollection}>(
            self.TileCollectionPublicPath,
            target: self.TileCollectionStoragePath
        )

        emit ContractInitialized()
    }

    // Structs
    pub struct Map {
        pub let tiles: [[MapTile?]]
        pub let size: UInt64
        pub var completed: Bool
        pub var tilesOccupied: UInt64

        init() {
            let tiles: [[MapTile?]] = []
            let rowOfEmptyTiles: [MapTile?] = []

            var col = 0
            while col < 16 {
                rowOfEmptyTiles.append(nil)
                col = col + 1
            }

            var row = 0 
            while row < 16 {
                tiles.append(rowOfEmptyTiles)
                row = row + 1
            }

            self.tiles = tiles
            self.size = UInt64(16 * 16)
            self.tilesOccupied = 0
            self.completed = false
        }

        pub fun placeTile(tile: MapTile) {
            pre {
                self.tiles[tile.coordinate.y][tile.coordinate.x] == nil: "Tile is already occupied"
                self.hasAdjacentTile(coordinate: tile.coordinate) == true: "Tile is not adjacent to any other occupied tile"
            }

            self.tiles[tile.coordinate.y][tile.coordinate.x] = tile
            self.tilesOccupied = self.tilesOccupied + 1
            emit TilePlaced(id: tile.id, coordinate: tile.coordinate.toString())
        }

        pub fun complete() {
            self.completed = true

            TileMinter.closeMintingPeriod()

            // TODO: Implement reward minting + distribution

            emit MapCompleted()
        }

        priv fun hasAdjacentTile(coordinate: MapCoordinate): Bool {
            // Check if the tile coordinate is out of bounds
            if coordinate.x < 0 || coordinate.x > 15 || coordinate.y < 0 || coordinate.y > 15 {
                return false
            }
            
            // If no tiles have been placed, then the user can place a tile anywhere
            if self.tilesOccupied == 0 {
                return true
            }

            let adjacentTiles: [MapCoordinate] = [
                MapCoordinate(x: coordinate.x - 1, y: coordinate.y), // Left
                MapCoordinate(x: coordinate.x, y: coordinate.y - 1), // Top
                MapCoordinate(x: coordinate.x + 1, y: coordinate.y), // Right
                MapCoordinate(x: coordinate.x, y: coordinate.y + 1) // Bottom
            ]

            for adjacentTile in adjacentTiles {
                // Check if the adjacent tile is out of bounds
                if adjacentTile.x < 0 || adjacentTile.x > 15 || adjacentTile.y < 0 || adjacentTile.y > 15 {
                    continue
                }

                // Check if the adjacent tile is already occupied
                if self.tiles[adjacentTile.y][adjacentTile.x] != nil {
                    return true
                }   
            }

            return false
        }
    }

    pub struct MapCoordinate {
        pub let x: Int64
        pub let y: Int64

        init(x: Int64, y: Int64) {
            self.x = x
            self.y = y
        }

        pub fun toString(): String {
            return self.x.toString().concat(", ").concat(self.y.toString())
        }
    }

    pub struct MapTile {
        pub let owner: Address 
        pub let id: UInt64
        pub let coordinate: MapCoordinate

        init(owner: Address, id: UInt64, coordinate: MapCoordinate) {
            self.owner = owner
            self.id = id
            self.coordinate = coordinate
        }
    }

    pub struct TileDetails {
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

    // Functions
    pub fun placeTile(tile: MapTile, source: &TileMinter.Collection) {
        // Withdraw
        let tileNft <- source.withdraw(withdrawID: tile.id)
        let tileNftId = tileNft.id

        // Place
        self.map.placeTile(tile: tile)
        
        // Deposit
        let tileCollection = self.account
            .borrow<&Cartographer.Collection{NonFungibleToken.Receiver}>(from: Cartographer.TileCollectionStoragePath) 
            ?? panic("Could not borrow a reference to the cartographer's tile collection")

        tileCollection.deposit(token: <- tileNft)

        if self.map.tilesOccupied == self.map.size {
            self.map.complete()
        }
    }

    pub fun getTileDetails(id: UInt64): TileDetails? {
        let tileCollection = self.account
            .borrow<&Cartographer.Collection{NonFungibleToken.CollectionPublic, TileCollectionPublic}>(from: Cartographer.TileCollectionStoragePath) 
            ?? panic("Could not borrow a reference to the cartographer's tile collection")

        if let tile = tileCollection.borrowTile(id: id) {
            return TileDetails(id: tile.id, kind: tile.kind, variant: tile.variant, image: tile.image)
        } 

        return nil
    }

   // Interfaces
    pub resource interface TileCollectionPublic {
        pub fun borrowTile(id: UInt64): &TileMinter.NFT? {
            post {
                (result == nil) || (result?.id == id): "Cannot borrow Tile NFT reference: The ID of the returned Tile NFT is incorrect"
            }
        }
    }

    // Resource
    pub resource Collection: TileCollectionPublic, NonFungibleToken.Provider, NonFungibleToken.Receiver, NonFungibleToken.CollectionPublic, MetadataViews.ResolverCollection {
        pub var ownedNFTs: @{UInt64: NonFungibleToken.NFT}

        init () {
            self.ownedNFTs <- {}
        }

        pub fun withdraw(withdrawID: UInt64): @NonFungibleToken.NFT {
            let nft <- self.ownedNFTs.remove(key: withdrawID) ?? panic("missing Tile NFT")
            emit TileWithdrawn(id: nft.id, from: self.owner?.address)
            return <-nft
        }

        pub fun deposit(token: @NonFungibleToken.NFT) {
            let nft <- token as! @NonFungibleToken.NFT
            let nftId: UInt64 = nft.id
            let oldNft <- self.ownedNFTs[nftId] <- nft 

            emit TileDeposited(id: nftId, to: self.owner?.address)
            destroy oldNft 
        }

        pub fun getIDs(): [UInt64] {
            return self.ownedNFTs.keys
        }

        pub fun borrowNFT(id: UInt64): &NonFungibleToken.NFT {
            return (&self.ownedNFTs[id] as &NonFungibleToken.NFT?)!
        }

        pub fun borrowTile(id: UInt64): &TileMinter.NFT? {
            if self.ownedNFTs[id] != nil {
                // Create an authorized reference to allow downcasting
                let tileRef = (&self.ownedNFTs[id] as auth &NonFungibleToken.NFT?)!
                return tileRef as! &TileMinter.NFT
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
