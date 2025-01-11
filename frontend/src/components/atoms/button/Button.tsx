import { AnchorHTMLAttributes, ButtonHTMLAttributes } from "react";
import Link, { LinkProps } from "next/link";
import "./button.scss";

interface IButton extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "no-color";
  color?: "green" | "yellow" | "black" | "red" | "lightBlue" | "darkBlue";
  size?: "lg" | "sm" | "xs";
  isLink?: boolean;
  linkProps?: LinkProps & AnchorHTMLAttributes<HTMLAnchorElement>;
  isFullWidth?: boolean;
  notCentered?: boolean;
}

export default function Button({
  variant = "primary",
  color = "green",
  size = "lg",
  isLink = false,
  isFullWidth = false,
  notCentered = false,
  linkProps,
  type = "button",
  ...props
}: IButton) {
  const buttonClasses = `button ${variant} ${color} ${size} ${
    isFullWidth ? "w-full" : "w-fit"
  } ${!notCentered ? "justify-center" : "justify-between"} ${
    props.className || ""
  }`;

  return isLink && linkProps ? (
    <Link {...linkProps} className={buttonClasses.trim()}>
      {props.children}
    </Link>
  ) : (
    <button type={type} {...props} className={buttonClasses.trim()}>
      {props.children}
    </button>
  );
}
