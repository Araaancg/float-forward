"use client";
import React, { useState, useMemo, useEffect } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import Button from "@/components/atoms/button/Button";
import PinCard from "@/components/molecules/list-items/pin-card/PinCard";
import Breadcrumbs from "@/components/atoms/breadcrumbs/Breadcrumbs";
import MapReadPins from "@/components/organisms/maps/map-read-pins/MapReadPins";
import PinFilters from "@/components/organisms/maps/pin-filters/PinFilters";
import SeeMoreP from "@/components/atoms/see-more-p/SeeMoreP";
import { IDisasters, IPin } from "@/types/structures";
import { PinTypes } from "@/types/enums";
import usePinManagement from "@/utils/hooks/usePinManagement";
import { useAuth } from "@/utils/hooks/useAuth";
import { useApi } from "@/utils/hooks/useApi";
import "./disaster.scss";

export default function DisasterView() {
  const { isLoading, session } = useAuth({
    required: true,
    onError: (error) => {
      // console.error('Auth error:', error)
    },
  });

  const { callApi, loading, error } = useApi();
  const [disaster, setDisaster] = useState<IDisasters>();

  const pathname = usePathname().split("/");
  const slug = pathname[1];

  useEffect(() => {
    const fetchDisasters = async () => {
      const response = await callApi(`/api/disasters?slug=${slug}`, {
        method: "GET",
      });

      if (response.success && response.data) {
        console.log("response", response);
        setDisaster(response.data[0]);
      }
    };

    fetchDisasters();
  }, []);

  const [activePins, setActivePins] = useState<Record<PinTypes, boolean>>({
    [PinTypes.HELP_REQUEST]: true,
    [PinTypes.HELP_OFFER]: true,
    [PinTypes.COLLECTION_POINT]: true,
    [PinTypes.MEDICAL_POINT]: true,
    [PinTypes.MISSINGS]: true,
    [PinTypes.INFORMATION_POINT]: true,
  });

  const pinsToShow = useMemo(() => {
    if (disaster && disaster?.pins) {
      console.log(disaster?.pins)
      return disaster.pins.filter(
        (pin: IPin) => activePins[pin.type.title as PinTypes]
      );
    } else return [];
  }, [activePins, disaster]);

  const { selectedPin, onPinClick, removePinParam } = usePinManagement(disaster?.pins);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return disaster ? (
    <div className="disasterView">
      <Breadcrumbs
        links={[
          {
            placeholder: disaster?.title,
            url: `/${disaster?.slug}`,
          },
        ]}
        className="max-w-[800px]"
      />

      {/* HEADER - Info about the disaster */}
      <div className="disasterView-header">
        <div className="disasterView-header-text">
          <h1>{disaster?.title}</h1>
          <SeeMoreP text={disaster?.description} />
        </div>
        <div className="relative w-full sm:w-[200px] h-56 sm:h-40">
          {disaster?.images &&
            disaster?.images[0]?.href &&
            disaster?.images[0]?.alt && (
              <Image
                src={disaster?.images[0]?.href}
                alt={disaster?.images[0]?.alt}
                fill
                className="object-cover"
              />
            )}
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
      {pinsToShow && (
        <div className="disasterView-locations">
          <MapReadPins
            givenPins={pinsToShow}
            className="disasterView-locations-map"
            onPinClick={onPinClick}
            defaultCenter={{
              lat: disaster?.coordinates?.lat,
              lng: disaster?.coordinates.lng,
            }}
          />
          <PinFilters
            activePins={activePins}
            setActivePins={setActivePins}
            className="disasterView-locations-filters"
          />
        </div>
      )}

      {/* ADDITIONAL INFORMATION  */}

      {/* PIN CARD - conditionally rendered based on URL parameter */}
      {selectedPin && <PinCard data={selectedPin} onClose={removePinParam} />}
    </div>
  ) : (
    <div>loading...</div>
  );
}
