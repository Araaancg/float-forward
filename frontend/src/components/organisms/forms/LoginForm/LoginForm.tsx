"use client";
import TextField from "@/components/molecules/inputs/text-field/TextField";
import { useForm } from "react-hook-form";
import Button from "@/components/atoms/button/Button";
import { yupResolver } from "@hookform/resolvers/yup";
import { schema } from "./login-schema";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function LoginForm() {
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<any>({
    mode: "all",
    resolver: yupResolver(schema),
  });

  const handleLogin = async (data: { email: string; password: string }) => {
    await signIn("credentials", {
      email: data.email,
      password: data.password,
      redirectTo: "/",
    });
  };

  return (
    <form
      className="w-full flex flex-col gap-4"
      onSubmit={handleSubmit(handleLogin)}
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
