"use client";
import TextField from "@/components/molecules/inputs/text-field/TextField";
import { useForm } from "react-hook-form";
import Button from "@/components/atoms/button/Button";
import { yupResolver } from "@hookform/resolvers/yup";
import { schema } from "./register-schema";
import { signIn } from "next-auth/react";
// import { useRouter } from "next/navigation";

export default function RegisterForm() {
  // const router = useRouter()

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
  }) => {
    await signIn("credentials", {
      email: data.email,
      password: data.password,
      confirmPassword: data.confirmPassword,
      name: data.name,
      isRegistering: true,
      redirectTo: "/",
    });
  
    // if (result?.error) {
    //   // Handle error
    //   console.error(result.error);
    // } else {
    //   // Redirect or handle success
    //   router.push('/');
    // }
  };

  return (
    <form
      className="w-full flex flex-col gap-4"
      onSubmit={handleSubmit(handleRegister)}
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
