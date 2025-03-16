"use client";
import LoginForm from "@/components/organisms/forms/LoginForm/LoginForm";
import Button from "@/components/atoms/button/Button";
import GoogleIcon from "@/components/atoms/icons/GoogleIcon";
import { signIn, useSession } from "next-auth/react";
import { redirect, useSearchParams } from "next/navigation";
import { useFeedback } from "@/context/feedbackContext";
import Toast from "@/components/molecules/toast/Toast";
import Loader from "@/components/atoms/loader/Loader";
import { useApi } from "@/utils/hooks/useApi";
import { useState } from "react";
import "../auth.scss";

export default function LoginView() {
  const { data: session, status } = useSession();
  const { toast, showToast, resetToast } = useFeedback();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("redirect");
  const { callApi } = useApi();
  const [loadingLogin, setLoadingLogin] = useState<boolean>(false)

  const handleGoogleSignIn = async () => {
    setLoadingLogin(true)
    try {
      const result = await signIn("google", {
        redirect: false,
        callbackUrl: callbackUrl || "/",
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
    } finally {
      setLoadingLogin(false)
    }
  };

  const handleCredentialSignIn = async (data: {
    email: string;
    password: string;
    provider?: string;
  }) => {
    setLoadingLogin(true)
    try {
      data.provider = "check";
      const response = await callApi("/api/customAuth/login", {
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
          redirect: false,
          callbackUrl: callbackUrl || "/",
        });
        console.log("Resultado signin credentials", result);
      } else {
        console.log("Entering the 'catch'");
        onError(response.message);
      }
    } catch (error) {
      onError("An unexpected error occurred. Please try again.");
    } finally {
      setLoadingLogin(false)
    }
  };

  const onError = (message: string) => {
    console.log("onError was triggered");
    showToast(
      "error",
      "Authentication Error",
      message || "Something happened when authenticating"
    );
  };

  if (status === "loading" || loadingLogin) {
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
      <h1 className="text-3xl text-black-primary">LOG IN</h1>
      <LoginForm onFormSubmit={handleCredentialSignIn}/>
      <hr className="border border-solid border-green-primary w-11/12" />
      <Button variant="secondary" isFullWidth onClick={handleGoogleSignIn}>
        <GoogleIcon /> Log in with Google
      </Button>
      <p>
        You don't have an account? Register{" "}
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
