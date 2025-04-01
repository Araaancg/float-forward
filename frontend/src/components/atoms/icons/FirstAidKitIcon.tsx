"use client";
import { IIcon } from "./icon-interface";
import { JSX } from "react";

const FirstAidKitIcon = ({
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
        viewBox="0 0 56 50"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M10.5 49.5H45.5V11H42V5.75C42 2.85047 39.6495 0.5 36.75 0.5H19.25C16.3505 0.5 14 2.85047 14 5.75V11H10.5V49.5ZM21 7.5H35V11H21V7.5ZM56 16.25V44.25C56 47.1495 53.6495 49.5 50.75 49.5H49V11H50.75C53.6495 11 56 13.3505 56 16.25ZM7 49.5H5.25C2.35047 49.5 0 47.1495 0 44.25V16.25C0 13.3505 2.35047 11 5.25 11H7V49.5ZM38.5 26.75V30.25C38.5 31.2165 37.7165 32 36.75 32H31.5V37.25C31.5 38.2165 30.7165 39 29.75 39H26.25C25.2835 39 24.5 38.2165 24.5 37.25V32H19.25C18.2835 32 17.5 31.2165 17.5 30.25V26.75C17.5 25.7835 18.2835 25 19.25 25H24.5V19.75C24.5 18.7835 25.2835 18 26.25 18H29.75C30.7165 18 31.5 18.7835 31.5 19.75V25H36.75C37.7165 25 38.5 25.7835 38.5 26.75Z"
          fill={color}
        />
      </svg>
    </i>
  );
};

export default FirstAidKitIcon;
