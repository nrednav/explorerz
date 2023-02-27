import NonFungibleToken from "NonFungibleToken"
import MetadataViews from "MetadataViews"

pub contract TileMinter: NonFungibleToken {
    // Data
    pub var totalSupply: UInt64
    pub let tileRegistry: {String: {UInt64: String}}
    pub let phase: Phase
    pub var isMintingPeriodOpen: Bool

    pub let CollectionStoragePath: StoragePath
    pub let CollectionPublicPath: PublicPath
    pub let AdminPrivatePath: PrivatePath
    pub let AdminStoragePath: StoragePath
    pub let StoragePath: StoragePath

    // Events
    pub event ContractInitialized()
    pub event Withdraw(id: UInt64, from: Address?)
    pub event Deposit(id: UInt64, to: Address?)
    pub event TileMinted(tileId: UInt64, kind: String, variant: UInt64, image: String, metadata: {String: String})
    pub event TileVariantRegistered(kind: String, variant: UInt64)
    pub event TileVariantErased(kind: String, variant: UInt64)
    pub event MintingPeriodOpened(block: String, timestamp: String)
    pub event MintingPeriodClosed(block: String, timestamp: String)
    pub event PhaseInitialized(lastUpdatedAt: UInt64)
    pub event PhaseTransitioned(phase: UInt64, lastUpdatedAt: UInt64)
    pub event PhaseReset(lastUpdatedAt: UInt64)

    // Initialization
    init() {
        self.totalSupply = 0
        self.tileRegistry = {
            "grass": {
                0: "https://explorerz.vercel.app/images/grass-0.png",
                1: "https://explorerz.vercel.app/images/grass-1.png"
            },
            "water": {
                0: "https://explorerz.vercel.app/images/water-0.png",
                1: "https://explorerz.vercel.app/images/water-1.png"
            },
            "sand": {
                0: "https://explorerz.vercel.app/images/sand-0.png",
                1: "https://explorerz.vercel.app/images/sand-1.png"
            },
            "stone": {
                0: "https://explorerz.vercel.app/images/stone-0.png",
                1: "https://explorerz.vercel.app/images/stone-1.png"
            } 
        }
        self.phase = Phase()
        self.isMintingPeriodOpen = true 

        self.CollectionStoragePath = /storage/TileMinterTileCollection
        self.CollectionPublicPath = /public/TileMinterTileCollection
        self.AdminPrivatePath = /private/Admin
        self.AdminStoragePath = /storage/Admin
        self.StoragePath = /storage/TileMinter

        // Create a Tile collection resource and save it to storage
        self.account.save(<- create Collection(), to: self.CollectionStoragePath)
        self.account.link<&TileMinter.Collection{NonFungibleToken.CollectionPublic, TileMinter.TileCollectionPublic, MetadataViews.ResolverCollection}>(
            self.CollectionPublicPath,
            target: self.CollectionStoragePath
        )

        // Create an Admin resource and save it to storage
        self.account.save(<- create Admin(), to: self.AdminStoragePath)
        self.account.link<&TileMinter.Admin>(
            self.AdminPrivatePath,
            target: self.AdminStoragePath
        ) ?? panic("Could not retrieve a capability for the Admin resource")

        emit ContractInitialized()
    }

    // Structs
    pub struct Phase {
        pub var current: UInt64
        pub var lastUpdatedAt: UInt64
        pub let duration: UInt64 // time expressed in block height, 1 block = 2 seconds

        init() {
            // TODO: Change back to 120 for testnet
            self.duration = 10 // 120 blocks ~= 240 seconds = 4 minutes
            self.current = 0
            self.lastUpdatedAt = getCurrentBlock().height
            emit PhaseInitialized(lastUpdatedAt: self.lastUpdatedAt)
        }

        pub fun transition() {
            self.current = (self.current + 1) % 4
            self.lastUpdatedAt = getCurrentBlock().height
            emit PhaseTransitioned(phase: UInt64(self.current + 1), lastUpdatedAt: self.lastUpdatedAt)
        }

        pub fun reset() {
            self.current = 0
            self.lastUpdatedAt = getCurrentBlock().height
            emit PhaseReset(lastUpdatedAt: self.lastUpdatedAt)
        }
    }

    // Functions
    pub fun createEmptyCollection(): @NonFungibleToken.Collection {
        return <- create Collection()
    }

    pub fun getTile(_ from: Address, id: UInt64): &TileMinter.NFT? {
        let tileCollection = getAccount(from)
            .getCapability(TileMinter.CollectionPublicPath)!
            .borrow<&TileMinter.Collection{TileMinter.TileCollectionPublic}>()
            ?? panic("Couldn't get tile collection")

        return tileCollection.borrowTile(id: id)
    }

    pub fun mint(recipient: &{NonFungibleToken.CollectionPublic}) {
        pre {
            self.tileRegistry.keys.length > 0: "There are no tiles registered"
            self.isMintingPeriodOpen == true: "The tile minting period is currently closed"
        }

        let currentBlock = getCurrentBlock()
        let currentPhase = Int(self.phase.current + 1)

        // If the current phase has lasted longer than 4 minutes, transition to the next phase
        // 4 minutes ~= 120 blocks
        if currentBlock.height >= self.phase.lastUpdatedAt + self.phase.duration {
            self.phase.transition()
        }

        // Record additional data for TileMinted event
        let metadata: {String: String} = {}
        metadata["blockHeight"] = currentBlock.height.toString()
        metadata["timestamp"] = currentBlock.timestamp.toString()
        metadata["minter"] = recipient.owner!.address.toString()
        metadata["phase"] = currentPhase.toString()


        // Batch mint the tiles, where quantity minted = current phase
        var i = 0
        while i < currentPhase {
            // Determine kind & variant of tiles to mint, via RNG
            let kinds = self.tileRegistry.keys
            let chosenKind = kinds[Int(unsafeRandom()) % kinds.length]
            
            let variants = self.tileRegistry[chosenKind]!.keys
            let chosenVariant = variants[Int(unsafeRandom()) % variants.length]

            let image = self.tileRegistry[chosenKind]![chosenVariant]
        
            // Mint the tile
            var tile <- create TileMinter.NFT(
                kind: chosenKind,
                variant: chosenVariant,
                image: image!
            )

            let tileId = tile.id

            recipient.deposit(token: <- tile)

            emit TileMinted(tileId: tileId, kind: chosenKind, variant: chosenVariant, image: image!, metadata: metadata)

            TileMinter.totalSupply = TileMinter.totalSupply + UInt64(1)

            i = i + 1
        }

        self.phase.reset()
    }

    access(account) fun closeMintingPeriod() {
        pre {
            TileMinter.isMintingPeriodOpen == true: "The tile minting period is already closed"
        }

        TileMinter.isMintingPeriodOpen = false

        let currentBlock = getCurrentBlock()
        emit MintingPeriodClosed(block: currentBlock.height.toString(), timestamp: currentBlock.timestamp.toString())
    }


    // Interfaces
    pub resource interface TileCollectionPublic {
        pub fun deposit(token: @NonFungibleToken.NFT)
        pub fun getIDs(): [UInt64]
        pub fun borrowNFT(id: UInt64): &NonFungibleToken.NFT
        pub fun borrowTile(id: UInt64): &TileMinter.NFT? {
            post {
                (result == nil) || (result?.id == id): "Cannot borrow Tile NFT reference: The ID of the returned Tile NFT is incorrect"
            }
        }
    }

    // Resources
    pub resource NFT: NonFungibleToken.INFT, MetadataViews.Resolver {
        pub let id: UInt64
        pub let kind: String
        pub let variant: UInt64 
        pub let image: String

        pub fun name(): String {
            return "Tile".concat(" #").concat(self.id.toString())
        }
        
        pub fun description(): String {
            return self.kind.concat("-").concat(self.variant.toString()).concat(" Tile")
        }

        pub fun thumbnail(): MetadataViews.HTTPFile {
            return MetadataViews.HTTPFile(url: self.image)
        }

        init(kind: String, variant: UInt64, image: String) {
            self.id = self.uuid
            self.kind = kind
            self.variant = variant
            self.image = image
        }

        pub fun getViews(): [Type] {
            return [ Type<MetadataViews.Display>() ]
        }

        pub fun resolveView(_ view: Type): AnyStruct? {
            switch view {
                case Type<MetadataViews.Display>():
                    return MetadataViews.Display(
                        name: self.name(),
                        description: self.description(),
                        thumbnail: self.thumbnail()
                    )
            }

            return nil
        }
    }

    pub resource Collection: TileCollectionPublic, NonFungibleToken.Provider, NonFungibleToken.Receiver, NonFungibleToken.CollectionPublic, MetadataViews.ResolverCollection {
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
            let tile <- token as! @TileMinter.NFT
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

        pub fun borrowTile(id: UInt64): &TileMinter.NFT? {
            if self.ownedNFTs[id] != nil {
                let authorizedTileRef = (&self.ownedNFTs[id] as auth &NonFungibleToken.NFT?)!
                return authorizedTileRef as! &TileMinter.NFT
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

    pub resource Admin {
       pub fun registerTileVariant(kind: String, variant: UInt64, image: String) {
            pre {
                TileMinter.tileRegistry[kind] != nil: "Tile with kind = ".concat(kind).concat(", does not exist")
            }

            TileMinter.tileRegistry[kind]?.insert(key: variant, image)
            emit TileVariantRegistered(kind: kind, variant: variant)
        }

        pub fun eraseTileVariant(kind: String, variant: UInt64) {
            pre {
                TileMinter.tileRegistry[kind] != nil: "Tile with kind = ".concat(kind).concat(", does not exist")
                TileMinter.tileRegistry[kind]![variant] != nil: "Tile variant = ".concat(variant.toString()).concat(", does not exist for kind = ").concat(kind)
            }

            TileMinter.tileRegistry[kind]?.remove(key: variant)
            emit TileVariantErased(kind: kind, variant: variant)
        }

        // TODO: Remove once we move to testnet
        pub fun openMintingPeriod() {
            pre {
                TileMinter.isMintingPeriodOpen == false: "The tile minting period is already open"
            }

            TileMinter.isMintingPeriodOpen = true 

            let currentBlock = getCurrentBlock()
            emit MintingPeriodOpened(block: currentBlock.height.toString(), timestamp: currentBlock.timestamp.toString())
        }

        // TODO: Remove once we move to testnet
        pub fun transitionPhase() {
            TileMinter.phase.transition()
        }
    }
}
 
