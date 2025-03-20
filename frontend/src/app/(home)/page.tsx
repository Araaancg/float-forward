"use client";
import Carrousel from "@/components/organisms/carrousel/Carrousel";
import { useSession } from "next-auth/react";
import { IDisasters } from "@/types/structures";
import { useData } from "@/utils/hooks/useData";
import Loader from "@/components/atoms/loader/Loader";
import VerifyEmailBanner from "@/components/molecules/banners/verify-email-banner/VerifyEmailBanner";
import "./home.scss";

export default function Home() {
  const { data: session } = useSession();
  console.log("session", session);

  const {
    data: disasters,
    loading,
    error,
  } = useData<IDisasters[]>("/api/disasters", {
    method: "GET",
  });

  if (loading) {
    return <Loader view="home" />;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="flex flex-col justify-center items-center gap-12 p-4">
      {session && !session?.user.isVerified && <VerifyEmailBanner />}
      <div className="max-w-4xl	">
        <h1 className="my-4 text-center text-4xl	">Recent events</h1>
        <p className="text-center">
          This list has global events where you may have the chance to offer
          assistance to those in need, or on the contrary, where you yourself
          may require support.
        </p>
      </div>
      {disasters && !loading && !error && <Carrousel info={disasters} />}
    </div>
  );
}
