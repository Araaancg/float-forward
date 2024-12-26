"use client";
import React from "react";
import Button from "@/components/atoms/button/Button";
import GoogleIcon from "@/components/atoms/icons/GoogleIcon";
import ForgotPasswordForm from "@/components/organisms/forms/ForgotPasswordForm/ForgotPasswordForm";
import "../auth.scss";

export default function ForgotPasswordView() {
  return (
    <>
      <h1 className="text-3xl	text-black-primary">LOG IN</h1>
      <ForgotPasswordForm />
      <p>
        Already have an account? Register{" "}
        <a
          href="/auth/register"
          className="text-green-primary hover:underline cursor-pointer"
        >
          here
        </a>{" "}
        or login{" "}
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
