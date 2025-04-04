import Image from "next/image";
import "./footer.scss";
import Button from "@/components/atoms/button/Button";
import ChatIcon from "@/components/atoms/icons/ChatIcon";
import MapPinWithBaseIcon from "@/components/atoms/icons/MapPinWithBaseIcon";
import HealthcareIcon from "@/components/atoms/icons/HealthcareIcon";

export default function Footer() {
  return (
    <div className="footer">
      <div className="flex flex-col sm:flex-row w-full justify-around items-center">
        <div className="flex flex-col w-full sm:w-fit justify-center items-start">
          <Button
            variant="no-color"
            color="black"
            isLink
            linkProps={{ href: "/" }}
          >
            <Image
              src="/logo-s.png"
              alt="AIDNET logo horizontal"
              width={200}
              height={38}
            />
          </Button>
          <ul className="flex flex-col gap-3 mt-3 ">
            <li>
              <Button
                isLink
                variant="no-color"
                color="black"
                linkProps={{href: "/#contact-us"}}
              >
                Contact Us
              </Button>
            </li>
            <li>
              <Button isLink variant="no-color" color="black" linkProps={{href: "/#help"}}>
                Help
              </Button>
            </li>
          </ul>
        </div>

        <ul className="flex flex-col gap-3 w-full sm:w-fit justify-center items-end sm:items-center">
          <li className="inline relative">
            <Button
              isLink
              variant="no-color"
              color="black"
              linkProps={{ href: "/chat" }}
            >
              <ChatIcon size={24} color="#000" />
              Chat
            </Button>
          </li>
          <li>
            <Button
              isLink
              variant="no-color"
              color="black"
              linkProps={{ href: "/my-pins" }}
            >
              <MapPinWithBaseIcon size={24} color="#000" />
              My pins
            </Button>
          </li>
          <li>
            <Button isLink variant="no-color" color="black" linkProps={{href: "/first-responder"}}>
              <HealthcareIcon size={24} color="#000" />I am a first responder
            </Button>
          </li>
        </ul>
      </div>
      <hr className="w-11/12 border-[0.5px] border-black-primary" />
      <div className="flex flex-col-reverse gap-3 sm:flex-row w-full justify-around items-center">
        <p className="text-sm">&copy; {new Date().getFullYear()} AIDNET. All rights reserved.</p>
        <p className="flex gap-2">
          <Button isLink variant="no-color" color="black" size="sm">
            Terms and conditions
          </Button>{" "}
          |
          <Button isLink variant="no-color" color="black" size="sm">
            Privacy policy
          </Button>
        </p>
      </div>
    </div>
  );
}
