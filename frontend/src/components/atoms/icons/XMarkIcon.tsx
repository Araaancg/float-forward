"use client";
import { IIcon } from "@/interfaces";
import { JSX } from "react";

const XMarkIcon = ({
  size = 24,
  color = "#9BC53D",
  id,
  className,
}: IIcon): JSX.Element => {
  return (
    <i id={id} className={className}>
      <svg
        width={size}
        height={size}
        viewBox="0 0 28 28"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M26 2L2 26"
          stroke={color}
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M2 2L26 26"
          stroke={color}
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </i>
  );
};

export default XMarkIcon;
