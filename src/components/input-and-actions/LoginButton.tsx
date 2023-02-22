import React from "react";
import useUser from "@/hooks/useUser";
import * as fcl from "@onflow/fcl";

const LoginButton = () => {
  const { user } = useUser();

  return (
    <button
      type="button"
      className="inline-flex w-32 items-center justify-center rounded-md border border-transparent bg-slate-700 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-slate-500 focus:outline-none focus:ring-2 focus:ring-slate-600 focus:ring-offset-2"
      onClick={user.loggedIn ? fcl.unauthenticate : fcl.authenticate}
    >
      {user.loggedIn ? "LogOut" : "LogIn"}
    </button>
  );
};

export default LoginButton;
