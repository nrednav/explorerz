import "TileMinter"

transaction(kind: String, variant: String, image: String) {
    let admin: &TileMinter.Admin

    prepare(signer: AuthAccount) {
        self.admin = signer.borrow<&TileMinter.Admin>(from: TileMinter.AdminStoragePath)
            ?? panic("Could not borrow reference to the Admin resource")
    }

    execute {
        self.admin.registerTileVariant(kind: kind, variant: variant, image: image)
    }

    post {
        TileMinter.tileRegistry[kind] == variant: "Could not register tile: ".concat(kind).concat("-").concat(variant).
    }
}
