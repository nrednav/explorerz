import { FC, useCallback } from "react";
import { TileKindSchema, TileSchema } from "@/shared/types";
import Drawer from "../containers/Drawer/Drawer";
import DrawerSection from "../containers/Drawer/DrawerSection";
import LoginButton from "../input-and-actions/LoginButton";
import Error from "./Error";
import Loading from "./Loading";
import Tile from "./Tile";
import useModal from "@/hooks/useModal";
import useTileCollection from "@/hooks/useTileCollection";
import useUser from "@/hooks/useUser";
import { selectedTileAtom } from "@/store";
import { useSetAtom } from "jotai";
import { z } from "zod";

type InventoryPanelProps = {
  isOpen: boolean;
  onClose: () => void;
};

const InventoryPanel: FC<InventoryPanelProps> = ({ isOpen, onClose }) => {
  return (
    <Drawer isOpen={isOpen} onClose={onClose}>
      <TileCollection />
    </Drawer>
  );
};

const TileCollection = () => {
  const { user } = useUser();
  const {
    data: tileCollection,
    isLoading,
    isError,
  } = useTileCollection({
    address: user.addr ?? "",
  });

  if (!user.loggedIn) return <LoginButton />;
  if (isError) return <Error message="Could not load inventory..." />;
  if (isLoading) return <Loading />;
  if (!tileCollection) return <Error message="Could not load inventory..." />;

  return (
    <div className="flex flex-col space-y-8">
      {TileKindSchema.options.map((tileKind) => {
        return (
          <DrawerSection title={tileKind} key={tileKind}>
            <TileList tiles={tileCollection[tileKind]} />
          </DrawerSection>
        );
      })}
    </div>
  );
};

const TileList = ({ tiles }: { tiles: z.infer<typeof TileSchema>[] }) => {
  const setSelectedTile = useSetAtom(selectedTileAtom);
  const inventoryPanel = useModal();

  const selectTile = useCallback(
    (tile: z.infer<typeof TileSchema>) => () => {
      setSelectedTile(tile);
      inventoryPanel.close();
    },
    [inventoryPanel, setSelectedTile]
  );

  return (
    <div className="flex snap-x snap-mandatory flex-nowrap space-x-6 overflow-x-scroll">
      {tiles.length > 0 ? (
        tiles.map((tile) => (
          <div
            key={`${tile.id}-${tile.variant}`}
            className="flex flex-col items-stretch justify-center"
          >
            <Tile
              tile={tile}
              className="notched-module my-2 h-16 w-16 cursor-pointer snap-start border-2 border-black"
              onClick={selectTile(tile)}
            />
            <p className="py-2 text-center text-sm sm:text-base">#{tile.id}</p>
          </div>
        ))
      ) : (
        <p className="py-4 text-xs text-slate-600">None owned</p>
      )}
    </div>
  );
};

export default InventoryPanel;
