"use client";
import React, { useEffect } from "react";
import { useSession } from "next-auth/react";
import ApiClient from "@/utils/api";
import "./home.scss";

const apiClient = new ApiClient();

export default function Home() {
  const session = useSession();
  console.log("session", session);

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
    <div>
      just some content is needed to show the shadow
      <form></form>
    </div>
  );
}
