import Button from "./Button";
import useUser from "@/hooks/useUser";
import * as fcl from "@onflow/fcl";

const LoginButton = () => {
  const { user } = useUser();
  return (
    <Button
      onClick={user.loggedIn ? fcl.unauthenticate : fcl.authenticate}
      className="bg-yellow-400 text-black after:text-yellow-600 hover:text-black"
    >
      {user.loggedIn ? "Logout" : "Login"}
    </Button>
  );
};

export default LoginButton;
