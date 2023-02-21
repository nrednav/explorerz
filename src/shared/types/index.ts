// A 2D grid (rows & columns) of tiles
export type TileGrid = (Tile | null)[][];

export type Tile = {
  id: number;
  kind: "grass" | "water" | "sand" | "stone";
  image: {
    src: string;
    alt: string;
  };
};
