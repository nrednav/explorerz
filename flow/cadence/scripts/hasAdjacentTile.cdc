import "Cartographer"

pub fun main(coordinates: [Int64; 2]): Bool {
    return Cartographer.hasAdjacentTile(coordinates: coordinates)
}
 