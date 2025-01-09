import Link from "next/link";
import "./breadcrumbs.scss";

interface IBreadcrumbs {
  links: {
    placeholder: string;
    url: string;
  }[];
}

export default function Breadcrumbs({ links }: IBreadcrumbs) {
  return (
    <div className="breadcrumbs">
      <div className="breadcrumbs-home">
        <Link href={"/"} className="breadcrumbs-single">Home</Link>
      </div>
      <span> / </span>
      {links.map((link, i) => (
        <div key={`breadcrumbsLink-${i}`}>
          <Link href={link.url} className="breadcrumbs-single">
            {link.placeholder}
          </Link>
          {i !== links.length - 1 && (
            <span className="ml-4"> / </span>
          )}
        </div>
      ))}
    </div>
  );
}
