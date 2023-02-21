import React, { FC } from "react";

interface Props {
  children: React.ReactNode;
}

export const ComponentLayout: FC<Props> = ({ children }) => {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      {children}
    </div>
  );
};
