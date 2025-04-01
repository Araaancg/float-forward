import { useState } from "react";
import Image from "next/image";
import Button from "@/components/atoms/button/Button";
import MenuBurgerIcon from "@/components/atoms/icons/MenuHamburgerIcon";
import Menu from "../menu/Menu";
import "./topbar.scss";
import { IUser } from "@/types/structures";
import { signOut, useSession } from "next-auth/react";
import useOutsideClick from "@/utils/hooks/useOutsideClick";

export default function Topbar({
  isSidebarOpen,
  isLoggedIn,
  user,
  unreadMessages,
}: {
  isSidebarOpen: boolean;
  isLoggedIn: boolean;
  user?: IUser;
  unreadMessages?: {
    totalUnreadCount: number;
    unreadMessagesByChat: { [key: string]: number };
  };
}) {
  const [showMenu, setShowMenu] = useState<boolean>(false);
  const { data: session } = useSession();
  return (
    <div className={`topbar ${isLoggedIn ? "":"sm:justify-end"}`}>
      {/* MOBILE */}
      <Button variant="no-color" isLink linkProps={{ href: "/" }}>
        <Image
          src="/logo-s.png"
          alt="AIDNET logo"
          width={200}
          height={25}
          className={isLoggedIn ? "sm:hidden":""}
        />
      </Button>
      <Button variant="no-color" onClick={() => setShowMenu(true)}>
        <MenuBurgerIcon className="sm:hidden" />
      </Button>

      <Menu
        showMenu={showMenu}
        toggleMenu={() => setShowMenu(!showMenu)}
        isLoggedIn={isLoggedIn}
        session={session}
        signOut={signOut}
        unreadMessages={unreadMessages}
      />

      {/* DESKTOP */}

      <ul
        className={`topbar-links ${
          isSidebarOpen ? "items-start" : "items-center"
        }`}
      >
        <li>
          <Button isLink variant="no-color" color="black" linkProps={{href: "/#help"}}>
            Help
          </Button>
        </li>
        <li>
          <Button isLink variant="no-color" color="black" linkProps={{href: "/#contact-us"}}>
            Contact Us
          </Button>
        </li>
        {session ? (
          <li>
            <Button variant="no-color" color="black" onClick={() => signOut()}>
              Log out
            </Button>
          </li>
        ) : (
          <>
            <li>
              <Button
                variant="primary"
                color="green"
                isLink
                linkProps={{href: "/auth/login"}}
                className="w-[210px]"
              >
                Log in
              </Button>
            </li>
            <li>
              <Button
                variant="secondary"
                color="green"
                isLink
                linkProps={{href: "/auth/login"}}
                className="w-[210px]"
              >
                Register
              </Button>
            </li>
          </>
        )}
      </ul>
    </div>
  );
}
