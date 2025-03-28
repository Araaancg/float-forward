"use client";
import TextField from "@/components/molecules/inputs/text-field/TextField";
import { useForm } from "react-hook-form";
import Button from "@/components/atoms/button/Button";
import { yupResolver } from "@hookform/resolvers/yup";
import { schema } from "./register-fr-schema";
import { useApi } from "@/utils/hooks/useApi";
import TextArea from "@/components/molecules/inputs/textarea/TextArea";

export default function RegisterFirstResponderForm({
  showToast,
}: {
  showToast: (type: "error" | "success", title: string, message: string) => void
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

  const onSubmit = async (data: any) => {
    try {
      const response = await callApi("/api/contact-us", {
        method: "POST",
        body: data,
      });
      console.log("RESPONSE", response);
      if (response.success) {
        showToast(
          "success",
          "Registration ended successfully",
          "Please now wait until one of our staff members revises your information. You will receive an update soon."
        );
      } else {
        console.log("Entering the 'catch'");
        showToast(
          "error",
          "Internal Server Error",
          response.message || "Something happened when sending registering for the 'first responder' role"
        );
      }
    } catch (error) {
      showToast(
        "error",
        "Internal Server Error",
        "An unexpected error occurred. Please try again."
      );
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
      <TextArea
        register={register}
        errors={errors}
        name="message"
        placeholder="Your message"
        label="Message"
      />
      <Button isFullWidth disabled={!isValid} type="submit">
        Submit
      </Button>
    </form>
  );
}
