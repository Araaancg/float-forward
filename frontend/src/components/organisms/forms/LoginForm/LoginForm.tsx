"use client";
import React from "react";
import { signIn } from "next-auth/react";
import { useForm } from "react-hook-form";
import TextField from "@/components/molecules/inputs/text-field/TextField";
import Button from "@/components/atoms/button/Button";

interface LoginFormProps {
  onError: (message: string) => void;
}

interface LoginFormData {
  email: string;
  password: string;
}

export default function LoginForm({ onError }: LoginFormProps) {
  const { register, handleSubmit, formState: { errors, isValid } } = useForm<LoginFormData>();

  const onSubmit = async (data: LoginFormData) => {
    try {
      const result = await signIn("credentials", {
        email: data.email,
        password: data.password,
        redirect: false,
      });

      if (result?.error) {
        console.log(result?.error)
        onError(result.error);
      }
    } catch (error) {
      console.log(error)
      onError("An unexpected error occurred. Please try again.");
    }
  };

  return (
    <form
      className="w-full flex flex-col gap-4"
      onSubmit={handleSubmit(onSubmit)}
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
      <Button isFullWidth disabled={!isValid} type="submit">
        Login
      </Button>
    </form>
  );
}
