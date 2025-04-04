"use client";
import { IIcon } from "./icon-interface";
import { JSX } from "react";

const MapPinWithBaseIcon = ({
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
        viewBox="0 0 26 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M5.5 25C2.7566 25.6176 1 26.5665 1 27.6306C1 29.4915 6.37258 31 13 31C19.6275 31 25 29.4915 25 27.6306C25 26.5665 23.2433 25.6176 20.5 25"
          stroke={color}
          strokeWidth="2"
          strokeLinecap="round"
        />
        <path
          d="M16.75 11.5C16.75 13.571 15.071 15.25 13 15.25C10.929 15.25 9.25 13.571 9.25 11.5C9.25 9.42893 10.929 7.75 13 7.75C15.071 7.75 16.75 9.42893 16.75 11.5Z"
          stroke={color}
          strokeWidth="2"
        />
        <path
          d="M14.8861 24.2404C14.3801 24.7276 13.704 25 13.0003 25C12.2965 25 11.6203 24.7276 11.1143 24.2404C6.48145 19.7512 0.272785 14.7362 3.30056 7.4556C4.93765 3.51898 8.86741 1 13.0003 1C17.1331 1 21.0628 3.519 22.6999 7.4556C25.7239 14.7271 19.5304 19.7667 14.8861 24.2404Z"
          stroke={color}
          strokeWidth="2"
        />
      </svg>
    </i>
  );
};

export default MapPinWithBaseIcon;
