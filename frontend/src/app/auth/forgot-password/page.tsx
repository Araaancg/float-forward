"use client";
import React, { useState } from "react";
import { useFeedback } from "@/context/feedbackContext";
import Toast from "@/components/molecules/toast/Toast";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import Loader from "@/components/atoms/loader/Loader";
import ForgotPasswordForm from "@/components/organisms/forms/ForgotPasswordForm/ForgotPasswordForm";
import "../auth.scss";

export default function ForgotPasswordView() {
  const { data: session, status } = useSession();
  const { toast, showToast, resetToast } = useFeedback();
  const [forgotPasswordLoading, setForgotPasswordLoading] = useState<boolean>(false)

  const onError = (message: string) => {
    console.log("onError was triggered");
    showToast(
      "error",
      "Authentication Error",
      message || "Something happened when authenticating"
    );
  };

  const onFormSubmit = async (data: any) => {
    setForgotPasswordLoading(true);
    try {
      console.log(data);
      const res = await fetch("/api/auth/forgot-password", {
        method: "POST",
        body: JSON.stringify(data),
      });
      const response = await res.json();
      console.log("response", response);
      if (response.success) {
        console.log("response", response);
        showToast(
          "success",
          "Reset Email Sent",
          "Reset email was sent. If you can't see it please check spam."
        );
      } else {
        console.log("Entering the 'catch'");
        onError(response.message);
      }
    } catch (error) {
      onError("An unexpected error occurred. Please try again.");
    } finally {
      setForgotPasswordLoading(false);
    }
  };

  if (status === "loading" || forgotPasswordLoading) {
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
      <h1 className="text-3xl	text-black-primary">FORGOT PASSWORD</h1>
      <ForgotPasswordForm onFormSubmit={onFormSubmit}/>
      <p>
        Already have an account? Log in{" "}
        <a
          href="/auth/login"
          className="text-green-primary hover:underline cursor-pointer"
        >
          here
        </a>
      </p>
    </>
  );
}
