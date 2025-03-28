"use client";
import React, { useEffect, useMemo, useState } from "react";
import Sidebar from "@/components/molecules/navigation/sidebar/SideBar";
import Topbar from "@/components/molecules/navigation/topbar/TopBar";
import { useSession } from "next-auth/react";
import { useData } from "@/utils/hooks/useData";
import Footer from "@/components/molecules/footer/Footer";

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

  const {
    data: unreadMessages,
    loading,
    error,
  } = useData<{
    success: Boolean;
    data: {
      totalUnreadCount: number;
      unreadMessagesByChat: { [key: string]: number };
    };
  }>(
    "/api/chat/unread-messages",
    {
      method: "GET",
      requiresAuth: true,
    },
    session
  );

  const isLoggedIn = useMemo(() => status === "authenticated", [session]);

  return (
    <div>
      <main className="flex flex-row w-screen">
        {status === "authenticated" && (
          <Sidebar
            isExpanded={expandSidebar}
            toggleExpansion={toggleExpansion}
            isLoggedIn={isLoggedIn}
            user={session?.user}
            unreadMessages={unreadMessages?.data}
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
            unreadMessages={unreadMessages?.data}
          />
          {children}
        </div>
      </main>
      {/* <Footer /> */}
    </div>
  );
}
