"use client";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Loader from "@/components/atoms/loader/Loader";
import CheckCircleIcon from "@/components/atoms/icons/CheckCircleIcon";
import ExclamationMarkIcon from "@/components/atoms/icons/ExclamationMarkIcon";

export default function VerifyEmailPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const email = searchParams.get("email");
  const [verifyEmailLoading, setVerifyEmailLoading] = useState<boolean>(true);
  const [succesfulVerification, setSuccessfullVerification] =
    useState<boolean>(false);

  useEffect(() => {
    const verifyToken = async () => {
      try {
        const res = await fetch("/api/auth/verify-email", {
          method: "POST",
          body: JSON.stringify({ email, verifyEmailToken: token }),
        });
        const response = await res.json();
        console.log("response", response);
        if (response.success) {
          console.log("response", response);
          setSuccessfullVerification(true);
        } else {
          console.log("Entering the 'catch'");
          setSuccessfullVerification(false);
        }
      } catch (error) {
        setSuccessfullVerification(false);
      } finally {
        setVerifyEmailLoading(false);
      }
    };

    if (token && email) {
      verifyToken();
    }
  }, [token, email, router]);

  if (verifyEmailLoading) {
    return <Loader view="auth" />;
  }

  return (
    <div className="flex flex-col justify-center items-center gap-6">
      {succesfulVerification ? (
        <>
          <CheckCircleIcon size={48} />
          <h1 className="text-2xl">Email verified succesfully</h1>
          <p className="text-center">You can safely close this page</p>
        </>
      ) : (
        <>
          <ExclamationMarkIcon size={48} />
          <h1 className="text-2xl">Email couldn't be verified</h1>
          <p className="text-center">Something went wrong when verifying your email. Please try again later.</p>
        </>
      )}
    </div>
  );
}
