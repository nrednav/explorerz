// A simple cartographer contract 
pub contract Cartographer {
    // declaration of a public variable
    pub var map: [[UInt64?]]
    pub var numberOfTilesPlaced: Int


    // initialization method for our contracts, this gets run on deployment
    init() {
        self.map = [[], [], [], [], [], [], [], [], [], [], [], []]
        var i = 0 
        while i < 12 {
            self.map[i] = [nil, nil, nil, nil, nil, nil, nil, nil, nil, nil, nil, nil]
            i = i + 1
        }
        self.numberOfTilesPlaced = 0
    }

    pub fun getMap(): [[UInt64?]] {
        return self.map
    }

    pub fun getNumberOfTilesPlaced(): Int {
        return self.numberOfTilesPlaced
    }
}
 