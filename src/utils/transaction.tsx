import { TransactionState } from "@/shared/types";
import * as fcl from "@onflow/fcl";
import { toast } from "react-hot-toast";

type TrackTransactionStatusArgs = {
  txId: string;
  onError?: (errorMessage: string) => string | undefined;
  onSuccess?: (txState: TransactionState) => string | undefined;
  loadingMessage?: string;
};

export const trackTransactionStatus = ({
  txId,
  onError,
  onSuccess,
  loadingMessage = "Loading",
}: TrackTransactionStatusArgs) => {
  toast.promise(
    new Promise((resolve, reject) => {
      fcl.tx(txId).subscribe((txState: TransactionState) => {
        if (txState.errorMessage.length > 0) {
          const message = onError
            ? onError(txState.errorMessage.toLowerCase())
            : "";
          return reject(message);
        }

        if (txState.status === 4 && txState.statusCode === 0) {
          const message = onSuccess ? onSuccess(txState) : "";
          return resolve(message);
        }
      });
    }),
    {
      loading: loadingMessage,
      success: (message) => `${message}`,
      error: (message) => `${message}`,
    },
    {
      style: { minWidth: "240px" },
      success: { duration: 3000 },
      error: { duration: 6000 },
    }
  );
};
