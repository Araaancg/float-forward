"use client";
import XMarkIcon from "@/components/atoms/icons/XMarkIcon";
import React, { forwardRef, ForwardedRef } from "react";
import "./modal.scss";

interface IModal {
  onClose: () => void;
  isOpen: boolean;
  children: React.ReactNode;
  title?: string;
  className?: string;
}

const Modal = forwardRef<HTMLDivElement, IModal>(
  (
    { title, onClose, children, isOpen, className }: IModal,
    ref: ForwardedRef<HTMLDivElement>
  ) => {
    const showClass = isOpen ? "flex" : "hidden";

    return (
      <div className={`modal ${showClass}`}>
        <div className={`modal-container ${className}`} ref={ref}>
          <div className="flex justify-between items-center w-full mb-4">
            {title && <h5 className="text-2xl font-bold">{title}</h5>}
            <button type="button" onClick={onClose}>
              <XMarkIcon />
            </button>
          </div>
          {children}
        </div>
      </div>
    );
  }
);
Modal.displayName = "Modal";

export default Modal;