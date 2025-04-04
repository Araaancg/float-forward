"use client";
import { IIcon } from "./icon-interface";
import { JSX } from "react";

const UserIcon = ({
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
        viewBox="0 0 20 22"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M9.59009 11C12.3515 11 14.5901 8.76142 14.5901 6C14.5901 3.23858 12.3515 1 9.59009 1C6.82867 1 4.59009 3.23858 4.59009 6C4.59009 8.76142 6.82867 11 9.59009 11Z"
          stroke={color}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M18.18 21C18.18 17.13 14.33 14 9.58999 14C4.85 14 1 17.13 1 21"
          stroke={color}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </i>
  );
};

export default UserIcon;
