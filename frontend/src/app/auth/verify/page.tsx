// app/auth/verify/page.tsx
"use client";
import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";
import GENERAL_VARIABLES from "@/general";

export default function VerifyPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  useEffect(() => {
    const verifyToken = async () => {
      try {

        const response = await fetch(
          `${GENERAL_VARIABLES.apiUrl}/auth/verify-magic-link`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ token }),
          }
        );

        const data = await response.json();

        if (data.success) {
          // Sign in with a custom provider we'll create
          await signIn("credentials", {
            ...data,
            redirect: false,
          });

          router.push("/"); // Or wherever you want to redirect
        } else {
          router.push("/auth/login?error=Invalid link");
        }
      } catch (error) {
        router.push("/auth/login?error=Verification failed");
      }
    };

    if (token) {
      verifyToken();
    }
  }, [token, router]);

  return (
    <div className="flex justify-center items-center h-screen">
      <p>Verifying your login...</p>
    </div>
  );
}
