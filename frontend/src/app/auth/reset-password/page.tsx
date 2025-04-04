"use client";
import React, { useState } from "react";
import { useFeedback } from "@/context/feedbackContext";
import Toast from "@/components/molecules/toast/Toast";
import { useSession } from "next-auth/react";
import { redirect, useSearchParams } from "next/navigation";
import Loader from "@/components/atoms/loader/Loader";
import ResetPasswordForm from "@/components/organisms/forms/ResetPasswordForm/ResetPasswordForm";
import "../auth.scss";

export default function ResetPasswordView() {
  const { data: session, status } = useSession();
  const { toast, showToast, resetToast } = useFeedback();
  const searchParams = useSearchParams();
  const [resetPasswordLoading, setResetPasswordLoading] = useState<boolean>(false);

  const email = searchParams.get("email")!;
  const token = searchParams.get("token")!;

  const onError = (message: string) => {
    console.log("onError was triggered");
    showToast(
      "error",
      "Reset Password Error",
      message || "Something happened when resetting the password"
    );
  };

  const onFormSubmit = async (data: any) => {
    setResetPasswordLoading(true);
    try {
      console.log(data);
      data.email = email;
      data.resetPasswordToken = token;
      const res = await fetch("/api/auth/reset-password", {
        method: "POST",
        body: JSON.stringify(data),
      });
      const response = await res.json();
      console.log("response", response);
      if (response.success) {
        console.log("response", response);
        showToast(
          "success",
          "Password Changed Successfully",
          "Password was changed correctly. Log in again."
        );
      } else {
        console.log("Entering the 'catch'");
        onError(response.message);
      }
    } catch (error) {
      onError("An unexpected error occurred. Please try again.");
    } finally {
      setResetPasswordLoading(false);
    }
  };

  if (status === "loading" || resetPasswordLoading) {
    return <Loader view="auth" />;
  }

  if (session) {
    redirect("/");
  }

  return (
    <>
      <Toast
        variant={toast.variant}
        content={toast.content}
        showToast={toast.showToast}
        onClose={resetToast}
      />
      <h1 className="text-3xl	text-black-primary">RESET PASSWORD</h1>
      <ResetPasswordForm
        email={email}
        token={token}
        onFormSubmit={onFormSubmit}
      />
    </>
  );
}
