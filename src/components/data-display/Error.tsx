import { FC } from "react";

type ErrorProps = {
  message: string;
};

const Error: FC<ErrorProps> = ({ message }) => {
  return (
    <div className="flex min-h-[480px] items-center justify-center">
      <p className="text-xl uppercase">Error! {message}</p>
    </div>
  );
};

export default Error;
