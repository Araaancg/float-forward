"use client";
import React, { useState, useMemo } from "react";
import { usePathname } from "next/navigation";
import { disasterMock } from "@/mocks/disasters";
import Image from "next/image";
import Button from "@/components/atoms/button/Button";
import PinCard from "@/components/molecules/list-items/pin-card/PinCard";
import { pinListMock } from "@/mocks/pins";
import Breadcrumbs from "@/components/atoms/breadcrumbs/Breadcrumbs";
import MapReadPins from "@/components/organisms/maps/map-read-pins/MapReadPins";
import PinFilters from "@/components/organisms/maps/pin-filters/PinFilters";
import SeeMoreP from "@/components/atoms/see-more-p/SeeMoreP";
import { IDisasters, IPin } from "@/types/structures";
import { PinTypes } from "@/types/enums";
import usePinManagement from "@/utils/hooks/usePinManagement";
import "./disaster.scss";
import { useAuth } from "@/utils/hooks/useAuth";

export default function DisasterView() {
  const { isLoading, session } = useAuth({
    required: true,
    onError: (error) => {
      // console.error('Auth error:', error)
    }
  })

  if (isLoading) {
    return <div>Loading...</div>
  }

  const pathname = usePathname().split("/");
  const slug = pathname[1];

  const [disaster, setDisaster] = useState<IDisasters>(disasterMock[0]);
  const [pinsList, setPinsList] = useState<IPin[]>(pinListMock);

  const [activePins, setActivePins] = useState<Record<PinTypes, boolean>>({
    [PinTypes.HELP_REQUEST]: true,
    [PinTypes.HELP_OFFER]: true,
    [PinTypes.COLLECTION_POINT]: true,
    [PinTypes.MEDICAL_POINT]: true,
    [PinTypes.MISSINGS]: true,
    [PinTypes.INFORMATION_POINT]: true,
  });

  const pinsToShow = useMemo(() => {
    return pinsList.filter((pin) => activePins[pin.type.title as PinTypes]);
  }, [activePins]);

  const { selectedPin, onPinClick, removePinParam } = usePinManagement();

  // TO DO:
  // Ask backend for the information on the disaster through the slug, which should be unique
  // Ask backend for the pin information

  return (
    <div className="disasterView">
      <Breadcrumbs
        links={[
          {
            placeholder: disasterMock[0].title,
            url: `/${disasterMock[0].slug}`,
          },
        ]}
        className="max-w-[800px]"
      />

      {/* HEADER - Info about the disaster */}
      <div className="disasterView-header">
        <div className="disasterView-header-text">
          <h1>{disaster.title}</h1>
          <SeeMoreP text={disaster.description} />
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
        <Button
          color="yellow"
          className="w-full sm:w-fit"
          isLink
          linkProps={{ href: `${"floods-valencia-2024"}/request-help` }}
        >
          Request help
        </Button>
        <Button
          className="w-full sm:w-fit"
          isLink
          linkProps={{ href: `${"floods-valencia-2024"}/offer-help` }}
        >
          Offer help{" "}
        </Button>
        <Button
          color="black"
          className="w-full sm:w-fit"
          isLink
          linkProps={{ href: `${"floods-valencia-2024"}/missings` }}
        >
          Report missing peson or pet
        </Button>
      </div>

      <hr className="border border-solid border-green-primary w-full max-w-[800px]" />

      {/* MAP */}
      <div className="disasterView-locations">
        <MapReadPins
          givenPins={pinsToShow}
          className="disasterView-locations-map"
          onPinClick={onPinClick}
          defaultCenter={disasterMock[0].location}
        />
        <PinFilters
          activePins={activePins}
          setActivePins={setActivePins}
          className="disasterView-locations-filters"
        />
      </div>

      {/* ADDITIONAL INFORMATION  */}

      {/* PIN CARD - conditionally rendered based on URL parameter */}
      {selectedPin && <PinCard data={selectedPin} onClose={removePinParam} />}
    </div>
  );
}
