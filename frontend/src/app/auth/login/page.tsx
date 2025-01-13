"use client";
import React, { useEffect } from "react";
import LoginForm from "@/components/organisms/forms/LoginForm/LoginForm";
import Button from "@/components/atoms/button/Button";
import GoogleIcon from "@/components/atoms/icons/GoogleIcon";
import { signIn, useSession } from "next-auth/react";
import { redirect, useSearchParams } from "next/navigation";
import "../auth.scss";
import { useFeedback } from "@/context/feedbackContext";
import Toast from "@/components/molecules/toast/Toast";

export default function LoginView() {
  const { data: session, status } = useSession();
  const { toast, showToast, resetToast } = useFeedback();
  const searchParams = useSearchParams();
  const error = searchParams.get("error");

  useEffect(() => {
    // Handle URL error parameters
    if (error) {
      showToast(
        "error",
        "Authentication Error",
        error === "Callback"
          ? "There was an error with Google login. Please try again."
          : error
      );
    }
  }, [error, showToast]);

  const handleGoogleSignIn = async () => {
    try {
      const result = await signIn("google", {
        redirect: false,
        // callbackUrl: "/",
      });

      if (result?.error) {
        showToast("error", "Authentication Error", result.error);
      }
    } catch (error) {
      showToast(
        "error",
        "Authentication Error",
        "Failed to connect with Google. Please try again."
      );
    }
  };

  const onError = (message: string) => {
    showToast(
      "error",
      "Authentication Error",
      message || "Something happened when authenticating"
    );
  };

  if (status === "loading") {
    return <div>Loading...</div>;
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
      <h1 className="text-3xl text-black-primary">LOG IN</h1>
      <LoginForm onError={onError} />
      <hr className="border border-solid border-green-primary w-11/12" />
      <Button variant="secondary" isFullWidth onClick={handleGoogleSignIn}>
        <GoogleIcon /> Log in with Google
      </Button>
      <p>
        You don't have an account? Register
        <a
          href="/auth/register"
          className="text-green-primary hover:underline cursor-pointer"
        >
          here
        </a>
      </p>
    </>
  );
}
