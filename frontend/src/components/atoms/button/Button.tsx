import { AnchorHTMLAttributes, ButtonHTMLAttributes } from "react";
import Link, { LinkProps } from "next/link";
import "./button.scss";

interface IButton extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "no-color";
  size?: "lg" | "sm";
  isLink?: boolean;
  linkProps?: LinkProps & AnchorHTMLAttributes<HTMLAnchorElement>;
  isFullWidth?: boolean;
}

export default function Button({
  variant = "primary",
  size = "lg",
  isLink = false,
  isFullWidth = false,
  linkProps,
  type = "button",
  ...props
}: IButton) {
  const buttonClasses = `button ${variant} ${size} ${isFullWidth ? "w-full": "w-fit"} ${
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
