"use client";
import React, { useState } from "react";
import Sidebar from "@/components/molecules/navigation/sidebar/SideBar";
import Topbar from "@/components/molecules/navigation/topbar/TopBar";

export default function Providers({ children }: { children: React.ReactNode }) {
  const [expandSidebar, setExpandSidebar] = useState<boolean>(true);

  return (
    <main className="flex flex-row w-screen">
      <Sidebar
        isExpanded={expandSidebar}
        toggleExpansion={() => setExpandSidebar(!expandSidebar)}
      />
      <div className={`sidebar-${expandSidebar ? "expanded" : "collapsed"}`}>
        <Topbar isSidebarOpen={expandSidebar} />
        {children}
      </div>
    </main>
  );
}
