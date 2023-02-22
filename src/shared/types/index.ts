import { z } from "zod";

export const TileSchema = z.object({
  id: z.number(),
  kind: z.enum(["grass", "water", "sand", "stone"]),
  image: z.string(),
  variant: z.string(),
});
export type Tile = z.infer<typeof TileSchema>;

export const TileGridSchema = TileSchema.nullable().array().array();
export type TileGrid = z.infer<typeof TileGridSchema>;
