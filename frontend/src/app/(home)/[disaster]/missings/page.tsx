"use client";
import React, { useEffect, useMemo, useState } from "react";
import { disasterMock } from "@/mocks/disasters";
import Breadcrumbs from "@/components/atoms/breadcrumbs/Breadcrumbs";
import Tabs from "@/components/atoms/tabs/Tabs";
import ReportMissingForm from "@/components/organisms/forms/ReportMissingForm/ReportMissingForm";
import Modal from "@/components/molecules/modal/Modal";
import ExclamationMarkIcon from "@/components/atoms/icons/ExclamationMarkIcon";
import Button from "@/components/atoms/button/Button";
import theme from "@/theme";
import MapReadPins from "@/components/organisms/maps/map-read-pins/MapReadPins";
import PinCard from "@/components/molecules/pin-card/PinCard";
import usePinManagement from "@/utils/hooks/usePinManagement";
import { IDisasters, IPin } from "@/types/structures";
import { useApi } from "@/utils/hooks/useApi";
import { usePathname } from "next/navigation";
import PinListItem from "@/components/molecules/list-items/pin-list-item/PinListItem";
import { useAuth } from "@/utils/hooks/useAuth";
import Loader from "@/components/atoms/loader/Loader";
import { PinTypes } from "@/types/enums";
import "./missings.scss";

const howToReport = [
  {
    title: "For Missing Persons",
    description: [
      "Provide the person's full name, age, physical description, and any distinguishing features.",
      "Include the last known location and time they were seen.",
      "Specify any medical conditions or special needs.",
    ],
  },
  {
    title: "For Missing Pets",
    description: [
      "Include the pet's name, breed, size, and color.",
      "Describe any identifying marks, collars, or tags.",
      "Mention the location where the pet was last seen.",
    ],
  },
  {
    title: "For Missing Items",
    description: [
      "Provide a detailed description of the item, including its make, model, and color.",
      "Specify the item's location before it went missing.",
      "Note any unique features or identifying marks.",
      "If it is a vehicle, provide the license plate number.",
    ],
  },
  {
    title: "General Tips",
    description: [
      "Be as accurate and detailed as possible.",
      "Update your report with any new information.",
      "Check back frequently for updates or messages.",
      "If you recover your item, pet or person please update the report to say it has been found.",
      "If you find a missing item, pet, or person please contact the reporter using the contact information they provide.",
    ],
  },
];

export default function MissingsView() {
  const [currentTab, setCurrentTab] = useState<number>(0);
  const [disaster, setDisaster] = useState<IDisasters>();
  const { sessionLoading, session } = useAuth();
  const { callApi, loading, error } = useApi();
  const pathname = usePathname().split("/");
  const slug = pathname[1];

  useEffect(() => {
    const fetchDisasters = async () => {
      const response = await callApi(`/api/disasters?slug=${slug}`, {
        method: "GET",
      });

      if (response.success && response.data) {
        setDisaster(response.data[0]);
      }
    };

    fetchDisasters();
  }, []);

  const missingsPins = useMemo(() => {
    if (disaster && disaster?.pins) {
      return disaster.pins.filter((pin: IPin) => pin.type.title === PinTypes.MISSINGS);
    } else return [];
  }, [disaster]);

  const [showOwnHelpModal, setShowOwnHelpModal] = useState<boolean>(false);
  const { selectedPin, onPinClick, removePinParam } =
    usePinManagement(missingsPins);

  const onCardClick = (pin: IPin) => {
    onPinClick(pin);
  };

  if (loading || sessionLoading || !disaster) {
    return <Loader view="pin" />;
  }

  if (error) {
    <p>Error: {error}</p>;
  }

  return disaster ? (
    <div className="missingsView">
      <Breadcrumbs
        links={[
          {
            placeholder: disasterMock[0].title,
            url: `/${disasterMock[0].slug}`,
          },
          {
            placeholder: "Missing persons, pets or items",
            url: "missings",
          },
        ]}
        className="max-w-[800px]"
      />

      <h1 className="text-4xl text-center">
        Report Missing Person, Pet or Item
      </h1>
      <p className="text-center max-w-[800px]">
        This page allows you to report missing persons, pets, or important items
        following a natural disaster. Please provide as much detail as possible
        to help others locate them. Your information will be shared with the
        community to aid in the search and recovery efforts.
      </p>
      <Tabs
        options={["Map", "Report a missing"]}
        onTabChange={(index: number) => setCurrentTab(index)}
      />
      {currentTab === 0 && (
        <>
          <div className="missingsView-mapList">
            <MapReadPins
              givenPins={missingsPins}
              className="h-96 max-w-[800px] w-full sm:w-1/2"
              onPinClick={onPinClick}
              defaultCenter={disaster?.coordinates}
            />
            <div className="w-full sm:w-1/2 flex flex-col items-center gap-2 h-96 overflow-y-auto p-2">
              {missingsPins.map((pin: IPin, index: number) => (
                <PinListItem
                  data={pin}
                  key={`missings-pli-${index}`}
                  onCardClick={onCardClick}
                  isOwn={session?.user._id === pin.user._id}
                />
              ))}
            </div>
          </div>
        </>
      )}
      {/* PIN CARD - conditionally rendered based on URL parameter */}
      {selectedPin && (
        <PinCard
          data={selectedPin}
          onClose={removePinParam}
          isOwn={session?.user._id === selectedPin.user._id}
        />
      )}
      {currentTab === 1 && (
        <>
          <h2 className="flex gap-3 justify-start items-center text-2xl	">
            Fill in the form to report
            <Button
              variant="no-color"
              onClick={() => setShowOwnHelpModal(!showOwnHelpModal)}
            >
              <ExclamationMarkIcon color={theme.extend.colors.green.primary} />
            </Button>
          </h2>

          <Modal
            onClose={() => setShowOwnHelpModal(!showOwnHelpModal)}
            isOpen={showOwnHelpModal}
            title="How to make a report? Additional Information"
            className="flex flex-col gap-6 max-w-xl	"
          >
            {howToReport.map(
              (
                item: { title: string; description: string[] },
                index: number
              ) => (
                <div key={`modalHelpMissings-${index}`} className="w-full">
                  <p className="font-semibold">{item.title}</p>
                  <hr className="border border-solid border-green-primary w-full max-w-[800px] my-2" />
                  <ul>
                    {item.description.map((text: string, index: number) => (
                      <li
                        key={`modalHelpMissings-text-${index}`}
                        className="list-disc ml-4"
                      >
                        {text}
                      </li>
                    ))}
                  </ul>
                </div>
              )
            )}
          </Modal>

          <ReportMissingForm disaster={disaster} session={session} />
        </>
      )}
    </div>
  ) : (
    <div>Loading...</div>
  );
}
