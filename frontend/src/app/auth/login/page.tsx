"use client";
import React from "react";
import LoginForm from "@/components/organisms/forms/LoginForm/LoginForm";
import Button from "@/components/atoms/button/Button";
import GoogleIcon from "@/components/atoms/icons/GoogleIcon";
import "../auth.scss";

export default function LoginView() {
  return (
    <>
      <h1 className="text-3xl	text-black-primary">LOG IN</h1>
      <LoginForm />
      <hr className="border border-solid border-green-primary w-11/12" />
      <Button variant="secondary" isFullWidth>
        <GoogleIcon /> Log in with Google
      </Button>
      <p>
        You don't have an account? Register{" "}
        <a href="/auth/register" className="text-green-primary hover:underline cursor-pointer">
          here
        </a>
      </p>
    </>
  );
}
