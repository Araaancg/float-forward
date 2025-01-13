"use client";
import React, { useState, useEffect, useRef } from "react";
import "./tabs.scss";
import useTabParams from "@/utils/hooks/useTabsParams";

interface ITabs {
  options: string[];
  paramKey?: string; // The key to use in the URL for the tab
  className?: string;
  onTabChange?: (tabIndex: number) => void;  // Optional callback to send the selected tab to parent
}

export default function Tabs({ options, paramKey = "tab", className, onTabChange }: ITabs) {
  const { selectedTab, onTabClick } = useTabParams(paramKey); // Use the custom hook

  const [indicatorStyle, setIndicatorStyle] = useState({});
  const tabRefs = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const currentTab = tabRefs.current[selectedTab];
    if (currentTab) {
      setIndicatorStyle({
        width: currentTab.offsetWidth,
        left: currentTab.offsetLeft,
      });
    }
  }, [selectedTab]);

  // Notify parent when tab changes
  useEffect(() => {
    if (onTabChange) {
      onTabChange(selectedTab);
    }
  }, [selectedTab, onTabChange]);

  return (
    <div className={`tabs ${className}`}>
      <div className="tabs-container">
        {options.map((option, index) => (
          <div
            key={index}
            ref={(el) => {
              tabRefs.current[index] = el as HTMLDivElement;
            }}
            onClick={() => onTabClick(index)} // Use the tab click handler from the custom hook
            className={`tab ${selectedTab === index ? "active" : ""}`}
          >
            <span>{option}</span>
          </div>
        ))}
        <div className="tabs-indicator" style={indicatorStyle} />
      </div>
    </div>
  );
}
