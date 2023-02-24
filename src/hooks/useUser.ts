import { useEffect, useState } from "react";
import * as fcl from "@onflow/fcl";

type CurrentUserObject = {
  addr: string | null;
  cid: string | null;
  expiresAt: number | null;
  f_type: string;
  f_vsn: string;
  loggedIn: boolean | null;
  services: any[];
};

const useUser = () => {
  const [user, setUser] = useState<CurrentUserObject>({
    addr: null,
    cid: null,
    expiresAt: null,
    f_type: "USER",
    f_vsn: "1.0.0",
    loggedIn: null,
    services: [],
  });

  useEffect(() => fcl.currentUser.subscribe(setUser), []);

  return { user };
};

export default useUser;
