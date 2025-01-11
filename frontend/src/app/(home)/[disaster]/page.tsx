"use client";
import React, { useState, useEffect, useMemo } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import Breadcrumbs, {
  IBreadcrumb,
} from "@/components/atoms/breadcrumbs/Breadcrumbs";
import { disasterMock } from "@/mocks/mock";
import { IDisasters, IPin, TActionTypes } from "@/interfaces";
import Image from "next/image";
import Button from "@/components/atoms/button/Button";
import PinCard from "@/components/molecules/list-items/pin-card/PinCard";
import { pinMock } from "@/mocks/mock";
import theme from "@/theme";
import MapPinIcon from "@/components/atoms/icons/MapPinIcon";
import { pinListMock } from "@/mocks/pins";
import "./disaster.scss";

const listIcons: { type: TActionTypes; placeholder: string; color: string }[] =
  [
    {
      type: "Help Request",
      placeholder: "I need help",
      color: theme.extend.colors.pins.yellow.primary,
    },
    {
      type: "Collection Point",
      placeholder: "Collection point",
      color: theme.extend.colors.pins.lightBlue.primary,
    },
    {
      type: "Help Offer",
      placeholder: "I want to help",
      color: theme.extend.colors.pins.green.primary,
    },
    {
      type: "Medical Point",
      placeholder: "Medical point",
      color: theme.extend.colors.pins.red.primary,
    },
    {
      type: "Missings",
      placeholder: "Missing person | pet",
      color: theme.extend.colors.pins.black.primary,
    },
    {
      type: "Information Point",
      placeholder: "Information point",
      color: theme.extend.colors.pins.darkBlue.primary,
    },
  ];

export default function DisasterView() {
  const pathname = usePathname().split("/");
  const searchParams = useSearchParams();
  const slug = pathname[1];
  const router = useRouter();

  const [disaster, setDisaster] = useState<IDisasters>(disasterMock[0]);
  const [pin, setPin] = useState<IPin | null>(null);
  const [pinsList, setPinsList] = useState<IPin[]>(pinListMock);

  const [activePins, setActivePins] = useState<Record<TActionTypes, boolean>>({
    "Help Request": true,
    "Help Offer": true,
    "Collection Point": true,
    "Medical Point": true,
    Missings: true,
    "Information Point": true,
  });

  const [seeMoreInfo, setSeeMoreInfo] = useState<boolean>(false);

  const hidePinInfo = () => {
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.delete("pin");
    router.push(
      `${pathname.join("/")}${
        newSearchParams.toString() ? `?${newSearchParams.toString()}` : ""
      }`
    );
  };

  // Check for pin query parameter on component mount and when URL changes
  useEffect(() => {
    const pinId = searchParams.get("pin");
    console.log(pinId);
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

  const toggleMapPins = (name: TActionTypes) => {
    setActivePins((prev) => {
      return { ...prev, [name]: !prev[name] };
    });
  };

  const isolateMapPin = (name: TActionTypes) => {
    setActivePins((prev) => {
      const newActivePins: Record<TActionTypes, boolean> = { ...prev };

      // Check if the pin is already isolated
      const isAlreadyIsolated =
        Object.values(newActivePins).filter((value) => value === true)
          .length === 1;

      if (isAlreadyIsolated && newActivePins[name]) {
        // If already isolated, reset to show all pins
        for (const key of Object.keys(newActivePins) as TActionTypes[]) {
          newActivePins[key] = true;
        }
      } else {
        // Otherwise, isolate the selected pin
        for (const key of Object.keys(newActivePins) as TActionTypes[]) {
          newActivePins[key] = key === name;
        }
      }

      return newActivePins;
    });
  };

  const pinsToShow = useMemo(() => {
    return pinsList.filter((pin) => activePins[pin.type.title as TActionTypes]);
  }, [activePins]);

  const countActivePins = (): number => {
    let count = 0;
    for (const key in activePins) {
      if (activePins[key as TActionTypes]) {
        count++;
      }
    }
    return count;
  };

  const [showPinFilters, setShowPinFilters] = useState<boolean>(false);

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
      <div className="disasterView-map">
        <div className="disasterView-map-filters">
          <h2 className="hidden sm:block">Map pins</h2>
          <div className="sm:hidden flex justify-between w-full">
            <Button
              variant="no-color"
              color="black"
              isFullWidth
              notCentered
              onClick={() => setShowPinFilters(!showPinFilters)}
            >
              Map pins
            </Button>
            <span className="bg-green-primary text-white-full rounded p-0.5 px-1">
              {countActivePins() === listIcons.length
                ? "All"
                : countActivePins()}
            </span>
          </div>
          <div
            className={`${
              !showPinFilters && "hidden"
            } sm:flex flex flex-col justify-start items-start gap-3`}
          >
            <p className="text-[12px]">
              Click on a category to hide or show.
              <br />
              Double click to isolate.
            </p>
            {listIcons.map(
              (
                pinInfo: {
                  type: TActionTypes;
                  placeholder: string;
                  color: string;
                },
                index: number
              ) => (
                <Button
                  key={index}
                  className="flex justify-start items-center gap-2"
                  variant="no-color"
                  color="black"
                  onClick={() => toggleMapPins(pinInfo.type)}
                  onDoubleClick={() => isolateMapPin(pinInfo.type)}
                >
                  <MapPinIcon
                    color={
                      activePins[pinInfo.type]
                        ? pinInfo.color
                        : theme.extend.colors.grey
                    }
                    size={28}
                  />{" "}
                  {pinInfo.type}
                </Button>
              )
            )}
          </div>
        </div>
      </div>

      {/* ADDITIONAL INFORMATION  */}

      {/* PIN CARD - conditionally rendered based on URL parameter */}
      {pin && <PinCard data={pin} onClose={hidePinInfo} />}
    </div>
  );
}
