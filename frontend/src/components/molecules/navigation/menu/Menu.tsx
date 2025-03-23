import Button from "@/components/atoms/button/Button";
import Modal from "../../modal/Modal";
import ChatIcon from "@/components/atoms/icons/ChatIcon";
import MapPinWithBaseIcon from "@/components/atoms/icons/MapPinWithBaseIcon";
import NotificationIcon from "@/components/atoms/icons/NotificationIcon";
import SettingsIcon from "@/components/atoms/icons/SettingsIcon";
import UserIcon from "@/components/atoms/icons/UserIcon";
import HealthcareIcon from "@/components/atoms/icons/HealthcareIcon";
import "./menu.scss";
import { useRouter } from "next/navigation";
import useOutsideClick from "@/utils/hooks/useOutsideClick";

interface IMenu {
  showMenu: boolean;
  toggleMenu: () => void;
  isLoggedIn: boolean;
  session?: any;
  signOut?: () => void;
  unreadMessages?: {
    totalUnreadCount: number;
    unreadMessagesByChat: { [key: string]: number };
  };
}

export default function Menu({
  showMenu,
  toggleMenu,
  isLoggedIn,
  session,
  signOut,
  unreadMessages,
}: IMenu) {
  const router = useRouter();
  const menuRef = useOutsideClick(() => {showMenu && toggleMenu()});

  return (
    <Modal
      onClose={toggleMenu}
      isOpen={showMenu}
      title="Menu"
      className="flex flex-col gap-8"
      ref={menuRef}
    >
      {isLoggedIn ? (
        <>
          {/* FIRST LINKS */}
          <ul className="menu-links">
            <li className="inline relative">
              <Button
                variant="no-color"
                color="black"
                onClick={() => {
                  router.push("/chat"), toggleMenu();
                }}
              >
                <ChatIcon size={28} />
                Chat
              </Button>
              {unreadMessages?.totalUnreadCount &&
                unreadMessages?.totalUnreadCount > 0 && (
                  <span className="menu-unreadMsgs">
                    {unreadMessages?.totalUnreadCount}
                  </span>
                )}
            </li>
            <li>
              <Button
                variant="no-color"
                color="black"
                onClick={() => {
                  router.push("/my-pins"), toggleMenu();
                }}
              >
                <MapPinWithBaseIcon size={28} />
                My pins
              </Button>
            </li>
            <li>
              <Button
                variant="no-color"
                color="black"
                onClick={() => {
                  router.push("/"), toggleMenu();
                }}
              >
                <HealthcareIcon size={28} />I am a first responder
              </Button>
            </li>
          </ul>

          {/* SECOND LINKS */}
          <hr className="border border-solid border-green-primary" />
          <ul className="menu-links">
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
          <Button
            isFullWidth
            onClick={() => {
              router.push("/auth/login"), toggleMenu();
            }}
          >
            Log in
          </Button>
          <hr className="border border-solid border-green-primary" />
          <Button
            variant="secondary"
            isFullWidth
            onClick={() => {
              router.push("/auth/register"), toggleMenu();
            }}
          >
            Register
          </Button>
        </div>
      )}
    </Modal>
  );
}
