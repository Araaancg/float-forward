"use client";
import React, { useEffect, useMemo, useState } from "react";
import Breadcrumbs from "@/components/atoms/breadcrumbs/Breadcrumbs";
import Tabs from "@/components/atoms/tabs/Tabs";
import ExclamationMarkIcon from "@/components/atoms/icons/ExclamationMarkIcon";
import Button from "@/components/atoms/button/Button";
import theme from "@/theme";
import Modal from "@/components/molecules/modal/Modal";
import OfferOwnHelpForm from "@/components/organisms/forms/OfferHelpForm/OfferHelpForm";
import { IDisasters, IPin } from "@/types/structures";
import MapReadPins from "@/components/organisms/maps/map-read-pins/MapReadPins";
import usePinManagement from "@/utils/hooks/usePinManagement";
import PinCard from "@/components/molecules/list-items/pin-card/PinCard";
import { useApi } from "@/utils/hooks/useApi";
import { usePathname } from "next/navigation";
import "./offer-help.scss";

const whatHelp = [
  {
    title: "Collection point",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
  {
    title: "Medical health point",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
  {
    title: "Offer non-medical services",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
  {
    title: "Medical services",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
];

export default function OfferHelpView() {
  const [currentTab, setCurrentTab] = useState<number>(0);
  const [disaster, setDisaster] = useState<IDisasters>();
  const { callApi, loading, error } = useApi();
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

  const requestsPins = useMemo(() => {
    if (disaster && disaster?.pins) {
      const pins = disaster.pins;
      return disaster.pins.filter(
        (pin: IPin) => pin.type.title === "Help Request"
      );
    } else return [];
  }, [disaster]);

  const { selectedPin, onPinClick, removePinParam } =
    usePinManagement(requestsPins);
  const [showOwnHelpModal, setShowOwnHelpModal] = useState<boolean>(false);

  return disaster ? (
    <div className="offerHelpView">
      <Breadcrumbs
        links={[
          {
            placeholder: disaster?.title,
            url: `/${disaster?.slug}`,
          },
          {
            placeholder: "Offer help",
            url: `/${disaster?.slug}/offer-help`,
          },
        ]}
        className="max-w-[800px]"
      />

      <h1 className="text-4xl">Offer Help</h1>
      <p className="text-center max-w-[800px]">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua.
      </p>
      <Tabs
        options={[
          "Help somebody directly",
          "Offer my own help",
          "Pitch in from home",
        ]}
        paramKey="tab"
        onTabChange={(index: number) => setCurrentTab(index)}
        className="max-w-[800px] w-full"
      />

      {/* {currentTab === 0 && (
        <>
          {pinListMock.map((item: IPin, index) => (
            <HelpRequestItem key={index} data={item}/>
          ))}
        </>
      )} */}
      {currentTab === 0 && (
        <>
          <MapReadPins
            givenPins={requestsPins}
            className="w-full h-96 max-w-[800px]"
            onPinClick={onPinClick}
            defaultCenter={disaster?.coordinates}
          />
        </>
      )}
      {selectedPin && <PinCard data={selectedPin} onClose={removePinParam} />}

      {currentTab === 1 && (
        <>
          <h2 className="flex gap-3 justify-start items-center text-2xl	">
            Offer my own help
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
            title="What help can you offer?"
            className="flex flex-col gap-6 max-w-xl	"
          >
            {whatHelp.map(
              (item: { title: string; description: string }, index: number) => (
                <div key={index} className="w-full">
                  <p>{item.title}</p>
                  <hr className="border border-solid border-green-primary w-full max-w-[800px]" />

                  <p className="text-sm">{item.description}</p>
                </div>
              )
            )}
          </Modal>

          <OfferOwnHelpForm disaster={disaster} />
        </>
      )}
    </div>
  ) : (
    <div>loading...</div>
  );
}
