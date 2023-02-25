import "TileMinter"
import "Cartographer"

transaction(tileId: UInt64, coordinate: [Int64; 2]) {

    let owner: Address
    let tileCollection: &TileMinter.Collection

    prepare(signer: AuthAccount) {
        self.owner = signer.address

		self.tileCollection = signer.borrow<&TileMinter.Collection>(from: TileMinter.CollectionStoragePath) 
		?? panic("Could not borrow the users tile NFT Collection")
    }

    execute {
        let tile = Cartographer.MapTile(
            owner: self.owner,
            id: tileId,
            coordinate: Cartographer.MapCoordinate(x: coordinate[0], y: coordinate[1])
        )

        Cartographer.placeTile(tile: tile, source: self.tileCollection)
    }
}
