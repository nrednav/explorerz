

// A simple cartographer contract 
pub contract Cartographer {
    // declaration of a public variable
    pub var map: [[Int]]
    pub var numberOfTilesPlaced: Int


    // initialization method for our contracts, this gets run on deployment
    init() {
        self.map = [[], [], [], [], [], [], [], [], [], [], [], []]
        var i = 0 
        while i < 12 {
            self.map[i] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
            i = i + 1
        }
        self.numberOfTilesPlaced = 0
    }

    pub fun getMap(): [[Int]] {
        return self.map
    }
}


 
 