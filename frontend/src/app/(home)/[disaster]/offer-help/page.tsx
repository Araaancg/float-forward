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
import "./offer-help.scss";
import { PinTypes } from "@/types/enums";
import OfferOwnHelpForm from "@/components/organisms/forms/OfferHelpForm/OfferHelpForm";

const howToOfferHelp = [
  {
    title: "Information Points",
    description: [
      "Clearly state the type of information being provided.",
      "Include specific details such as location, hours of operation, and contact information.",
      "Ensure the information is accurate and up-to-date.",
    ],
  },
  {
    title: "Collection Points",
    description: [
      "Specify the types of items being collected.",
      "Clearly indicate the drop-off location, hours of operation, and any specific instructions (e.g., clean donations, non-expired items).",
    ],
  },
  {
    title: "Direct Help",
    description: [
      "Clearly state the type of assistance you are offering.",
      "If applicable, mention your qualifications or experience in the field.",
      "Be mindful of your availability and capacity to assist.",
    ],
  },
  {
    title: "General Tips",
    description: [
      "Be clear and concise in your offerings.",
      "Be respectful and considerate of the needs of others.",
      "If you are no longer able to offer assistance, please update your post accordingly.",
      "This platform is designed to facilitate community support and collaboration.",
      "We appreciate your willingness to help during this difficult time.",
    ],
  },
];

export default function OfferHelpView() {
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

  const offerHelpPins = useMemo(() => {
    if (disaster && disaster?.pins) {
      return disaster.pins.filter(
        (pin: IPin) => pin.type.title === PinTypes.HELP_REQUEST
      );
    } else return [];
  }, [disaster]);

  const [showOwnHelpModal, setShowOwnHelpModal] = useState<boolean>(false);
  const { selectedPin, onPinClick, removePinParam } =
    usePinManagement(offerHelpPins);

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
    <div className="helpOfferView">
      <Breadcrumbs
        links={[
          {
            placeholder: disasterMock[0].title,
            url: `/${disasterMock[0].slug}`,
          },
          {
            placeholder: "Offer Help",
            url: "offer-help",
          },
        ]}
        className="max-w-[800px]"
      />

      <h1 className="text-4xl text-center">Offer Help</h1>
      <p className="text-center max-w-[800px]">
        This page allows you to offer your assistance to those affected by the
        disaster. You can share information, designate your location as a
        collection point, or offer your skills and services directly.
      </p>
      <Tabs
        options={["Map", "Offer my own help"]}
        onTabChange={(index: number) => setCurrentTab(index)}
      />
      {currentTab === 0 && (
        <>
          <div className="helpOfferView-mapList">
            <MapReadPins
              givenPins={offerHelpPins}
              className="h-96 max-w-[800px] w-full sm:w-1/2"
              onPinClick={onPinClick}
              defaultCenter={disaster?.coordinates}
            />
            <div className="w-full sm:w-1/2 flex flex-col gap-2 h-96 overflow-y-auto p-2">
              {offerHelpPins.map((pin: IPin, index: number) => (
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
            Fill in the form to make an offer
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
            title="Offering Help: Additional Information"
            className="flex flex-col gap-6 max-w-xl	"
          >
            {howToOfferHelp.map(
              (
                item: { title: string; description: string[] },
                index: number
              ) => (
                <div key={`modalOfferHelp-${index}`} className="w-full">
                  <p className="font-semibold">{item.title}</p>
                  <hr className="border border-solid border-green-primary w-full max-w-[800px] my-2" />
                  <ul>
                    {item.description.map((text: string, index: number) => (
                      <li
                        key={`modalOfferHelp-text-${index}`}
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

          <OfferOwnHelpForm disaster={disaster} session={session} />
        </>
      )}
    </div>
  ) : (
    <div>Loading...</div>
  );
}
