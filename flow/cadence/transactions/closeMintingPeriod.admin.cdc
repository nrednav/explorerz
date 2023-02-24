import "TileMinter"

// TODO: remove this, this is for emulator only
transaction {
    let admin: &TileMinter.Admin

    prepare(signer: AuthAccount) {
        self.admin = signer.borrow<&TileMinter.Admin>(from: TileMinter.AdminStoragePath)
            ?? panic("Could not borrow reference to the Admin resource")
    }

    execute {
        self.admin.closeMintingPeriod()
    }

    post {
        TileMinter.isMintingPeriodOpen == false: "The tile minting period could not be closed"
    }
}
