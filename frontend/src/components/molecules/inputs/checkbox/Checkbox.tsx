"use client";
import { UseFormRegister, FieldValues } from "react-hook-form";
import "./checkbox.scss";

interface ICheckbox
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "name"> {
  label: string;
  name: string;
  register: UseFormRegister<FieldValues>;
}
export default function Checkbox({
  label,
  name,
  register,
  className,
  ...inputProps
}: ICheckbox) {
  return (
    <label className="checkbox-container">
      <input
        type="checkbox"
        {...inputProps}
        {...register(name)}
      />
      <span className={`checkmark ${className || ""}`.trim()} />
      {label}
    </label>
  );
}