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
        "pixelated p-2 text-xs text-white focus:outline-none sm:px-4 sm:py-2 sm:text-sm",
        className
      )}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
