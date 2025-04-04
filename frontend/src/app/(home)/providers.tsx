"use client";
import React, { useEffect, useMemo, useState } from "react";
import Sidebar from "@/components/molecules/navigation/sidebar/SideBar";
import Topbar from "@/components/molecules/navigation/topbar/TopBar";
import { useSession } from "next-auth/react";
import { SocketProvider } from "@/context/socketContext";

export default function Providers({ children }: { children: React.ReactNode }) {
  const [expandSidebar, setExpandSidebar] = useState<boolean>(true);

  const { data: session, status } = useSession();

  useEffect(() => {
    const savedSidebarState = localStorage.getItem("sidebar-expanded");
    if (savedSidebarState !== null) {
      setExpandSidebar(JSON.parse(savedSidebarState));
    }
  }, []);

  const toggleExpansion = () => {
    setExpandSidebar(!expandSidebar);
    localStorage.setItem("sidebar-expanded", JSON.stringify(!expandSidebar));
  };

  const isLoggedIn = useMemo(() => status === "authenticated", [session]);

  return (
    <SocketProvider userId={session ? session.user._id : ""}>
      <div>
        <main className="flex flex-row w-screen">
          {status === "authenticated" && (
            <Sidebar
              isExpanded={expandSidebar}
              toggleExpansion={toggleExpansion}
              isLoggedIn={isLoggedIn}
              user={session?.user}
              // unreadMessages={unreadMessages}
            />
          )}
          <div
            className={`${
              isLoggedIn
                ? `sidebar-${expandSidebar ? "expanded" : "collapsed"}`
                : "sidebar-null"
            } h-screen overflow-y-auto`}
          >
            <Topbar
              isSidebarOpen={expandSidebar}
              isLoggedIn={isLoggedIn}
              // unreadMessages={unreadMessages?.data}
            />
            {children}
          </div>
        </main>
        {/* <Footer /> */}
      </div>
    </SocketProvider>
  );
}
