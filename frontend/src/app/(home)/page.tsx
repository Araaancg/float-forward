"use client";
import React from "react";
import Carrousel from "@/components/organisms/carrousel/Carrousel";
import { disasterMock } from "@/mocks/disasters";
import "./home.scss";

export default function Home() {
  // const session = useSession();
  // console.log("session", session);

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
      <Carrousel info={disasterMock} />
    </div>
  );
}
