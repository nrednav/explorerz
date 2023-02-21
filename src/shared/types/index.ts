import { z } from "zod";

const TileSchema = z.object({
  id: z.number(),
  kind: z.enum(["grass", "water", "sand", "stone"]),
  image: z.object({
    src: z.string(),
    alt: z.string(),
  }),
});
export type Tile = z.infer<typeof TileSchema>;

export const MapSchema = TileSchema.nullable().array().array();
export type TileGrid = z.infer<typeof MapSchema>;
