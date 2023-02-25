import "TileMinter"
import "Cartographer"

transaction(tileId: UInt64, coordinates: [Int64; 2]) {

    let tileCollection: &TileMinter.Collection

    prepare(account: AuthAccount) {
        // Borrow access to the user's tile NFT collection
		self.tileCollection = account.borrow<&TileMinter.Collection>(from: TileMinter.CollectionStoragePath) 
		?? panic("Could not borrow the users tile NFT Collection.")

    }

    execute {
        // pass the reference to the tile collection to the Cartographer contract
        Cartographer.placeTile(tileCollection: self.tileCollection, id: tileId, coordinates: coordinates)
    }

}
