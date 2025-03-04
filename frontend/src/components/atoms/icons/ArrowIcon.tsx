"use client";
import { IIcon } from "./icon-interface";
import { JSX, useMemo } from "react";

type ArrowOrientation = "up" | "down" | "left" | "right";
interface ArrowProps extends IIcon {
  orientation?: ArrowOrientation;
}

const ArrowIcon = ({
  orientation = "left",
  size = 24,
  color = "#9BC53D",
  id,
  className,
}: ArrowProps): JSX.Element => {
  const rotation = useMemo(() => {
    let rotationClass = "";

    if (orientation === "up") {
      rotationClass = "-rotate-90";
    } else if (orientation === "down") {
      rotationClass = "rotate-90";
    } else if (orientation === "left") {
      rotationClass = "rotate-180";
    }

    return rotationClass;
  }, [orientation]);

  return (
    <i id={id} className={className}>
      <svg
        width={size}
        height={size * 0.8}
        viewBox="0 0 26 20"
        className={`transform ${rotation}`}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M1 10L25 10M25 10L16 19M25 10L16 1"
          stroke={color}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </i>
  );
};

export default ArrowIcon;
