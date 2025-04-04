"use client";
import React, { InputHTMLAttributes, useState } from "react";
import { FieldErrors, UseFormRegister } from "react-hook-form";
import VisibilityIcon from "@/components/atoms/icons/VisibilityIcon";
import ExclamationMarkIcon from "@/components/atoms/icons/ExclamationMarkIcon";
import "./text-field.scss";
import InformationIcon from "@/components/atoms/icons/InformationIcon";

type TextFieldType = "text" | "email" | "password";

export interface TextfieldProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "type"> {
  type?: TextFieldType;
  label?: string;
  iconStart?: React.ReactNode;
  iconEnd?: React.ReactNode;
  isFullWidth?: boolean;
  register: UseFormRegister<any>;
  errors: FieldErrors<any>;
  name: string;
  helperText?: string;
}

export default function TextField({
  label,
  type = "text",
  iconStart,
  iconEnd,
  isFullWidth = true,
  register,
  errors,
  name,
  helperText,
  ...inputProps
}: TextfieldProps) {
  const [showPassword, setShowPassword] = useState(false);

  const togglePassword = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setShowPassword(!showPassword);
  };

  return (
    <div className={`textfield-container ${isFullWidth && "w-full"}`}>
      {label && (
        <label>
          <h5
            className={`font-semibold ${
              errors[name] != null && "text-error-500"
            }`}
          >
            {label}
          </h5>
        </label>
      )}
      <div
        className={`textfield-container-input ${
          errors[name] != null && "invalid"
        }`}
      >
        {iconStart && <div className="pl-4">{iconStart}</div>}

        <input
          {...register!(name)}
          type={type === "password" && showPassword ? "text" : type}
          {...inputProps}
        />

        {type === "password" ? (
          <button
            type="button"
            onClick={togglePassword}
            className="px-4 bg-transparent border-none"
          >
            <VisibilityIcon visible={showPassword} />
          </button>
        ) : errors[name] != null ? (
          <div className="px-4">
            <ExclamationMarkIcon />
          </div>
        ) : (
          iconEnd && <div className="pr-4">{iconEnd}</div>
        )}
      </div>
      {errors[name] != null && (
        <div className="flex gap-1 items-center">
          <ExclamationMarkIcon size={16}/>
          <p className="helper-text text-xs">{errors[name]?.message!.toString()}</p>
        </div>
      )}
      {errors[name] == null && helperText && (
        <div className="flex gap-1 items-center">
          <InformationIcon size={16}/>
          <p className="helper-text text-xs">{helperText.toString()}</p>
        </div>
      )}
    </div>
  );
}
