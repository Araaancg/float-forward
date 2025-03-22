import XMarkIcon from "@/components/atoms/icons/XMarkIcon";
import Button from "@/components/atoms/button/Button";
import theme from "@/theme";
import { useMemo } from "react";
import MailIcon from "@/components/atoms/icons/MailIcon";
import UserIcon from "@/components/atoms/icons/UserIcon";
import SeeMoreP from "@/components/atoms/see-more-p/SeeMoreP";
import MapReadPins from "@/components/organisms/maps/map-read-pins/MapReadPins";
import { PinTypes, pinTypesCrossColor } from "@/types/enums";
import { IPin } from "@/types/structures";
import handleMapsRedirect from "@/utils/functions/handleMapsRedirect";
import getPinColor from "@/utils/functions/getPinColor";
import "./pin-card.scss";

export default function PinCard({
  data,
  onClose,
  isOwn,
}: {
  data: IPin;
  onClose: () => void;
  isOwn: boolean;
}) {
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
          disabled={isOwn}
          isLink={!isOwn}
          linkProps={{
            href: `/chat?pin=${data._id}&receiver=${data.user._id}`,
          }}
        >
          Send message
        </Button>
      </div>
    </div>
  );
}
