"use client";
import React from "react";
import { useForm } from "react-hook-form";
import TextField from "@/components/molecules/inputs/text-field/TextField";
import Button from "@/components/atoms/button/Button";

interface LoginFormData {
  email: string;
  password: string;
  provider?: string;
}

export default function LoginForm({
  onFormSubmit,
}: {
  onFormSubmit: (data: any) => void;
}) {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<LoginFormData>();

  return (
    <form
      className="w-full flex flex-col gap-4"
      onSubmit={handleSubmit(onFormSubmit)}
    >
      <TextField
        register={register}
        errors={errors}
        name="email"
        type="email"
        placeholder="Your email"
        label="Email"
      />
      <TextField
        register={register}
        errors={errors}
        name="password"
        type="password"
        placeholder="Your password"
        label="Passwrod"
      />
      <Button variant="no-color" color="green" isLink linkProps={{href: "/auth/forgot-password"}}>
        Forgot password?
      </Button>
      <Button isFullWidth type="submit" disabled={!isValid}>
        Login
      </Button>
    </form>
  );
}
