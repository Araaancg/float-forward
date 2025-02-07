"use client";
import { IIcon } from "./icon-interface";
import { JSX, useMemo } from "react";

type ArrowOrientation = "up" | "down" | "left" | "right";
interface ArrowProps extends IIcon {
  orientation?: ArrowOrientation;
}

const DoubleCaretIcon = ({
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
        className={`transform ${rotation}`}
        viewBox="0 0 256 256"
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
      >
        <path
          d="m144.48535 136.48535-80 80a12.0001 12.0001 0 0 1 -16.9707-16.9707l71.51465-71.51465-71.51465-71.51465a12.0001 12.0001 0 0 1 16.9707-16.9707l80 80a12.00062 12.00062 0 0 1 0 16.9707zm80-16.9707-80-80a12.0001 12.0001 0 1 0 -16.9707 16.9707l71.51465 71.51465-71.51465 71.51465a12.0001 12.0001 0 0 0 16.9707 16.9707l80-80a12.00062 12.00062 0 0 0 0-16.9707z"
          fill={color}
        />
      </svg>
    </i>
  );
};

export default DoubleCaretIcon;
