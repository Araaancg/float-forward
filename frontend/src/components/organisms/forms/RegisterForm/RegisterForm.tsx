"use client";
import TextField from "@/components/molecules/inputs/text-field/TextField";
import { useForm } from "react-hook-form";
import Button from "@/components/atoms/button/Button";
import { yupResolver } from "@hookform/resolvers/yup";
import { schema } from "./register-schema";
import { signIn } from "next-auth/react";
import { useApi } from "@/utils/hooks/useApi";
// import { useRouter } from "next/navigation";

export default function RegisterForm({
  onError,
}: {
  onError: (message: string) => void;
}) {
  const { callApi } = useApi();

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<any>({
    mode: "all",
    resolver: yupResolver(schema),
  });

  const handleRegister = async (data: {
    email: string;
    password: string;
    confirmPassword: string;
    name: string;
  }) => {};

  const onSubmit = async (data: any) => {
    try {
      const response = await callApi("/api/customAuth/register", {
        method: "POST",
        body: data,
      });
      console.log("RESPONSE", response);
      if (response.success) {
        console.log("data", data);
        // if success is true, then sign in with next-auth
        const result = await signIn("credentials", {
          email: data.email,
          password: data.password,
          confirmPassword: data.confirmPassword,
          name: data.name,
          isRegistering: true,
          redirectTo: "/",
        });
        console.log("Resultado signin credentials", result);
      } else {
        console.log("Entering the 'catch'");
        onError(response.message);
      }
    } catch (error) {
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
        name="name"
        type="text"
        placeholder="Your username"
        label="Name"
      />
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
        label="Password"
      />
      <TextField
        register={register}
        errors={errors}
        name="confirmPassword"
        type="password"
        placeholder="Your password"
        label="Password"
      />
      <Button isFullWidth disabled={!isValid} type="submit">
        Register
      </Button>
    </form>
  );
}
