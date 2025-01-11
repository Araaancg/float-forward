"use client";
import TextField from "@/components/molecules/inputs/text-field/TextField";
import { useForm } from "react-hook-form";
import Button from "@/components/atoms/button/Button";
import { yupResolver } from "@hookform/resolvers/yup";
import { schema } from "./offer-help-schema";

export default function OfferOwnHelpForm() {
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
    console.log(data);
    // const res = await fetch("/api/auth/login", {
    //   method: "POST",
    //   body: JSON.stringify(data),
    // });
    // const response = await res.json();
    // reset();
  };

  return (
    <form
      className="w-full flex flex-col gap-4 max-w-[800px]"
      onSubmit={handleSubmit(sendData)}
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
        name="email"
        type="email"
        placeholder="Your email"
        label="Email"
      />
      <TextField
        register={register}
        errors={errors}
        name="email"
        type="email"
        placeholder="Your email"
        label="Email"
      />
      <Button isFullWidth disabled={!isValid} type="submit">
        Submit help pin
      </Button>
    </form>
  );
}
