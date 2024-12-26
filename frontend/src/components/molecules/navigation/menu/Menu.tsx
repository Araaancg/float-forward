import Button from "@/components/atoms/button/Button";
import Modal from "../../modal/Modal";
import ChatIcon from "@/components/atoms/icons/ChatIcon";
import MapPinWithBaseIcon from "@/components/atoms/icons/MapPinWithBaseIcon";
import NotificationIcon from "@/components/atoms/icons/NotificationIcon";
import SettingsIcon from "@/components/atoms/icons/SettingsIcon";
import UserIcon from "@/components/atoms/icons/UserIcon";
import "./menu.scss";

interface IMenu {
  showMenu: boolean,
  toggleMenu: () => void
}

export default function Menu({showMenu, toggleMenu}:IMenu) {
  return (
    <Modal
      onClose={toggleMenu}
      isOpen={showMenu}
      title="Menu"
      className="flex flex-col gap-8"
    >
      {/* FIRST LINKS */}
      <ul className="menu-links">
        <li>
          <Button isLink variant="no-color">
            <ChatIcon size={28} />
            Chat
          </Button>
        </li>
        <li>
          <Button isLink variant="no-color">
            <MapPinWithBaseIcon size={28} />
            My pins
          </Button>
        </li>
        <li>
          <Button isLink variant="no-color">
            <ChatIcon size={28} />
            My requests
          </Button>
        </li>
        <li>
          <Button isLink variant="no-color">
            <ChatIcon size={28} />I am a first responder
          </Button>
        </li>
      </ul>

      {/* SECOND LINKS */}
      <hr className="border border-solid border-green-primary" />
      <ul className="menu-links">
        <li>
          <Button variant="no-color" isLink>
            <NotificationIcon size={28} />
            Notifications
          </Button>
        </li>
        <li>
          <Button variant="no-color" isLink>
            <SettingsIcon size={28} />
            Settings
          </Button>
        </li>
        <li>
          <Button variant="no-color" isLink>
            <UserIcon size={28} />
            Account
          </Button>
        </li>
      </ul>

      {/* THIRD LINKS */}
      <hr className="border border-solid border-green-primary" />
      <ul className="menu-links">
        <li>
          <Button isLink variant="no-color">
            About us
          </Button>
        </li>
        <li>
          <Button isLink variant="no-color">
            Contact
          </Button>
        </li>
        <li>
          <Button isLink variant="no-color">
            Help
          </Button>
        </li>
      </ul>
    </Modal>
  );
}
