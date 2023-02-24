import React, { FC } from "react";

type ButtonProps = {
  onClick: () => void;
  ctaText: string;
};

const Button: FC<ButtonProps> = ({ onClick, ctaText }) => {
  return (
    <button
      type="button"
      className="notched-module inline-flex w-32 items-center justify-center border border-transparent bg-slate-700 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-slate-500 focus:outline-none focus:ring-2 focus:ring-slate-600 focus:ring-offset-2"
      onClick={onClick}
    >
      {ctaText}
    </button>
  );
};

export default Button;
