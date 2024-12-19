import { AnchorHTMLAttributes, ButtonHTMLAttributes } from "react"
import Link, { LinkProps } from "next/link"
import "./button.scss"

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode
  variant?: "primary" | "secondary" | "no-color"
  size?: "lg" | "sm"
  isLink?: boolean
  linkProps?: LinkProps & AnchorHTMLAttributes<HTMLAnchorElement>
}

export default function Button({
  variant = "primary",
  size = "lg",
  isLink = false,
  linkProps,
  type = "button",
  ...props
}: ButtonProps) {
  const linkClasses = `button ${variant} ${size} ${props.className || ""}`
  const buttonClasses = `button ${variant} ${size} ${props.className || ""}`

  return isLink && linkProps ? (
    <Link {...linkProps} className={linkClasses.trim()}>
      {props.children}
    </Link>
  ) : (
    <button type={type} {...props} className={buttonClasses.trim()}>
      {props.children}
    </button>
  )
}
