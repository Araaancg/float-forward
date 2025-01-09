"use client";
import React, { useEffect } from "react";
import { useSession } from "next-auth/react";
import ApiClient from "@/utils/api";
import "./home.scss";
import Carrousel from "@/components/organisms/carrousel/Carrousel";
import { disasterMock } from "@/mocks/mock";

const apiClient = new ApiClient();

export default function Home() {
  // const session = useSession();
  // console.log("session", session);

  // async function fetchUserData() {
  //   try {
  //     const user = await apiClient.get("/users");
  //     console.log("User data:", user);
  //   } catch (error) {
  //     console.error("Error fetching user data:", error);
  //   }
  // }

  // useEffect(() => {
  //   fetchUserData();
  // }, []);

  return (
    <div className="flex flex-col justify-center items-center gap-12">
      <div className="max-w-4xl	">
        <h1 className="my-4 text-center text-4xl	">Recent events</h1>
        <p className="text-center">
          This list has global events where you may have the chance to offer
          assistance to those in need, or on the contrary, where you yourself
          may require support.
        </p>
      </div>
      <Carrousel info={disasterMock} />
    </div>
  );
}
