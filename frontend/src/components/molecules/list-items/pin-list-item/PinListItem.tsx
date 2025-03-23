import PriorityIcon from "@/components/atoms/icons/PriorityIcon";
import { IPin } from "@/types/structures";
import SeeMoreP from "@/components/atoms/see-more-p/SeeMoreP";
import MapReadPins from "@/components/organisms/maps/map-read-pins/MapReadPins";
import handleMapsRedirect from "@/utils/functions/handleMapsRedirect";
import getPinColor from "@/utils/functions/getPinColor";
import { useMemo } from "react";
import { PinStatus } from "@/types/enums";
import "./pin-list-item.scss";

export default function PinListItem({
  data,
  onCardClick,
  isOwn,
}: {
  data: IPin;
  onCardClick: (pin: IPin) => void;
  isOwn: boolean;
}) {
  const onPinClick = (pin: IPin) => {
    handleMapsRedirect(pin.coordinates.lat, pin.coordinates.lng);
  };

  const pinColor = useMemo(() => getPinColor(data), [data.type.title]);

  return (
    <div className="plitem" onClick={() => onCardClick(data)}>
      <div className="plitem-info w-3/5">
        <div>
          <span className={`plitem-type color-${pinColor}`}>
            {data.type.title}
          </span>
          {isOwn && <span className="plitem-own">Yours</span>}
          {data.status ===  PinStatus.CLOSED && <span className="plitem-closed">Closed</span>}
          <h4 className="text-base font-normal mb-4 mt-2">{data.title}</h4>
          <SeeMoreP
            text={data.description}
            size="sm"
            className="text-sm"
            buttonClassName="text-sm"
            quantityShown={70}
          />
        </div>
        <div className="flex gap-3 text-[10px]">
          <span className="flex justify-center items-center gap-2">
            <PriorityIcon size={16} />
            {data.priority || "Medium "}
          </span>
        </div>
      </div>
      <div className="plitem-map w-2/5 h-40">
        <div className="w-full h-full">
          <MapReadPins
            givenPins={[data]}
            onPinClick={onPinClick}
            className="w-full h-full"
            defaultCenter={{
              lat: data.coordinates.lat,
              lng: data.coordinates.lng,
            }}
            customPinColor={getPinColor(data!)}
            disableDefaultUI={true}
          />
        </div>
        <span className="text-[12px]">{data.address}</span>
      </div>
    </div>
  );
}
