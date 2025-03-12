import Button from "@/components/atoms/button/Button";
import Modal from "../../modal/Modal";
import ChatIcon from "@/components/atoms/icons/ChatIcon";
import MapPinWithBaseIcon from "@/components/atoms/icons/MapPinWithBaseIcon";
import NotificationIcon from "@/components/atoms/icons/NotificationIcon";
import SettingsIcon from "@/components/atoms/icons/SettingsIcon";
import UserIcon from "@/components/atoms/icons/UserIcon";
import { IUser } from "@/types/structures";
import HealthcareIcon from "@/components/atoms/icons/HealthcareIcon";
import "./menu.scss";

interface IMenu {
  showMenu: boolean;
  toggleMenu: () => void;
  isLoggedIn: boolean;
  user?: IUser;
  session?: any;
  signOut?: () => void;
}

export default function Menu({
  showMenu,
  toggleMenu,
  isLoggedIn,
  user,
  session,
  signOut,
}: IMenu) {
  return (
    <Modal
      onClose={toggleMenu}
      isOpen={showMenu}
      title="Menu"
      className="flex flex-col gap-8"
    >
      {isLoggedIn ? (
        <>
          {/* FIRST LINKS */}
          <ul className="menu-links">
            <li>
              <Button
                isLink
                variant="no-color"
                color="black"
                linkProps={{ href: "/chat" }}
              >
                <ChatIcon size={28} />
                Chat
              </Button>
            </li>
            <li>
              <Button isLink variant="no-color" color="black">
                <MapPinWithBaseIcon size={28} />
                My pins
              </Button>
            </li>
            <li>
              <Button isLink variant="no-color" color="black">
                <HealthcareIcon size={28} />I am a first responder
              </Button>
            </li>
          </ul>

          {/* SECOND LINKS */}
          <hr className="border border-solid border-green-primary" />
          <ul className="menu-links">
            <li>
              <Button variant="no-color" color="black" isLink>
                <NotificationIcon size={28} />
                Notifications
              </Button>
            </li>
            <li>
              <Button variant="no-color" color="black" isLink>
                <SettingsIcon size={28} />
                Settings
              </Button>
            </li>
            <li>
              <Button variant="no-color" color="black" isLink>
                <UserIcon size={28} />
                Account
              </Button>
            </li>
          </ul>

          {/* THIRD LINKS */}
          <hr className="border border-solid border-green-primary" />
          <ul className="menu-links">
            <li>
              <Button isLink variant="no-color" color="black">
                About us
              </Button>
            </li>
            <li>
              <Button isLink variant="no-color" color="black">
                Contact
              </Button>
            </li>
            <li>
              <Button isLink variant="no-color" color="black">
                Help
              </Button>
            </li>
            {session && (
              <li>
                <Button
                  variant="no-color"
                  color="black"
                  onClick={signOut && (() => signOut())}
                >
                  Log out
                </Button>
              </li>
            )}
          </ul>
        </>
      ) : (
        <div className="w-full flex flex-col gap-6">
          <h3>You have to authenticate yourself.</h3>
          <Button isFullWidth isLink linkProps={{ href: "/auth/login" }}>
            Log in
          </Button>
          <hr className="border border-solid border-green-primary" />
          <Button
            variant="secondary"
            isFullWidth
            isLink
            linkProps={{ href: "/auth/register" }}
          >
            Register
          </Button>
        </div>
      )}
    </Modal>
  );
}
