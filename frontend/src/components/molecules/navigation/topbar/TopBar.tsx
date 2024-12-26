import { useState } from "react";
import Image from "next/image";
import Button from "@/components/atoms/button/Button";
import MenuBurgerIcon from "@/components/atoms/icons/MenuHamburgerIcon";
import Menu from "../menu/Menu";
import "./topbar.scss";

export default function Topbar({ isSidebarOpen }: { isSidebarOpen: boolean }) {
  const [showMenu, setShowMenu] = useState<boolean>(false);
  return (
    <div className="topbar">
      {/* MOBILE */}
      <Image
        src="/logo-horizontal-xs.png"
        alt="AIDNET logo"
        width={100}
        height={25}
        className="xs:hidden"
      />
      <Button variant="no-color" onClick={() => setShowMenu(true)}>
        <MenuBurgerIcon className="xs:hidden" />
      </Button>

      <Menu showMenu={showMenu} toggleMenu={() => setShowMenu(!showMenu)} />

      {/* DESKTOP */}
      <ul
        className={`topbar-links ${
          isSidebarOpen ? "items-start" : "items-center"
        }`}
      >
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
    </div>
  );
}
