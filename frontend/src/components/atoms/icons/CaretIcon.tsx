"use client";
import { IIcon } from "./icon-interface";
import { JSX, useMemo } from "react";

type ArrowOrientation = "up" | "down" | "left" | "right";
interface ArrowProps extends IIcon {
  orientation?: ArrowOrientation;
}

const CaretIcon = ({
  orientation = "left",
  size = 24,
  color = "#9BC53D",
  id,
  className,
}: ArrowProps): JSX.Element => {
  const rotation = useMemo(() => {
    let rotationClass = "";

    if (orientation === "down") {
      rotationClass = "-rotate-90";
    } else if (orientation === "up") {
      rotationClass = "rotate-90";
    } else if (orientation === "right") {
      rotationClass = "rotate-180";
    }

    return rotationClass;
  }, [orientation]);

  return (
    <i id={id} className={className}>
      <svg
        width={size}
        height={size}
        viewBox="0 0 14 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`transform ${rotation}`}
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M13.5416 0.458453C14.1528 1.06972 14.1528 2.06075 13.5416 2.67202L4.21353 12L13.5416 21.3281C14.1528 21.9392 14.1528 22.9302 13.5416 23.5417C12.9303 24.1528 11.9393 24.1528 11.328 23.5417L0.893209 13.1068C0.599677 12.8133 0.434771 12.4152 0.434771 12C0.434771 11.5849 0.599677 11.1868 0.893209 10.8932L11.328 0.458453C11.9393 -0.152818 12.9303 -0.152818 13.5416 0.458453Z"
          fill={color}
        />
      </svg>
    </i>
  );
};

export default CaretIcon;
