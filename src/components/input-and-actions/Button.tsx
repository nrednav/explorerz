import React, { FC, ReactNode } from "react";
import clsx from "clsx";

type ButtonProps = {
  onClick: () => void;
  children?: ReactNode;
  className?: string;
};

const Button: FC<ButtonProps> = ({ onClick, children, className }) => {
  return (
    <button
      type="button"
      className={clsx(
        "notched-module inline-flex items-center justify-center border border-transparent bg-slate-700 p-2 text-xs font-medium text-white shadow-sm hover:bg-slate-500 focus:outline-none focus:ring-2 focus:ring-slate-600 focus:ring-offset-2 sm:p-4 sm:text-sm",
        className
      )}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
