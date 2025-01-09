"use client";
import React, { useState } from "react";
import Sidebar from "@/components/molecules/navigation/sidebar/SideBar";
import Topbar from "@/components/molecules/navigation/topbar/TopBar";
import { useSession } from "next-auth/react";

export default function Providers({ children }: { children: React.ReactNode }) {
  const [expandSidebar, setExpandSidebar] = useState<boolean>(true);

  const { data: session, status } = useSession();

  return (
    <main className="flex flex-row w-screen">
      <Sidebar
        isExpanded={expandSidebar}
        toggleExpansion={() => setExpandSidebar(!expandSidebar)}
        isLoggedIn={status === "authenticated"}
        user={session?.user}
      />
      <div className={`sidebar-${expandSidebar ? "expanded" : "collapsed"}`}>
        <Topbar isSidebarOpen={expandSidebar} isLoggedIn={status === "authenticated"}/>
        {children}
      </div>
    </main>
  );
}
