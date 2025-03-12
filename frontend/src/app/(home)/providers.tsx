"use client";
import React, { useEffect, useMemo, useState } from "react";
import Sidebar from "@/components/molecules/navigation/sidebar/SideBar";
import Topbar from "@/components/molecules/navigation/topbar/TopBar";
import { useSession } from "next-auth/react";

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

  return (
    <main className="flex flex-row w-screen">
      <Sidebar
        isExpanded={expandSidebar}
        toggleExpansion={toggleExpansion}
        isLoggedIn={status === "authenticated"}
        user={session?.user}
      />
      <div
        className={`sidebar-${
          expandSidebar ? "expanded" : "collapsed"
        } h-screen overflow-y-auto`}
      >
        <Topbar
          isSidebarOpen={expandSidebar}
          isLoggedIn={status === "authenticated"}
        />
        {children}
      </div>
    </main>
  );
}
