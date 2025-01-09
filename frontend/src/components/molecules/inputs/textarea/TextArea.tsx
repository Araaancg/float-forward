import React, { InputHTMLAttributes, useState } from "react";
import { FieldErrors, UseFormRegister } from "react-hook-form";
import ExclamationMarkIcon from "@/components/atoms/icons/ExclamationMarkIcon";
import "./textarea.scss";
import InformationIcon from "@/components/atoms/icons/InformationIcon";

export interface TextAreaProps
  extends InputHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  isFullWidth?: boolean;
  register: UseFormRegister<any>;
  errors: FieldErrors<any>;
  name: string;
  helperText?: string;
  resize?: boolean;
}

export default function TextArea({
  label,
  isFullWidth = true,
  resize = true,
  register,
  errors,
  name,
  helperText,
  ...inputProps
}: TextAreaProps) {
  const [textareaHeight, setTextareaHeight] = useState('auto'); 

  const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    event.target.style.height = 'auto';
    event.target.style.height = `${event.target.scrollHeight}px`;
  };

  return (
    <div className={`${isFullWidth && "w-full"} textarea`}>
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
      <textarea
        {...register!(name)}
        className={`textarea-container ${
          resize ? "" : "resize-none"
        } w-full rounded px-3 py-4 outline-none`}
        style={{ height: textareaHeight }}
        {...inputProps}
        onChange={handleInputChange} 
      />
      {errors[name] != null && (
        <div className="flex gap-1 items-center">
          <ExclamationMarkIcon size={16} />
          <p className="helper-text text-xs">{errors[name]?.message!.toString()}</p>
        </div>
      )}
      {errors[name] == null && helperText && (
        <div className="flex gap-1 items-center">
          <InformationIcon size={16} />
          <p className="helper-text text-xs">{helperText.toString()}</p>
        </div>
      )}
    </div>
  );
}