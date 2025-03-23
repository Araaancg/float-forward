"use client";
import React, { useEffect, useMemo, useState } from "react";
import { disasterMock } from "@/mocks/disasters";
import Breadcrumbs from "@/components/atoms/breadcrumbs/Breadcrumbs";
import Tabs from "@/components/atoms/tabs/Tabs";
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
import RequestHelpForm from "@/components/organisms/forms/RequestHelpForm/RequestHelpForm";
import "./request-help.scss";

const howToRequestHelp = [
  {
    title: "How to Request Help",
    description: [
      "Provide a clear and concise title for your request.",
      "Describe the help you need in detail, incluidng any specific requirements.",
      "Specify the location where help is needed",
      "Be specific about the number of people needed, if applicable, and any tools required.",
      "Please be respectful and courteous in your requests",
      "Important Note: Requests for monetary assistance are strictly prohibited and will be removed.",
      "This platform is for requesting practical, physical, and logistical assistance.",
      "If you no longer need help, please update your request to reflect that.",
    ],
  },
];

export default function RequestHelpView() {
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

  const requestHelpPins = useMemo(() => {
    if (disaster && disaster?.pins) {
      return disaster.pins.filter(
        (pin: IPin) =>
          pin.type.title === PinTypes.HELP_OFFER ||
          pin.type.title === PinTypes.INFORMATION_POINT ||
          pin.type.title === PinTypes.COLLECTION_POINT
      );
    } else return [];
  }, [disaster]);

  const [showOwnHelpModal, setShowOwnHelpModal] = useState<boolean>(false);
  const { selectedPin, onPinClick, removePinParam } =
    usePinManagement(requestHelpPins);

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
    <div className="requestHelpView">
      <Breadcrumbs
        links={[
          {
            placeholder: disasterMock[0].title,
            url: `/${disasterMock[0].slug}`,
          },
          {
            placeholder: "Request help",
            url: "request-help",
          },
        ]}
        className="max-w-[800px]"
      />

      <h1 className="text-4xl text-center">Request Help</h1>
      <p className="text-center max-w-[800px]">
        This page is for requesting assistance following a natural disaster.
        This platform connects you with community members who are willing to
        lend a hand. Remember, requests for monetary aid are not permitted and
        will be removed. In the map below, pins that could help you are shown.
      </p>
      <Tabs
        options={["Map", "Request help"]}
        onTabChange={(index: number) => setCurrentTab(index)}
      />
      {currentTab === 0 && (
        <>
          <div className="requestHelpView-mapList">
            <MapReadPins
              givenPins={requestHelpPins}
              className="h-96 max-w-[800px] w-full sm:w-1/2"
              onPinClick={onPinClick}
              defaultCenter={disaster?.coordinates}
            />
            <div className="w-full sm:w-1/2 flex flex-col gap-2 h-96 overflow-y-auto p-2">
              {requestHelpPins.map((pin: IPin, index: number) => (
                <PinListItem
                  data={pin}
                  key={`request-help-pli-${index}`}
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
            title="Additional Information"
            className="flex flex-col gap-6 max-w-xl	"
          >
            {howToRequestHelp.map(
              (
                item: { title: string; description: string[] },
                index: number
              ) => (
                <div key={`modalRequestHelp-${index}`} className="w-full">
                  <p className="font-semibold">{item.title}</p>
                  <hr className="border border-solid border-green-primary w-full max-w-[800px] my-2" />
                  <ul>
                    {item.description.map((text: string, index: number) => (
                      <li
                        key={`modalRequestHelp-text-${index}`}
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

          <RequestHelpForm disaster={disaster} session={session} />
        </>
      )}
    </div>
  ) : (
    <div>Loading...</div>
  );
}
