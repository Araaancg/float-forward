"use client";
import React from "react";
import LoginForm from "@/components/organisms/forms/LoginForm/LoginForm";
import Button from "@/components/atoms/button/Button";
import GoogleIcon from "@/components/atoms/icons/GoogleIcon";
import { signIn, signOut } from "next-auth/react";
import { useSession } from "next-auth/react";
import "../auth.scss";

export default function LoginView() {
  const { data: session, status } = useSession();

  React.useEffect(() => {
    console.log("session", session);
    if (session?.error) {
      // Show error to user
      alert(session.error);
      // Or use a toast notification
      // Or set an error state and show it in the UI
    }
  }, [session]);

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (session) {
    return (
      <Button variant="secondary" isFullWidth onClick={() => signOut()}>
        <GoogleIcon /> Sign Out
      </Button>
    );
  }

  return (
    <>
      <h1 className="text-3xl	text-black-primary">LOG IN</h1>
      <LoginForm />
      <hr className="border border-solid border-green-primary w-11/12" />
      <Button
        variant="secondary"
        isFullWidth
        onClick={() => signIn("google", { redirectTo: "/" })}
      >
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
