import { FC } from "react";
import Drawer from "../containers/Drawer/Drawer";
import DrawerSection from "../containers/Drawer/DrawerSection";
import Error from "./Error";
import Loading from "./Loading";
import useTileCollection from "@/hooks/useTileCollection";
import useUser from "@/hooks/useUser";
import {TileCollection, TileSchema} from "@/shared/types";
import {z} from "zod";
import Tile from "./Tile";
import LoginButton from "../input-and-actions/LoginButton";

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

  const tileKinds = Object.keys(tileCollection) as Array<keyof TileCollection>;

  return (
    <div className="flex flex-col space-y-8">
      {tileKinds.map((tileKind) => {
        return (
          <DrawerSection title={tileKind} key={tileKind}>
            <TileCarousel tiles={tileCollection[tileKind]} />
          </DrawerSection>
        );
      })}
    </div>
  );
};

const TileCarousel = ({ tiles }: { tiles: z.infer<typeof TileSchema>[] }) => {
  return (
    <div className="flex flex-nowrap overflow-x-scroll space-x-6 snap-x snap-mandatory">
      {tiles.length > 0
        ? tiles.map((tile) => (
          <div className="flex flex-col items-stretch justify-center">
            <Tile key={`${tile.id}-${tile.variant}`} tile={{...tile, image: `/images/${tile.image.split("/")[4]}`}} className="notched-module border-2 cursor-pointer border-black my-2 h-16 w-16 snap-start" />
            <p className="text-sm sm:text-lg text-center py-2">#{tile.id}</p>
          </div>
        ))
        : <p className="text-xs text-slate-600 py-4">Not owned yet</p>
      }
    </div>
  );
};

export default InventoryPanel;
