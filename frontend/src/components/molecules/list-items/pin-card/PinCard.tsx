import { IPin, TActionTypes } from "@/interfaces";
import XMarkIcon from "@/components/atoms/icons/XMarkIcon";
import Button from "@/components/atoms/button/Button";
import "./pin-card.scss";
import theme from "@/theme";
import { useMemo, useState } from "react";
import MailIcon from "@/components/atoms/icons/MailIcon";
import UserIcon from "@/components/atoms/icons/UserIcon";
import Image from "next/image";

type PinColorType = keyof typeof theme.extend.colors.pins;

const pinTypesCrossColor: Record<TActionTypes, PinColorType> = {
  "Help Request": "yellow",
  "Collection Point": "lightBlue",
  "Medical Point": "red",
  "Missings": "black",
  "Help Offer": "green",
  "Information Point": "darkBlue",
};

export default function PinCard({ data, onClose }: { data: IPin, onClose: () => void }) {
  const [showInfo, setShowInfo] = useState<boolean>(false);

  const pinColor = useMemo(
    () => pinTypesCrossColor[data.type.title as TActionTypes],
    [data.type.title]
  );

  return (
    <div className="pinInfo">
      <div
        className={`pinInfo-card ${
          pinTypesCrossColor[data.type.title as TActionTypes]
        }`}
      >
        <section className="pinInfo-card-header">
          <span className={`color-${pinColor}`}>{data.type.title}</span>
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
              <p>
                {showInfo
                  ? data.additionalInfo
                  : data.additionalInfo.slice(0, 150)}
                <Button
                  onClick={() => setShowInfo(!showInfo)}
                  variant="no-color"
                  color={pinColor}
                >
                  {showInfo ? "See less" : "See more"}
                </Button>
              </p>
            </>
          )}
        </section>

        <section className="pinInfo-card-address">
          <h4 className="subtitle">Address</h4>
          <p>{data.address}</p>
          <div className="relative w-full h-60 mt-4">
            <Image
              src="/map-small.png"
              alt="google map"
              fill
              className="object-cover"
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

        <Button isFullWidth color={pinColor}>
          Send message
        </Button>
      </div>
    </div>
  );
}
