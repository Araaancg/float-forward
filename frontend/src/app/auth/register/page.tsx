"use client";
import React from "react";
import Button from "@/components/atoms/button/Button";
import GoogleIcon from "@/components/atoms/icons/GoogleIcon";
import RegisterForm from "@/components/organisms/forms/RegisterForm/RegisterForm";
import { useFeedback } from "@/context/feedbackContext";
import Toast from "@/components/molecules/toast/Toast";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import Loader from "@/components/atoms/loader/Loader";
import "../auth.scss";

export default function RegisterView() {
  const { data: session, status } = useSession();
  const { toast, showToast, resetToast } = useFeedback();

  const onError = (message: string) => {
    console.log("onError was triggered");
    showToast(
      "error",
      "Authentication Error",
      message || "Something happened when authenticating"
    );
  };

  if (status === "loading") {
    return <Loader view="auth"/>;
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
      <h1 className="text-3xl	text-black-primary">REGISTER</h1>
      <RegisterForm onError={onError} />
      <hr className="border border-solid border-green-primary w-11/12" />
      <Button variant="secondary" isFullWidth>
        <GoogleIcon /> Register with Google
      </Button>
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
