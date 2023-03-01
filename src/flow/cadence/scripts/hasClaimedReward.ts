import * as fcl from "@onflow/fcl";

const code = `
import Cartographer from 0xCartographer

pub fun main(address: Address): Bool {
    let explorer = Cartographer.explorerz[address]

    if (explorer != nil) {
        return explorer!.claimedReward
    }

    return false
}
`;

export const hasClaimedReward = async ({
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
