import * as fcl from "@onflow/fcl";

const code = `
import Cartographer from 0xCartographer
import TileMinter from 0xTileMinter
import NonFungibleToken from 0xNonFungibleToken

pub fun main(address: Address): Bool {
    let account = getAccount(address)

    let tileCollectionCap = account
        .getCapability<&TileMinter.Collection{NonFungibleToken.CollectionPublic}>(TileMinter.CollectionPublicPath)

    let rewardCollectionCap = account
        .getCapability<&Cartographer.RewardCollection{Cartographer.RewardCollectionPublic}>(Cartographer.RewardCollectionPublicPath)

    return tileCollectionCap.check() && rewardCollectionCap.check()
}
`;

export const hasInitialisedAccount = async ({
  address,
}: {
  address: string;
}): Promise<boolean | null> => {
  if (!address) return null;

  try {
    return await fcl.query({
      cadence: code,
      args: (arg: any, t: any) => [arg(address, t.Address)],
    });
  } catch (error) {
    console.error(error);
    return null;
  }
};
