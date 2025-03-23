"use client";
import React, { useState, useMemo } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import Button from "@/components/atoms/button/Button";
import PinCard from "@/components/molecules/pin-card/PinCard";
import Breadcrumbs from "@/components/atoms/breadcrumbs/Breadcrumbs";
import MapReadPins from "@/components/organisms/maps/map-read-pins/MapReadPins";
import PinFilters from "@/components/organisms/maps/pin-filters/PinFilters";
import SeeMoreP from "@/components/atoms/see-more-p/SeeMoreP";
import { IDisasters, IPin } from "@/types/structures";
import { PinTypes } from "@/types/enums";
import usePinManagement from "@/utils/hooks/usePinManagement";
import { useAuth } from "@/utils/hooks/useAuth";
import { useData } from "@/utils/hooks/useData";
import Loader from "@/components/atoms/loader/Loader";
import "./disaster.scss";

export default function DisasterView() {
  const { sessionLoading, session } = useAuth();

  const pathname = usePathname().split("/");
  const slug = pathname[1];

  const {
    data: disaster_,
    loading,
    error,
  } = useData<IDisasters[]>(`/api/disasters?slug=${slug}`, {
    method: "GET",
  });

  const disaster: IDisasters | null = useMemo(() => {
    return disaster_ && disaster_[0];
  }, [disaster_]);

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
      return disaster.pins.filter(
        (pin: IPin) => activePins[pin.type.title as PinTypes]
      );
    } else return [];
  }, [activePins, disaster]);

  const { selectedPin, onPinClick, removePinParam } = usePinManagement(
    disaster?.pins
  );

  if (sessionLoading || loading) {
    return <Loader view="disaster" />;
  }

  if (error) {
    return <div>Error: {error}</div>;
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
              lng: disaster?.coordinates?.lng,
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
      {selectedPin && (
        <PinCard
          data={selectedPin}
          onClose={removePinParam}
          isOwn={session?.user._id === selectedPin.user._id}
        />
      )}
    </div>
  ) : (
    <div>loading...</div>
  );
}
