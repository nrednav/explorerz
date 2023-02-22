import NonFungibleToken from "NonFungibleToken"
import MetadataViews from "MetadataViews"

pub contract TileMinter: NonFungibleToken {
    // Data
    pub var totalSupply: UInt64
    pub let tileRegistry: { String: { String: String } }
    // pub let cooldownQueue: { String : Timestamp }

    pub let CollectionStoragePath: StoragePath
    pub let CollectionPublicPath: PublicPath
    pub let TileMinterStoragePath: StoragePath

    // Structs
    pub struct TileVariant {
        pub let name: String;
        pub let image: String;

        init(name: String, image: String) {
            self.name = name;
            self.image = image;
        }
    }

    // Events
    pub event ContractInitialized()
    pub event Withdraw(id: UInt64, from: Address?)
    pub event Deposit(id: UInt64, to: Address?)
    pub event TileMinted(tileId: UInt64, kind: String, variant: String, image: String, metadata: { String : String })
    pub event TileVariantRegistered(kind: String, variant: String)
    pub event TileVariantErased(kind: String, variant: String)

    // Initialization
    init() {
        self.totalSupply = 0
        self.tileRegistry = {
            "grass": {
                "standard": "https://explorerz.vercel.app/images/grass.png"
            },
            "water": {
                "standard": "https://explorerz.vercel.app/images/water.png"
            },
            "sand": {
                "standard": "https://explorerz.vercel.app/images/sand.jpg"
            },
            "stone": {
                "standard": "https://explorerz.vercel.app/images/stone.png"
            } 
        }

        self.CollectionStoragePath = /storage/TileCollection
        self.CollectionPublicPath = /public/TileCollection
        self.TileMinterStoragePath = /storage/TileMinter

        // Create a TileCollection resource and save it to storage
        let tileCollection <- create Collection()
        self.account.save(<-tileCollection, to: self.CollectionStoragePath)

        // Create a public capability for the TileCollection
        self.account.link<&TileMinter.Collection{NonFungibleToken.CollectionPublic, TileMinter.TileCollectionPublic, MetadataViews.ResolverCollection}>(
            self.CollectionPublicPath,
            target: self.CollectionStoragePath
        )

        emit ContractInitialized()
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
        }

        // Determine kind & variant of tile to mint, via RNG
        let kinds = self.tileRegistry.keys
        let chosenKind = kinds[Int(unsafeRandom()) % kinds.length]
        
        let variants = self.tileRegistry[chosenKind]!.keys
        let chosenVariant = variants[Int(unsafeRandom()) % variants.length]

        let image = self.tileRegistry[chosenKind]![chosenVariant]

        // Determine the quantity to mint
        let rngQuantity = Int(unsafeRandom()) % 4
        let quantityToMint = rngQuantity > 0 ? rngQuantity : 1

        // Batch mint the NFT's
        var i = 0
        while i < quantityToMint {
            var tile <- create TileMinter.NFT(
                kind: chosenKind,
                variant: chosenVariant,
                image: image!
            )
            let tileId = tile.id
            recipient.deposit(token: <- tile)

            let metadata: { String : String } = {}
            let currentBlock = getCurrentBlock()
            metadata["mintedBlock"] = currentBlock.height.toString()
            metadata["mintedTime"] = currentBlock.timestamp.toString()
            metadata["minter"] = recipient.owner!.address.toString()

            emit TileMinted(tileId: tileId, kind: chosenKind, variant: chosenVariant, image: image!, metadata: metadata)

            TileMinter.totalSupply = TileMinter.totalSupply + UInt64(1)

            i = i + 1
        }
    }

    access(account) fun registerTileVariant(kind: String, name: String, image: String) {
        self.tileRegistry[kind]?.insert(key: name, image)
        emit TileVariantRegistered(kind: kind, variant: name)
    }

    access(account) fun eraseTileVariant(kind: String, name: String) {
        self.tileRegistry[kind]?.remove(key: name)
        emit TileVariantErased(kind: kind, variant: name)
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
        pub let kind: String // Grass, Sand etc
        pub let image: String // Image Url
        pub let variant: String

        pub fun name(): String {
            return "Tile"
                .concat(" #")
                .concat(self.id.toString())
        }
        
        pub fun description(): String {
            return self.kind.concat("-").concat(self.variant).concat(" Tile")
        }

        pub fun thumbnail(): MetadataViews.HTTPFile {
            return MetadataViews.HTTPFile(url: self.image)
        }

        init(
            kind: String,
            variant: String,
            image: String,
        ) {
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
}
