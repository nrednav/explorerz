import * as fcl from "@onflow/fcl";

fcl.config({
  "accessNode.api": "http://localhost:8888",
  "flow.network": "emulator",
  // Point FCL at dev-wallet (default port)
  "discovery.wallet": "http://localhost:8701/fcl/authn",
});
