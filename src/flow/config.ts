import * as fcl from "@onflow/fcl";

type Network = "emulator" | "testnet";

const getConfig = (network: Network) => {
  switch (network) {
    case "emulator":
      return {
        "app.detail.title": "Explorerz",
        "accessNode.api": "http://localhost:8888",
        "flow.network": "emulator",
        "discovery.wallet": "http://localhost:8701/fcl/authn", // Point FCL at dev-wallet (default port)
        "0xCartographer": "0xf8d6e0586b0a20c7",
        "0xTileMinter": "0xf8d6e0586b0a20c7",
        "0xNonFungibleToken": "0xf8d6e0586b0a20c7",
        "0xMetadataViews": "0xf8d6e0586b0a20c7",
      };
    case "testnet":
      return {
        "app.detail.title": "Explorerz",
        "accessNode.api": "https://rest-testnet.onflow.org",
        "flow.network": "testnet",
        "discovery.wallet": "https://flow-wallet-testnet.blocto.app/authn",
        "0xCartographer": "0x7e384d013d79153e",
        "0xTileMinter": "0x7e384d013d79153e",
        "0xNonFungibleToken": "0x631e88ae7f1d7c20",
        "0xMetadataViews": "0x631e88ae7f1d7c20",
      };
  }
};

const FLOW_NETWORK = process.env.NEXT_PUBLIC_FLOW_NETWORK || "emulator";

fcl.config(getConfig(FLOW_NETWORK as Network));
