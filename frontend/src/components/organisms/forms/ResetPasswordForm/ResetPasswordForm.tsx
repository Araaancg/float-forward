"use client";
import TextField from "@/components/molecules/inputs/text-field/TextField";
import { useForm } from "react-hook-form";
import Button from "@/components/atoms/button/Button";
import { yupResolver } from "@hookform/resolvers/yup";
import { schema } from "./reset-password-form";

export default function ResetPasswordForm({
  email,
  token,
  onFormSubmit
}: {
  email: string;
  token: string;
  onFormSubmit: (data: any) => void
}) {
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<any>({
    mode: "all",
    resolver: yupResolver(schema),
  });

  const sendData = async (data: any) => {
    onFormSubmit(data)
    reset();
  };

  return (
    <form
      className="w-full flex flex-col gap-4"
      onSubmit={handleSubmit(sendData)}
    >
      <TextField
        register={register}
        errors={errors}
        name="password"
        type="password"
        placeholder="New password"
        label="New Password"
      />
      <TextField
        register={register}
        errors={errors}
        name="confirmPassword"
        type="password"
        placeholder="Confirm new password"
        label="Confirm New Password"
      />
      <Button isFullWidth disabled={!isValid} type="submit">
        Reset Password
      </Button>
    </form>
  );
}
