import Button from "./Button";
import { initialiseAccount } from "@/flow/cadence/transactions/initialiseAccount";
import useHasInitialisedAccount from "@/hooks/useHasInitialisedAccount";
import useUser from "@/hooks/useUser";

const InitialiseAccountButton = () => {
  return (
    <Button
      onClick={initialiseAccount}
      className="bg-emerald-500 text-white after:text-emerald-700 hover:text-white"
    >
      Initialise
    </Button>
  );
};

export default InitialiseAccountButton;
