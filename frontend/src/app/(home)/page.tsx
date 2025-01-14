"use client";
import React, { useEffect, useState } from "react";
import Carrousel from "@/components/organisms/carrousel/Carrousel";
import { useSession } from "next-auth/react";
import { IDisasters } from "@/types/structures";
import { useApi } from "@/utils/hooks/useApi";
import "./home.scss";

export default function Home() {
  const { data: session } = useSession();
  console.log("session", session);
  const { callApi, loading, error } = useApi();

  const [disasters, setDisasters] = useState<IDisasters[]>([]);
  useEffect(() => {
    const fetchDisasters = async () => {
      const response = await callApi("/api/disasters", {
        method: "GET",
      });

      if (response.success && response.data) {
        console.log("response", response);
        setDisasters(response.data);
      }
    };

    fetchDisasters();
  }, []);

  // if (loading) {
  //   return <div>Loading...</div>;
  // }

  // if (error) {
  //   return <div>Error: {error}</div>;
  // }

  return (
    <div className="flex flex-col justify-center items-center gap-12  p-4">
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
