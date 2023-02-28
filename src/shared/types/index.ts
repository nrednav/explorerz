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

export const MapSchema = z.object({
  tiles: TileGridSchema,
  size: z.coerce.number(),
  tilesOccupied: z.coerce.number(),
  completed: z.boolean(),
});
export type Map = z.infer<typeof MapSchema>;

export type MapCoordinate = {
  x: number;
  y: number;
};

export type TransactionState = {
  blockId: number;
  errorMessage: string;
  events: TransactionEvent[];
  status: number;
  statusCode: number;
  statusString: string;
};

export type TransactionEvent = {
  data: { [key: string]: any };
  eventIndex: number;
  transactionId: string;
  transactionIndex: number;
  type: string;
};

export const PhaseDetailsSchema = z.object({
  phase: z.object({
    lastUpdatedAt: z.coerce.number(),
    duration: z.coerce.number(),
  }),
  blockHeight: z.coerce.number(),
});

export type PhaseDetails = z.infer<typeof PhaseDetailsSchema>;

export enum RewardTier {
  "common",
  "rare",
  "epic",
  "legendary",
}
