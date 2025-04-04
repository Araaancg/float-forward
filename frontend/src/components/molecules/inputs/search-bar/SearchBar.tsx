"use client";
import React, { InputHTMLAttributes, useCallback, useEffect, useState } from "react";
import "./search-bar.scss";
import XMarkIcon from "@/components/atoms/icons/XMarkIcon";
import MagnifyingGlassIcon from "@/components/atoms/icons/MagnifyingGlassIcon";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  onSearchClick: (inputValue: string) => void;
  width?: string;
  label?: string;
  helperText?: string;
  initialValue?: string; // New prop to set initial value
}

export default function SearchBar({
  onSearchClick,
  width,
  label,
  helperText,
  initialValue = "", // Default empty string if no initial value
  ...inputProps
}: Props) {
  const [inputValue, setInputValue] = useState(initialValue);

  useEffect(() => {
    // Update input value if the initialValue prop changes
    setInputValue(initialValue);
  }, [initialValue]);

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setInputValue(newValue);
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      onSearchClick(inputValue);
    }
  };

  const clearSearch = () => {
    setInputValue("");
    onSearchClick(""); // Trigger search with empty input to clear URL param
  };

  return (
    <div className={`${width ? width : "w-full"}`}>
      {label && <p className="search-bar-label">{label}</p>}
      <div className="search-bar-container relative transition-all py-3 px-4 w-full">
        <button type="button" onClick={() => onSearchClick(inputValue)}>
          <MagnifyingGlassIcon />
        </button>
        <input
          {...inputProps}
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}  // Handle Enter key
          className="transition-all"
        />
        {inputValue && (
          <button type="button" onClick={clearSearch}>
            <XMarkIcon size={16}/>
          </button>
        )}
      </div>
      {helperText && <p className="search-bar-helper-text">{helperText}</p>}
    </div>
  );
}
