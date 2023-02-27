import { MapCoordinate, Tile } from "./shared/types";
import { atom } from "jotai";

export const modalAtom = atom<boolean>(false);
export const selectedTileAtom = atom<Tile | null>(null);
export const selectedCoordinateAtom = atom<MapCoordinate | null>(null);
