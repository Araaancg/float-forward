"use client";
import { IIcon } from "@/interfaces";
import { JSX } from "react";

const ExclamationMarkIcon = ({
  size = 24,
  color = "#F02D3A",
  id,
  className,
}: IIcon): JSX.Element => {
  return (
    <i id={id} className={className}>
      <svg
        width={size}
        height={size}
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M16 8C16 12.4183 12.4183 16 8 16C3.58172 16 0 12.4183 0 8C0 3.58172 3.58172 0 8 0C12.4183 0 16 3.58172 16 8ZM9 12C9 12.5523 8.5523 13 8 13C7.44772 13 7 12.5523 7 12C7 11.4477 7.44772 11 8 11C8.5523 11 9 11.4477 9 12ZM8 3C7.44772 3 7 3.44772 7 4V8C7 8.5523 7.44772 9 8 9C8.5523 9 9 8.5523 9 8V4C9 3.44772 8.5523 3 8 3Z"
          fill={color}
        />
      </svg>
    </i>
  );
};

export default ExclamationMarkIcon;
