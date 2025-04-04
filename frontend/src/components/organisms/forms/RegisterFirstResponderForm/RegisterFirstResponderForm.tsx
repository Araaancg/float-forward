"use client";
import TextField from "@/components/molecules/inputs/text-field/TextField";
import { useForm } from "react-hook-form";
import Button from "@/components/atoms/button/Button";
import { yupResolver } from "@hookform/resolvers/yup";
import { schema } from "./register-fr-schema";
import { useApi } from "@/utils/hooks/useApi";
import { UserRoles } from "@/types/enums";
import DragAndDrop from "@/components/molecules/inputs/drag-and-drop/DragAndDrop";

export default function RegisterFirstResponderForm({
  showToast,
  session,
}: {
  showToast: (
    type: "error" | "success",
    title: string,
    message: string
  ) => void;
  session: any;
}) {
  const { callApi } = useApi(session);

  const {
    register,
    reset,
    handleSubmit,
    setValue,
    getValues,
    control,
    formState: { errors, isValid },
  } = useForm<any>({
    mode: "all",
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: any) => {
    try {
      console.log("data", data);
      if (session.user.role === UserRoles.FIRST_RESPONDER) {
        showToast(
          "error",
          "You are already a first responder",
          "You already have a 'first responder' role. Please don't fill the form again"
        );
      } else if (!data.credentials) {
        showToast(
          "error",
          "Missing file",
          "Please upload your credentials so we can verify that you are a first responder."
        );
      } else {

        const formData = new FormData();
        formData.append("name", data.name);
        formData.append("organization", data.organization);
        formData.append("role", data.role);
        // if (data.credentials) {
          formData.append("pdfFile", data.credentials); // Append the file
        // }

        const response = await callApi("/api/first-responder", {
          method: "POST",
          requiresAuth: true,
          body: formData, // Send FormData
        });

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
            response.message ||
              "Something happened when sending registering for the 'first responder' role"
          );
        }
      }
      reset();
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
        name="organization"
        type="text"
        placeholder="The organization that issued the credentials"
        label="Organization"
      />
      <TextField
        register={register}
        errors={errors}
        name="role"
        type="text"
        placeholder="The role you currently have"
        label="Role"
      />
      <DragAndDrop
        setValue={setValue}
        getValues={getValues}
        name={"credentials"}
        control={control}
        showToast={showToast}
      />
      <Button isFullWidth disabled={!isValid} type="submit">
        Submit
      </Button>
    </form>
  );
}
