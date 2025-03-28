"use client";
import Image from "next/image";
import ChatIcon from "@/components/atoms/icons/ChatIcon";
import SettingsIcon from "@/components/atoms/icons/SettingsIcon";
import Avatar from "@/components/atoms/avatar/Avatar";
import MapPinWithBaseIcon from "@/components/atoms/icons/MapPinWithBaseIcon";
import Button from "@/components/atoms/button/Button";
import DoubleCaretIcon from "@/components/atoms/icons/DoubleCaretIcon";
import { IUser } from "@/types/structures";
import HealthcareIcon from "@/components/atoms/icons/HealthcareIcon";
import "./sidebar.scss";

interface ISidebar {
  isExpanded: boolean;
  toggleExpansion: () => void;
  isLoggedIn: boolean;
  user?: IUser;
  unreadMessages?: {
    totalUnreadCount: number;
    unreadMessagesByChat: { [key: string]: number };
  };
}

export default function Sidebar({
  isExpanded,
  toggleExpansion,
  isLoggedIn,
  user,
  unreadMessages,
}: ISidebar) {
  return (
    <aside className={`sidebar ${isExpanded ? "open" : "close"}`}>
          {/* TOP PART */}
          <div className="sidebar-top">
            <div className={`w-full flex flex-col gap-6`}>
              {/* INTRO */}
              <div
                className={`w-full flex items-center ${
                  isExpanded ? "justify-end" : "justify-center"
                }`}
              >
                <Button
                  variant="no-color"
                  color="black"
                  onClick={toggleExpansion}
                >
                  <DoubleCaretIcon
                    size={28}
                    orientation={isExpanded ? "left" : "right"}
                  />
                </Button>
              </div>
              <div>
                <Button
                  variant="no-color"
                  color="black"
                  isLink
                  linkProps={{ href: "/" }}
                >
                  {isExpanded ? (
                    <Image
                      src="/logo-s.png"
                      alt="AIDNET logo horizontal"
                      width={200}
                      height={38}
                    />
                  ) : (
                    <Image
                      src="/logo-symbol.png"
                      alt="AIDNET symbol"
                      width={56}
                      height={38}
                    />
                  )}
                </Button>
              </div>
            </div>

            {/* LINKS TO USER'S THINGS IN THE PLATFORM */}

            <ul
              className={`sidebar-top-links ${
                isExpanded ? "items-start" : "items-center"
              }`}
            >
              <li className="inline relative">
                <Button
                  isLink
                  variant="no-color"
                  color="black"
                  linkProps={{ href: "/chat" }}
                >
                  <ChatIcon size={32} />
                  {isExpanded && "Chat"}
                </Button>
                {
                  unreadMessages?.totalUnreadCount! > 0 && (
                    <span className="sidebar-unreadMsgs">
                      {unreadMessages?.totalUnreadCount}
                    </span>
                  )}
              </li>
              <li>
                <Button isLink variant="no-color" color="black" linkProps={{ href: "/my-pins" }}>
                  <MapPinWithBaseIcon size={32} />
                  {isExpanded && "My pins"}
                </Button>
              </li>
              <li>
                <Button isLink variant="no-color" color="black" linkProps={{href: "/first-responder"}}>
                  <HealthcareIcon size={32} />
                  {isExpanded && "I am a first responder"}
                </Button>
              </li>
            </ul>
          </div>

          <div className="sidebar-bottom">
            <hr className="border border-solid border-green-primary" />

            {/* LINKS TO SETTINGS AND ACCOUNT */}
            <ul
              className={`sidebar-bottom-links ${
                isExpanded ? "items-start" : "items-center"
              }`}
            >
              <li className={isExpanded ? "pl-2.5" : ""}>
                <Button variant="no-color" color="black" isLink>
                  <SettingsIcon size={32} />
                  {isExpanded && "Settings"}
                </Button>
              </li>
              <li>
                <Avatar imageSrc={user?.profilePicture!} />
                {isExpanded && (
                  <span className="text-base text-black-primary font-normal">
                    {user?.name?.slice(0, 20)}
                    <br />
                    <span className="text-xs">{user?.email?.slice(0, 25)}...</span>
                  </span>
                )}
              </li>
            </ul>
          </div>
    </aside>
  );
}
