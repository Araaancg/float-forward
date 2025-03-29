"use client";
import React, { useState, useMemo } from "react";
import { notFound, usePathname } from "next/navigation";
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
import MapPinWithBaseIcon from "@/components/atoms/icons/MapPinWithBaseIcon";
import HoldingHandsIcon from "@/components/atoms/icons/HoldingHandsIcon";
import TwoPeopleCarryingBoxIcon from "@/components/atoms/icons/TwoPeopleCarryingBoxIcon";
import AdditionalInformationCarrousel from "@/components/organisms/additional-information/additonal-information-carrousel/AdditionalInformationCarrousel";
import { additionalInformationMock } from "@/mocks/additional-information";

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
    if (error === "No disasters were found") {
      notFound();
    }
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
          linkProps={{ href: `${disaster.slug}/request-help` }}
        >
          Request help
        </Button>
        <Button
          className="w-full sm:w-fit"
          isLink
          linkProps={{ href: `${disaster.slug}/offer-help` }}
        >
          Offer help{" "}
        </Button>
        <Button
          color="black"
          className="w-full sm:w-fit"
          isLink
          linkProps={{ href: `${disaster.slug}/missings` }}
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

      {/* NUMBERS */}
      <section className="disasterView-statistics">
        <h2 className="disasterView-statistics-title">Numbers</h2>
        <div className="disasterView-statistics-container">
          <div className="disasterView-statistics-single">
            <MapPinWithBaseIcon size={50} />
            <span className="disasterView-statistics-single-number">
              {disaster.statistics?.pinsRegistered}
            </span>
            <span className="disasterView-statistics-single-title">
              Pins Registered
            </span>
          </div>
          <div className="disasterView-statistics-single">
            <HoldingHandsIcon size={50} />
            <span className="disasterView-statistics-single-number">
              {disaster.statistics?.peopleHelped}
            </span>
            <span className="disasterView-statistics-single-title">
              People Helped
            </span>
          </div>
          <div className="disasterView-statistics-single">
            <TwoPeopleCarryingBoxIcon size={50} />
            <span className="disasterView-statistics-single-number">
              {disaster.statistics?.helpOffers}
            </span>
            <span className="disasterView-statistics-single-title">
              Help Offers
            </span>
          </div>
        </div>
      </section>

      {/* ADDITIONAL INFORMATION  */}
      <section className="flex flex-col justify-center items-start gap-12 w-full">
        <h2 className="text-2xl">Additional Information</h2>
        <AdditionalInformationCarrousel data={additionalInformationMock}/>
      </section>

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
