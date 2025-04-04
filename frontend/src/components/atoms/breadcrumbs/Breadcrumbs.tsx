import Link from "next/link";
import "./breadcrumbs.scss";
import { HTMLAttributes } from "react";

export interface IBreadcrumb {
  placeholder: string;
  url: string;
}

interface BreadcrumbsProps extends HTMLAttributes<HTMLDivElement> {
  links: IBreadcrumb[];
}

export default function Breadcrumbs({ links, className, ...props }: BreadcrumbsProps) {
  return (
    <div className={`breadcrumbs ${className || ''}`} {...props}>
      <div className="breadcrumbs-home">
        <Link href={"/"} className="breadcrumbs-single">
          Home
        </Link>
      </div>
      <span> / </span>
      {links.map((link, i) => (
        <div key={`breadcrumbsLink-${i}`}>
          <Link href={link.url} className="breadcrumbs-single text-wrap">
            {link.placeholder}
          </Link>
          {i !== links.length - 1 && <span className="ml-4"> / </span>}
        </div>
      ))}
    </div>
  );
}