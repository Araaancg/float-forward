"use client";
import React, { useCallback, useEffect, useState } from "react";
import Button from "@/components/atoms/button/Button";
import XMarkIcon from "@/components/atoms/icons/XMarkIcon";
import ExclamationMarkIcon from "@/components/atoms/icons/ExclamationMarkIcon";
import theme from "@/theme";
import CheckCircleIcon from "@/components/atoms/icons/CheckCircleIcon";
import "./Toast.scss";

export default function Toast ({
  variant,
  content,
  showToast,
  onClose,
}: {
  variant: "success" | "error" ;
  content: { title: string; description: string };
  showToast: boolean;
  onClose?: () => void;
}) {


  const [isVisible, setIsVisible] = useState(showToast);

  const handleClose = useCallback(() => {
    setIsVisible(false);
    if (onClose) {
      onClose();
    }
  }, [onClose]);

  useEffect(() => {
    if (showToast) {
      setIsVisible(true);
      const timer = setTimeout(() => {
        handleClose();
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [handleClose, showToast]);

  return (
    <div className={`toast z-50 max-w-xl items-center gap-4 rounded-3xl p-4 ${variant} ${isVisible ? "show" : "not-show"}`}>
      {variant === "success" && (
        <CheckCircleIcon color={theme.extend.colors.green.primary} />
      )}
      {variant === "error" && (
        <ExclamationMarkIcon color={theme.extend.colors.error} />
      )}
      <div className="flex flex-col gap-1">
        <h5 className="title-s font-bold">{content.title}</h5>
        <p className="body-s">{content.description}</p>
      </div>

      <Button
        type="button"
        variant="no-color"
        onClick={handleClose}
      >
        <XMarkIcon />
      </Button>
    </div>
  );
};