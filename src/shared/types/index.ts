import { z } from "zod";

export const TileKindSchema = z.enum(["grass", "water", "sand", "stone"]);
export type TileKind = z.infer<typeof TileKindSchema>;

export const TileSchema = z.object({
  id: z.coerce.number(),
  kind: z.enum(["grass", "water", "sand", "stone"]),
  variant: z.coerce.number(),
  image: z.string(),
});
export type Tile = z.infer<typeof TileSchema>;

export const TileGridSchema = TileSchema.nullable().array().array();
export type TileGrid = z.infer<typeof TileGridSchema>;

export const TileCollectionSchema = z.object({
  grass: TileSchema.array(),
  water: TileSchema.array(),
  sand: TileSchema.array(),
  stone: TileSchema.array(),
});
export type TileCollection = z.infer<typeof TileCollectionSchema>;
