"use client"
import React, { useState, useEffect, useRef } from "react"
import "./tabs.scss"

interface ITabs {
  options: string[]
  selectedTab: number
  onClick: (index: number) => void,
  className?: string
}

export default function Tabs({ options, selectedTab, onClick, className }: ITabs) {
  const [indicatorStyle, setIndicatorStyle] = useState({})
  const tabRefs = useRef<HTMLDivElement[]>([])

  useEffect(() => {
    const currentTab = tabRefs.current[selectedTab]
    if (currentTab) {
      setIndicatorStyle({
        width: currentTab.offsetWidth,
        left: currentTab.offsetLeft,
      })
    }
  }, [selectedTab])

  return (
    <div className={`tabs ${className}`}>
      <div className="tabs-container">
        {options.map((option, index) => (
          <div
            key={index}
            ref={(el) => {
              tabRefs.current[index] = el as HTMLDivElement
            }}
            onClick={() => onClick(index)}
            className={`tab ${selectedTab === index ? "active" : ""}`}
          >
            <span>{option}</span>
          </div>
        ))}
        <div className="tabs-indicator" style={indicatorStyle} />
      </div>
    </div>
  )
}