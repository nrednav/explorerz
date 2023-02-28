import * as fcl from "@onflow/fcl";

const FLOW_NETWORK = process.env.NEXT_PUBLIC_FLOW_NETWORK || "emulator";
const FLOW_EMULATOR_ACCOUNT =
  process.env.NEXT_PUBLIC_FLOW_EMULATOR_ACCOUNT || "";
const FLOW_TESTNET_ACCOUNT = process.env.NEXT_PUBLIC_FLOW_TESTNET_ACCOUNT || "";

type Network = "emulator" | "testnet";

const getConfig = (network: Network) => {
  switch (network) {
    case "emulator":
      return {
        "app.detail.title": "Explorerz",
        "accessNode.api": "http://localhost:8888",
        "flow.network": "emulator",
        "discovery.wallet": "http://localhost:8701/fcl/authn", // Point FCL at dev-wallet (default port)
        "0xCartographer": FLOW_EMULATOR_ACCOUNT,
        "0xTileMinter": FLOW_EMULATOR_ACCOUNT,
        "0xNonFungibleToken": FLOW_EMULATOR_ACCOUNT,
        "0xMetadataViews": FLOW_EMULATOR_ACCOUNT,
      };
    case "testnet":
      return {
        "app.detail.title": "Explorerz",
        "accessNode.api": "https://rest-testnet.onflow.org",
        "flow.network": "testnet",
        "discovery.wallet": "https://flow-wallet-testnet.blocto.app/authn",
        "0xCartographer": FLOW_TESTNET_ACCOUNT,
        "0xTileMinter": FLOW_TESTNET_ACCOUNT,
        "0xNonFungibleToken": "0x631e88ae7f1d7c20",
        "0xMetadataViews": "0x631e88ae7f1d7c20",
      };
  }
};

fcl.config(getConfig(FLOW_NETWORK as Network));
