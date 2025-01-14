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
import PinCard from "@/components/molecules/list-items/pin-card/PinCard";
import usePinManagement from "@/utils/hooks/usePinManagement";
import { IDisasters, IPin } from "@/types/structures";
import { useApi } from "@/utils/hooks/useApi";
import { usePathname } from "next/navigation";
import "./missings.scss";

export default function MissingsView() {
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

  const missingsPins = useMemo(() => {
    if (disaster && disaster?.pins) {
      const pins = disaster.pins;
      return disaster.pins.filter(
        (pin: IPin) => pin.type.title === "Missings"
      );
    } else return [];
  }, [disaster]);

  const [showOwnHelpModal, setShowOwnHelpModal] = useState<boolean>(false);
  const { selectedPin, onPinClick, removePinParam } = usePinManagement(missingsPins);

  return disaster ? (
    <div className="missingsView">
      <Breadcrumbs
        links={[
          {
            placeholder: disasterMock[0].title,
            url: `/${disasterMock[0].slug}`,
          },
          {
            placeholder: "Missing persons or pets",
            url: "missings",
          },
        ]}
        className="max-w-[800px]"
      />

      <h1 className="text-4xl text-center">Report missing person or pet</h1>
      <p className="text-center max-w-[800px]">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua.
      </p>
      <Tabs
        options={["Missings map", "Report missing person or pet"]}
        onTabChange={(index: number) => setCurrentTab(index)}
      />
      {currentTab === 0 && (
        <>
          <MapReadPins
            givenPins={missingsPins}
            className="w-full h-96 max-w-[800px]"
            onPinClick={onPinClick}
            defaultCenter={disaster?.coordinates}
          />
        </>
      )}
      {/* PIN CARD - conditionally rendered based on URL parameter */}
      {selectedPin && <PinCard data={selectedPin} onClose={removePinParam} />}
      {currentTab === 1 && (
        <>
          <h2 className="flex gap-3 justify-start items-center text-2xl	">
            Report missing person or pet
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
            Some explanation here
          </Modal>

          <ReportMissingForm disaster={disaster}/>
        </>
      )}
    </div>
  ):(<div>Loading...</div>);
}
