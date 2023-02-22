import { useEffect, useState } from "react";
import * as fcl from "@onflow/fcl";

const useUser = () => {
  const [user, setUser] = useState({ loggedIn: null });
  useEffect(() => fcl.currentUser.subscribe(setUser), []);

  return { user };
};

export default useUser;
