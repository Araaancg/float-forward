"use client";
import React, { HTMLAttributes, useState } from "react";
import Button from "@/components/atoms/button/Button";
import "./see-more-p.scss";

interface ISeeMoreP extends HTMLAttributes<HTMLParagraphElement> {
  text: string;
  size?: "sm" | "lg"
  buttonClassName?: string,
  quantityShown?: number
}

export default function SeeMoreP({ text, size = "lg", className, quantityShown = 150, ...props }: ISeeMoreP) {
  const [seeMoreInfo, setSeeMoreInfo] = useState<boolean>(false);

  return (
    <p className={`${size === "lg" ? "text-base":"text-sm"}`}>
      {seeMoreInfo ? text : `${text?.slice(0, quantityShown)} ${text?.length > quantityShown ? "...":""}`}
      <Button onClick={() => setSeeMoreInfo(!seeMoreInfo)} variant="no-color" size={size}>
        {seeMoreInfo ? "See less" : "See more"}
      </Button>
    </p>
  );
}
