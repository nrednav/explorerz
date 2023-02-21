// A simple cartographer contract 
pub contract Cartographer {
    // Data
    pub var map: [[UInt64?]]
    pub var numberOfTilesPlaced: Int

    // Events
    pub event MapInitialized()

    // Initialization, runs on deployment
    init() {

        // Create empty map
        let map: [[UInt64?]] = []
        let rowOfEmptyTiles: [UInt64?] = []

        var col = 0
        while col < 16 {
            rowOfEmptyTiles.append(nil)
            col = col + 1
        }

        var row = 0 
        while row < 16 {
            map.append(rowOfEmptyTiles)
            row = row + 1
        }

        self.map = map
        self.numberOfTilesPlaced = 0

        emit MapInitialized()
    }

    // Functions
    view pub fun getMap(): [[UInt64?]] {
        return self.map
    }

    view pub fun getNumberOfTilesPlaced(): Int {
        return self.numberOfTilesPlaced
    }
}

