import { ComponentPropsWithRef, FC } from "react";

const TriangleIcon: FC<ComponentPropsWithRef<"svg">> = (props) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      {...props}
    >
      <g
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      >
        <path d="M0 0h24v24H0z" />
        <path
          fill="currentColor"
          d="M19.007 3a3 3 0 0 1 2.828 3.94l-.068.185l-.062.126l-7.09 12.233a3 3 0 0 1-5.137.19l-.103-.173l-7.1-12.25l-.061-.125a3 3 0 0 1 2.625-4.125L4.897 3l.06.002L5 3h14.007z"
        />
      </g>
    </svg>
  );
};

export default TriangleIcon;
