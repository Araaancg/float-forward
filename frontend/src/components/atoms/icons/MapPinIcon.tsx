"use client";
import { IIcon } from "@/interfaces";
import { JSX } from "react";

const MapPinIcon = ({
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
        viewBox="0 0 21 23"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M12.1166 20.7649C11.683 21.1709 11.1034 21.3978 10.5002 21.3978C9.89693 21.3978 9.31739 21.1709 8.88374 20.7649C4.91267 17.0243 -0.409042 12.8456 2.1862 6.77901C3.58941 3.49885 6.95778 1.3999 10.5002 1.3999C14.0426 1.3999 17.411 3.49885 18.8142 6.77901C21.4061 12.838 16.0975 17.0372 12.1166 20.7649Z"
          stroke={color}
          strokeWidth="2"
        />
        <path
          d="M13.9987 10.3991C13.9987 12.3319 12.4318 13.8987 10.499 13.8987C8.56623 13.8987 6.99939 12.3319 6.99939 10.3991C6.99939 8.46625 8.56623 6.89941 10.499 6.89941C12.4318 6.89941 13.9987 8.46625 13.9987 10.3991Z"
          stroke={color}
          strokeWidth="2"
        />
      </svg>
    </i>
  );
};

export default MapPinIcon;
