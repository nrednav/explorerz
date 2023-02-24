import "TileMinter"

transaction(kind: String, variant: String) {
    let admin: &TileMinter.Admin

    prepare(signer: AuthAccount) {
        self.admin = signer.borrow<&TileMinter.Admin>(from: TileMinter.AdminStoragePath)
            ?? panic("Could not borrow reference to the Admin resource")
    }

    execute {
        self.admin.eraseTileVariant(kind: kind, variant: variant)
    }

    post {
        TileMinter.tileRegistry[kind]![variant] == nil: "Could not erase tile: ".concat(kind).concat("-").concat(variant).
    }
}
