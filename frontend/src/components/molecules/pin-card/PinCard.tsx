"use client"
import XMarkIcon from "@/components/atoms/icons/XMarkIcon";
import Button from "@/components/atoms/button/Button";
import theme from "@/theme";
import { useMemo, useState } from "react";
import MailIcon from "@/components/atoms/icons/MailIcon";
import UserIcon from "@/components/atoms/icons/UserIcon";
import SeeMoreP from "@/components/atoms/see-more-p/SeeMoreP";
import MapReadPins from "@/components/organisms/maps/map-read-pins/MapReadPins";
import { PinStatus, PinTypes, pinTypesCrossColor } from "@/types/enums";
import { IPin, IUser } from "@/types/structures";
import handleMapsRedirect from "@/utils/functions/handleMapsRedirect";
import getPinColor from "@/utils/functions/getPinColor";
import "./pin-card.scss";
import Modal from "../modal/Modal";

export default function PinCard({
  data,
  onClose,
  isOwn,
  closePin,
  editPin,
}: {
  data: IPin;
  onClose: () => void;
  isOwn: boolean;
  closePin?: (pin: IPin) => void;
  editPin?: (pin: IPin) => void;
}) {
  const [showConfirmCloseModal, setShowConfirmCloseModal] = useState<boolean>(false)
  const pinColor = useMemo(() => getPinColor(data), [data.type.title]);

  const onPinClick = (pin: IPin) => {
    handleMapsRedirect(pin.coordinates.lat, pin.coordinates.lng);
  };

  return (
    <div className="pinInfo">
      <div
        className={`pinInfo-card ${
          pinTypesCrossColor[data.type.title as PinTypes]
        }`}
      >
        <section className="pinInfo-card-header">
          <div className="flex flex-row gap-2 justify-center items-center">
            <span className={`color-${pinColor}`}>{data.type.title}</span>
            {isOwn && <span className="pinInfo-own">Yours</span>}
            {data.status === PinStatus.CLOSED && (
              <span className="pinInfo-closed">Closed</span>
            )}
          </div>
          <Button variant="no-color" onClick={onClose}>
            <XMarkIcon color={theme.extend.colors.black.primary} />
          </Button>
        </section>

        <section className="pinInfo-card-info">
          <h3 className="pinInfo-card-info-title">{data.title}</h3>
          <p className="pinInfo-card-info-description">{data.description}</p>
          {data.additionalInfo && (
            <>
              <h4 className="subtitle">Additional Information</h4>
              <SeeMoreP text={data.additionalInfo} />
            </>
          )}
        </section>

        <section className="pinInfo-card-address">
          <h4 className="subtitle">Address</h4>
          <p>{data.address}</p>
          <div className="relative w-full h-60 mt-4">
            <MapReadPins
              givenPins={[data]}
              onPinClick={onPinClick}
              className="w-full h-full"
              defaultCenter={{
                lat: data.coordinates.lat,
                lng: data.coordinates.lng,
              }}
              customPinColor="red"
              disableDefaultUI={true}
            />
          </div>
        </section>

        {!isOwn ? (
          <>
            <section className="pinInfo-card-contact">
              <h4 className="subtitle">Contact Information</h4>
              <p className="flex gap-3">
                <UserIcon color={theme.extend.colors.pins[pinColor].primary} />
                {data.user.name}
              </p>
              <p className="flex gap-3">
                <MailIcon color={theme.extend.colors.pins[pinColor].primary} />
                {data.user.email}
              </p>
            </section>

            <Button
              isFullWidth
              color={pinColor}
              isLink
              linkProps={{
                href: `/chat?pin=${data._id}&receiver=${data.user._id}`,
              }}
            >
              Send message
            </Button>
          </>
        ) : (
          data?.contacts &&
          data?.contacts?.length > 0 && (
            <section className="pinInfo-card-contact">
              <h4 className="subtitle">Your were contacted by</h4>
              {data?.contacts!.map((c: IUser, index: number) => (
                <Button
                  className="flex gap-3"
                  variant="no-color"
                  color="black"
                  isLink
                  linkProps={{
                    href: `/chat?pin=${data._id}&receiver=${data.user._id}`,
                  }}
                >
                  <UserIcon
                    color={theme.extend.colors.pins[pinColor].primary}
                  />
                  {c.name}
                </Button>
              ))}
            </section>
          )
        )}
        {isOwn && data.status === PinStatus.ACTIVE && (
          <section className="pinInfo-card-options">
            <Button
              variant="primary"
              color="green"
              isFullWidth
              onClick={() => editPin && editPin(data)}
            >
              Edit pin
            </Button>
            <Button
              variant="primary"
              color="yellow"
              isFullWidth
              onClick={() => setShowConfirmCloseModal(true)}
            >
              Close pin
            </Button>

            <Modal
              onClose={() => setShowConfirmCloseModal(false)}
              isOpen={showConfirmCloseModal}
              title="Confirm Action"
              className="flex flex-col gap-6 max-w-xl	"
            >
              <p>Are you sure you want to close this pin?</p>
              <Button
                variant="primary"
                color="red"
                onClick={() => closePin && closePin(data)}
                isFullWidth
              >
                Confirm
              </Button>
            </Modal>
          </section>
        )}
      </div>
    </div>
  );
}
