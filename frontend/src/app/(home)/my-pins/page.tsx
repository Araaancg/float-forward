"use client";
import Breadcrumbs from "@/components/atoms/breadcrumbs/Breadcrumbs";
import Button from "@/components/atoms/button/Button";
import ExclamationMarkIcon from "@/components/atoms/icons/ExclamationMarkIcon";
import Loader from "@/components/atoms/loader/Loader";
import Tabs from "@/components/atoms/tabs/Tabs";
import PinListItem from "@/components/molecules/list-items/pin-list-item/PinListItem";
import PinCard from "@/components/molecules/pin-card/PinCard";
import MapReadPins from "@/components/organisms/maps/map-read-pins/MapReadPins";
import theme from "@/theme";
import { IDisasters, IPin } from "@/types/structures";
import { useApi } from "@/utils/hooks/useApi";
import { useAuth } from "@/utils/hooks/useAuth";
import usePinManagement from "@/utils/hooks/usePinManagement";
import { useEffect, useMemo, useState } from "react";
import Modal from "@/components/molecules/modal/Modal";
import { PinStatus } from "@/types/enums";
import "./my-pins.scss";
import EditPinForm from "@/components/organisms/forms/EditPinForm/EditPinForm";

const myPinsInfo = [
  {
    title: "Overview",
    description: [
      "This page provides a centralized location to manage all the pins you have created across different disaster events.",
      "Your pins are automatically sorted by the disaster they are associated with.",
      "Use the tabs at the top of the page to switch between different disaster events.",
    ],
  },
  {
    title: "Important Notes:",
    description: [
      "Please keep your pins updated to reflect the current situation.",
      "Deleting a pin is permanent and cannot be undone.",
      "If you have resolved a help request, or found a missing person/item, please close the pin.",
      "Closing a pin helps to keep the information on the platform current.",
    ],
  },
];

export default function MyPins() {
  const [data, setData] = useState<IDisasters[]>();
  const [selectedDisaster, setSelectedDisaster] = useState<IDisasters>();
  const { sessionLoading, session } = useAuth();
  const { callApi, loading, error } = useApi(session);

  useEffect(() => {
    const fetchMyPins = async () => {
      if (session) {
        const response = await callApi(`/api/pins/me`, {
          method: "GET",
          requiresAuth: true,
        });

        if (response.success && response.data) {
          setData(response.data);
          setSelectedDisaster(response.data[0]);
        }
      }
    };

    fetchMyPins();
  }, [session]);

  const [showOwnHelpModal, setShowOwnHelpModal] = useState<boolean>(false);
  const [showEditPinModal, setShowEditPinModal] = useState<boolean>(false);
  const { selectedPin, onPinClick, removePinParam } = usePinManagement(
    selectedDisaster?.pins
  );

  const disastersNames = useMemo(() => {
    return [
      ...new Set(
        data?.map((disaster: IDisasters) => disaster.title.toString())
      ),
    ];
  }, [data]);

  const onCardClick = (pin: IPin) => {
    onPinClick(pin);
  };

  const closePin = async (pin: IPin) => {
    const response = await callApi(`/api/pins`, {
      method: "PUT",
      requiresAuth: true,
      body: { status: PinStatus.CLOSED, _id: pin._id },
    });

    if (response.success && response.data) {
    }
  };

  const editPin = () => {
    setShowEditPinModal(true);
  };

  if (loading || sessionLoading) {
    return <Loader view="pin" />;
  }

  if (error) {
    <p>Error: {error}</p>;
  }

  return data ? (
    <div className="myPinsView">
      <Breadcrumbs
        links={[
          {
            placeholder: "My Pins",
            url: "my-pins",
          },
        ]}
        className="max-w-[800px]"
      />

      <Modal
        onClose={() => setShowOwnHelpModal(!showOwnHelpModal)}
        isOpen={showOwnHelpModal}
        title="Offering Help: Additional Information"
        className="flex flex-col gap-6 max-w-xl	"
      >
        {myPinsInfo.map(
          (item: { title: string; description: string[] }, index: number) => (
            <div key={`myPinsView-${index}`} className="w-full">
              <p className="font-semibold">{item.title}</p>
              <hr className="border border-solid border-green-primary w-full max-w-[800px] my-2" />
              <ul>
                {item.description.map((text: string, index: number) => (
                  <li
                    key={`myPinsView-text-${index}`}
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

      <h1 className="text-4xl text-center flex gap-3 justify-start items-center">
        My Pins{" "}
        <Button
          variant="no-color"
          onClick={() => setShowOwnHelpModal(!showOwnHelpModal)}
        >
          <ExclamationMarkIcon color={theme.extend.colors.green.primary} />
        </Button>
      </h1>
      <p className="text-center max-w-[800px]">
        This page displays all pins you have created, organized by disaster. Use
        the tabs above to navigate between different disaster events. Pins
        marked as "Closed" indicate that they are no longer active. From here,
        you can edit or delete your existing pins.
      </p>
      <Tabs
        options={disastersNames}
        onTabChange={(index: number) => {
          setSelectedDisaster(data[index]);
        }}
      />
      <div className="myPinsView-mapList">
        <MapReadPins
          givenPins={selectedDisaster?.pins!}
          className="h-96 max-w-[800px] w-full sm:w-1/2"
          onPinClick={onPinClick}
          defaultCenter={selectedDisaster?.coordinates}
        />
        <div className="w-full sm:w-1/2 flex flex-col gap-2 h-96 overflow-y-auto p-2">
          {selectedDisaster?.pins!.map((pin: IPin, index: number) => (
            <PinListItem
              data={pin}
              key={`mypins-pli-${index}`}
              onCardClick={onCardClick}
              isOwn={session?.user._id === pin.user._id}
            />
          ))}
        </div>
      </div>

      {/* PIN CARD - conditionally rendered based on URL parameter */}
      {selectedPin && (
        <PinCard
          data={selectedPin}
          onClose={removePinParam}
          isOwn={session?.user._id === selectedPin.user._id}
          closePin={closePin}
          editPin={editPin}
        />
      )}
       <Modal
        onClose={() => setShowEditPinModal(!showEditPinModal)}
        isOpen={showEditPinModal}
        title="Edit pin information"
        className="flex flex-col gap-6 max-w-3xl"
      >
        <EditPinForm pinData={selectedPin!} disaster={selectedDisaster!} session={session}/>
      </Modal>
    </div>
  ) : (
    <div>Loading...</div>
  );
}
