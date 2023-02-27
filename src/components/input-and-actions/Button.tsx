import React, { FC, ReactNode } from "react";
import clsx from "clsx";

export type ButtonProps = {
  onClick: () => void;
  children?: ReactNode;
  className?: string;
  disabled?: boolean;
};

const Button: FC<ButtonProps> = ({
  onClick,
  children,
  className,
  disabled = false,
}) => {
  return (
    <button
      type="button"
      className={clsx(
        "pixelated p-2 text-xs text-white focus:outline-none sm:px-4 sm:py-2 sm:text-sm",
        className,
        disabled &&
          "!cursor-not-allowed !bg-slate-400 text-white opacity-60 after:!text-slate-600 hover:text-white"
      )}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
