"use client";
import React, { useState, useEffect } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import Breadcrumbs, {
  IBreadcrumb,
} from "@/components/atoms/breadcrumbs/Breadcrumbs";
import { disasterMock } from "@/mocks/mock";
import { IDisasters, IPin } from "@/interfaces";
import Image from "next/image";
import "./disaster.scss";
import Button from "@/components/atoms/button/Button";
import PinCard from "@/components/molecules/list-items/pin-card/PinCard";
import { pinMock } from "@/mocks/mock";

export default function DisasterView() {
  const pathname = usePathname().split("/");
  const searchParams = useSearchParams();
  const slug = pathname[1];
  const router = useRouter()

  const [disaster, setDisaster] = useState<IDisasters>(disasterMock[0]);
  const [pin, setPin] = useState<IPin | null>(null);
  
  const [seeMoreInfo, setSeeMoreInfo] = useState<boolean>(false);
  
  const removePin = () => {
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.delete('pin');
    router.push(`${pathname.join('/')}${newSearchParams.toString() ? `?${newSearchParams.toString()}` : ''}`);
  };

  // Check for pin query parameter on component mount and when URL changes
  useEffect(() => {
    const pinId = searchParams.get('pin');
    console.log(pinId)
    if (pinId) {
      // In a real application, you would fetch the pin data using the ID
      // For now, we'll use the mock data
      setPin(pinMock);
    } else {
      setPin(null);
    }
  }, [searchParams]);

  // TO DO:
  // Ask backend for the information on the disaster through the slug, which should be unique
  // Ask backend for the pin information

  const breadcrumbs: IBreadcrumb[] = [
    {
      placeholder: disasterMock[0].title,
      url: disasterMock[0].slug,
    },
  ];

  return (
    <div className="disasterView">
      <Breadcrumbs links={breadcrumbs} className="max-w-[800px]" />

      {/* HEADER - Info about the disaster */}
      <div className="disasterView-header">
        <div className="disasterView-header-text">
          <h1>{disaster.title}</h1>
          <p>
            {seeMoreInfo
              ? disaster.description
              : disaster.description.slice(0, 150)}
            <Button
              onClick={() => setSeeMoreInfo(!seeMoreInfo)}
              variant="no-color"
            >
              {seeMoreInfo ? "See less" : "See more"}
            </Button>
          </p>
        </div>
        <div className="relative w-full sm:w-[200px] h-56 sm:h-40">
          <Image
            src={disaster.images[0].href}
            alt={disaster.images[0].alt}
            fill
            className="object-cover"
          />
        </div>
      </div>

      {/* BUTTONS - to interact with the disaster */}
      <div className="disasterView-buttons">
        <Button color="yellow" className="w-full sm:w-fit">Request help</Button>
        <Button className="w-full sm:w-fit">Offer help </Button>
        <Button color="black" className="w-full sm:w-fit">Report missing peson or pet</Button>
      </div>

      <hr className="border border-solid border-green-primary w-full max-w-[800px]" />

      {/* MAP */}

      {/* ADDITIONAL INFORMATION  */}

      {/* PIN CARD - conditionally rendered based on URL parameter */}
      {pin && <PinCard data={pin} onClose={removePin}/>}
    </div>
  );
}