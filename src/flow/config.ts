import * as fcl from "@onflow/fcl";

type Network = "emulator" | "testnet";

const getConfig = (network: Network) => {
  switch (network) {
    case "emulator":
      return {
        "accessNode.api": "http://localhost:8888",
        "flow.network": "emulator",
        "discovery.wallet": "http://localhost:8701/fcl/authn", // Point FCL at dev-wallet (default port)
        "0xCartographer": "0xf3fcd2c1a78f5eee",
        "0xTileMinter": "0xf3fcd2c1a78f5eee",
        "0xNonFungibleToken": "0xf3fcd2c1a78f5eee",
        "0xMetadataViews": "0xf3fcd2c1a78f5eee",
      };
    case "testnet":
      return {};
  }
};

const FLOW_NETWORK = process.env.NEXT_PUBLIC_FLOW_NETWORK || "emulator";

fcl.config(getConfig(FLOW_NETWORK as Network));
