import "TileMinter"

// TODO: Remove this, this is for emulator only
transaction {
    let admin: &TileMinter.Admin
    let previousPhase: UInt64

    prepare(signer: AuthAccount) {
        self.admin = signer.borrow<&TileMinter.Admin>(from: TileMinter.AdminStoragePath)
            ?? panic("Could not borrow reference to the Admin resource")

        self.previousPhase = TileMinter.phase.current
    }

    execute {
        self.admin.transitionPhase()
    }

    post {
        TileMinter.phase.current == (self.previousPhase + UInt64(1)) % 4: "Could not transition phase"
    }
}
