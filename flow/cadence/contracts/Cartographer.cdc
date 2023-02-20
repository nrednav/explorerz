// A simple cartographer contract 
pub contract Cartographer {
    // declaration of a public variable
<<<<<<< HEAD
    pub var map: [[UInt64?]]
=======
    pub var map: [[Int]]
>>>>>>> main
    pub var numberOfTilesPlaced: Int


    // initialization method for our contracts, this gets run on deployment
    init() {
        self.map = [[], [], [], [], [], [], [], [], [], [], [], []]
        var i = 0 
        while i < 12 {
<<<<<<< HEAD
            self.map[i] = [nil, nil, nil, nil, nil, nil, nil, nil, nil, nil, nil, nil]
=======
            self.map[i] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
>>>>>>> main
            i = i + 1
        }
        self.numberOfTilesPlaced = 0
    }

<<<<<<< HEAD
    pub fun getMap(): [[UInt64?]] {
=======
    pub fun getMap(): [[Int]] {
>>>>>>> main
        return self.map
    }
}
