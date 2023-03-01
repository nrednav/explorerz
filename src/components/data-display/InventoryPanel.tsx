import { FC, useCallback } from "react";
import Image from "next/image";
import { RewardTier, TileKindSchema, TileSchema } from "@/shared/types";
import Drawer from "../containers/Drawer/Drawer";
import DrawerSection from "../containers/Drawer/DrawerSection";
import LoginButton from "../input-and-actions/LoginButton";
import Error from "./Error";
import Loading from "./Loading";
import Tile from "./Tile";
import useModal from "@/hooks/useModal";
import useRewardCollection from "@/hooks/useRewardCollection";
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
      <RewardCollection />
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

const RewardCollection = () => {
  const { user } = useUser();
  const {
    data: rewardCollection,
    isLoading,
    isError,
  } = useRewardCollection({ address: user.addr ?? "" });

  if (!user.loggedIn) return <LoginButton />;
  if (isError) return <Error message="Could not load rewards..." />;
  if (isLoading) return <Loading />;
  if (!rewardCollection) return <Error message="Could not load rewards..." />;

  return (
    <div className="flex flex-col space-y-8 py-8">
      <DrawerSection title="Rewards">
        {rewardCollection.length > 0 ? (
          rewardCollection.map((reward) => {
            const tierLabel = RewardTier.options[reward.tier.rawValue];
            return (
              <Image
                src={reward.image}
                width="128"
                height="128"
                className="py-4"
                alt={`Image of a ${tierLabel} reward`}
                key={`${tierLabel}-${reward.id}`}
              />
            );
          })
        ) : (
          <p className="py-4 text-xs text-slate-600">None claimed</p>
        )}
      </DrawerSection>
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
          </div>
        ))
      ) : (
        <p className="py-4 text-xs text-slate-600">None owned</p>
      )}
    </div>
  );
};

export default InventoryPanel;
