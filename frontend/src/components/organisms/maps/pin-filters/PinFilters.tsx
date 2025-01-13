"use client";
import React, { Dispatch, SetStateAction, useState } from "react";
import Button from "@/components/atoms/button/Button";
import theme from "@/theme";
import MapPinIcon from "@/components/atoms/icons/MapPinIcon";
import { PinTypes } from "@/types/enums";
import "./pin-filters.scss";

const listIcons: { type: PinTypes; placeholder: string; color: string }[] =
  [
    {
      type: PinTypes.HELP_REQUEST,
      placeholder: "I need help",
      color: theme.extend.colors.pins.yellow.primary,
    },
    {
      type: PinTypes.COLLECTION_POINT,
      placeholder: "Collection point",
      color: theme.extend.colors.pins.lightBlue.primary,
    },
    {
      type: PinTypes.HELP_OFFER,
      placeholder: "I want to help",
      color: theme.extend.colors.pins.green.primary,
    },
    {
      type: PinTypes.MEDICAL_POINT,
      placeholder: "Medical point",
      color: theme.extend.colors.pins.red.primary,
    },
    {
      type: PinTypes.MISSINGS,
      placeholder: "Missing person | pet",
      color: theme.extend.colors.pins.black.primary,
    },
    {
      type: PinTypes.INFORMATION_POINT,
      placeholder: "Information point",
      color: theme.extend.colors.pins.darkBlue.primary,
    },
  ];

export default function PinFilters({
  activePins,
  setActivePins,
  className,
}: {
  activePins: Record<PinTypes, boolean>;
  setActivePins: Dispatch<SetStateAction<Record<PinTypes, boolean>>>;
  className?: string;
}) {
  const [showPinFilters, setShowPinFilters] = useState<boolean>(false);

  const countActivePins = (): number => {
    let count = 0;
    for (const key in activePins) {
      if (activePins[key as PinTypes]) {
        count++;
      }
    }
    return count;
  };

  const toggleMapPins = (name: PinTypes) => {
    setActivePins((prev) => {
      return { ...prev, [name]: !prev[name] };
    });
  };

  const isolateMapPin = (name: PinTypes) => {
    setActivePins((prev) => {
      const newActivePins: Record<PinTypes, boolean> = { ...prev };

      // Check if the pin is already isolated
      const isAlreadyIsolated =
        Object.values(newActivePins).filter((value) => value === true)
          .length === 1;

      if (isAlreadyIsolated && newActivePins[name]) {
        // If already isolated, reset to show all pins
        for (const key of Object.keys(newActivePins) as PinTypes[]) {
          newActivePins[key] = true;
        }
      } else {
        // Otherwise, isolate the selected pin
        for (const key of Object.keys(newActivePins) as PinTypes[]) {
          newActivePins[key] = key === name;
        }
      }

      return newActivePins;
    });
  };

  return (
    <div className={className}>
      <h2 className="hidden sm:flex">Map pins</h2>
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
          {countActivePins() === listIcons.length ? "All" : countActivePins()}
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
              type: PinTypes;
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
                filled
                color={
                  activePins[pinInfo.type]
                    ? pinInfo.color
                    : theme.extend.colors.grey
                }
                size={22}
              />{" "}
              {pinInfo.type}
            </Button>
          )
        )}
      </div>
    </div>
  );
}
