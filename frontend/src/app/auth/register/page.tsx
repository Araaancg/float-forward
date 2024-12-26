"use client";
import React from "react";
import Button from "@/components/atoms/button/Button";
import GoogleIcon from "@/components/atoms/icons/GoogleIcon";
import RegisterForm from "@/components/organisms/forms/RegisterForm/RegisterForm";
import "../auth.scss";

export default function LoginView() {
  return (
    <>
      <h1 className="text-3xl	text-black-primary">REGISTER</h1>
      <RegisterForm />
      <hr className="border border-solid border-green-primary w-11/12" />
      <Button variant="secondary" isFullWidth>
        <GoogleIcon /> Register with Google
      </Button>
      <p>
        Already have an account? Log in{" "}
        <a href="/auth/login" className="text-green-primary hover:underline cursor-pointer">
          here
        </a>
      </p>
    </>
  );
}
