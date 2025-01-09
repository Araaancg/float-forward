import Image from "next/image";
import "./footer.scss";
import Button from "@/components/atoms/button/Button";

export default function Footer() {
  return (
    <div className="footer">
      <div>
        <Image
          src="/logo-horizontal.png"
          alt="AIDNET logo"
          width={140}
          height={59}
        />
        <p className="flex gap-2">
          <Button isLink variant="no-color" size="xs">
            Terms and conditions
          </Button>{" "}
          |
          <Button isLink variant="no-color" size="xs">
            Privacy policy
          </Button>
        </p>
      </div>

      <div className="flex flex-col xs:flex-row justify-center items-start gap-6">
        <ul className="footer-links">
          <p className="footer-links-title">EXPLORE</p>
          <li>
            <Button isLink variant="no-color" size="xs">
              Recent disasters
            </Button>
          </li>
          <li>
            <Button isLink variant="no-color" size="xs">
              My requests
            </Button>
          </li>
          <li>
            <Button isLink variant="no-color" size="xs">
              My pins
            </Button>
          </li>
          <li>
            <Button isLink variant="no-color" size="xs">
              Chat
            </Button>
          </li>
        </ul>

        <ul className="footer-links">
          <p className="footer-links-title">MORE INFORMATION</p>
          <li>
            <Button isLink variant="no-color" size="xs">
              I am a first responder
            </Button>
          </li>
          <li>
            <Button isLink variant="no-color" size="xs">
              About us
            </Button>
          </li>
          <li>
            <Button isLink variant="no-color" size="xs">
              Contact
            </Button>
          </li>
          <li>
            <Button isLink variant="no-color" size="xs">
              Help
            </Button>
          </li>
        </ul>
      </div>
    </div>
  );
}
