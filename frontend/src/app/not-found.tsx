import Button from "@/components/atoms/button/Button";
import ExclamationMarkIcon from "@/components/atoms/icons/ExclamationMarkIcon";
import Image from "next/image";
import "./not-found.scss"

export default function NotFound() {
  return (
    <div className="notFound">
      <div className="notFound-container">
        <Image
          src="/logo-s.png"
          alt="AIDNET logo horizontal"
          width={134}
          height={38}
        />
        <ExclamationMarkIcon size={32} />
        <h1 className="text-2xl	">404 - Page not found</h1>
        <p className="text-lg text-center">
          Seems like we could not found the page you are looking for
        </p>
        <Button
          variant="primary"
          color="green"
          isLink
          linkProps={{ href: "/" }}
          isFullWidth
        >
          Return home
        </Button>
        <hr className="w-full border border-green-primary"/>
        <Button
          variant="secondary"
          color="green"
          isLink
          linkProps={{ href: "/auth/login" }}
          isFullWidth
        >
          Login
        </Button>
      </div>
    </div>
  );
}
