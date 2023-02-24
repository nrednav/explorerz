import "TileMinter"

transaction {
    let admin: &TileMinter.Admin

    prepare(signer: AuthAccount) {
        self.admin = signer.borrow<&TileMinter.Admin>(from: TileMinter.AdminStoragePath)
            ?? panic("Could not borrow reference to the Admin resource")
    }

    pre {
        TileMinter.isMintingPeriodOpen == false: "The tile minting period is already open"
    }

    execute {
        self.admin.openMintingPeriod()
    }

    post {
        TileMinter.isMintingPeriodOpen == true: "The tile minting period could not be opened"
    }
}
