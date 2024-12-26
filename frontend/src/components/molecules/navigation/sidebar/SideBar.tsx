"use client";
import Image from "next/image";
import ChatIcon from "@/components/atoms/icons/ChatIcon";
import NotificationIcon from "@/components/atoms/icons/NotificationIcon";
import SettingsIcon from "@/components/atoms/icons/SettingsIcon";
import Avatar from "@/components/atoms/avatar/Avatar";
import MapPinWithBaseIcon from "@/components/atoms/icons/MapPinWithBaseIcon";
import Button from "@/components/atoms/button/Button";
import DoubleCaretIcon from "@/components/atoms/icons/DoubleCaretIcon";
import "./sidebar.scss";

interface ISidebar {
  isExpanded: boolean;
  toggleExpansion: () => void;
}

export default function Sidebar({ isExpanded, toggleExpansion }: ISidebar) {
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
            <Button variant="no-color" onClick={toggleExpansion}>
              <DoubleCaretIcon orientation={isExpanded ? "left" : "right"} />
            </Button>
          </div>
          <div>
            <Button variant="no-color" isLink>
              {isExpanded ? (
                <Image
                  src="/logo-horizontal.png"
                  alt="AIDNET logo horizontal"
                  width={134}
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
          <li>
            <Button isLink variant="no-color">
              <ChatIcon size={32} />
              {isExpanded && "Chat"}
            </Button>
          </li>
          <li>
            <Button isLink variant="no-color">
              <MapPinWithBaseIcon size={32} />
              {isExpanded && "My pins"}
            </Button>
          </li>
          <li>
            <Button isLink variant="no-color">
              <ChatIcon size={32} />
              {isExpanded && "My requests"}
            </Button>
          </li>
          <li>
            <Button isLink variant="no-color">
              <ChatIcon size={32} />
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
            <Button variant="no-color" isLink>
              <NotificationIcon size={32} />
              {isExpanded && "Notifications"}
            </Button>
          </li>
          <li className={isExpanded ? "pl-2.5" : ""}>
            <Button variant="no-color" isLink>
              <SettingsIcon size={32} />
              {isExpanded && "Settings"}
            </Button>
          </li>
          <li>
            <Avatar />
            {isExpanded && (
              <span className="text-base text-black-primary font-normal">
                First and Last name
                <br />
                <span className="text-xs">thisisanemail@gmail.com</span>
              </span>
            )}
          </li>
        </ul>
      </div>
    </aside>
  );
}
