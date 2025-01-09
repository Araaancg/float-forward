import { useState } from "react";
import Image from "next/image";
import Button from "@/components/atoms/button/Button";
import MenuBurgerIcon from "@/components/atoms/icons/MenuHamburgerIcon";
import Menu from "../menu/Menu";
import { IUser } from "@/interfaces";
import "./topbar.scss";

export default function Topbar({
  isSidebarOpen,
  isLoggedIn,
  user,
}: {
  isSidebarOpen: boolean;
  isLoggedIn: boolean;
  user?: IUser
}) {
  const [showMenu, setShowMenu] = useState<boolean>(false);
  return (
    <div className="topbar">
      {/* MOBILE */}
      <Image
        src="/logo-horizontal-xs.png"
        alt="AIDNET logo"
        width={100}
        height={25}
        className="sm:hidden"
      />
      <Button variant="no-color" onClick={() => setShowMenu(true)}>
        <MenuBurgerIcon className="sm:hidden" />
      </Button>

      <Menu
        showMenu={showMenu}
        toggleMenu={() => setShowMenu(!showMenu)}
        isLoggedIn={isLoggedIn}
        user={user}
      />

      {/* DESKTOP */}
      <ul
        className={`topbar-links ${
          isSidebarOpen ? "items-start" : "items-center"
        }`}
      >
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
      </ul>
    </div>
  );
}
