import PriorityIcon from "@/components/atoms/icons/PriorityIcon";
import { IPin } from "@/types/structures";
import SeeMoreP from "@/components/atoms/see-more-p/SeeMoreP";
import MapReadPins from "@/components/organisms/maps/map-read-pins/MapReadPins";
import handleMapsRedirect from "@/utils/functions/handleMapsRedirect";
import "./help-request-item.scss";

export default function HelpRequestItem({ data }: { data: IPin }) {

  const onPinClick = (pin: IPin) => {
    handleMapsRedirect(pin.coordinates.lat, pin.coordinates.lng);
  };

  return (
    <div className="hritem">
      <div className="hritem-info w-1/2">
        <div>
          <h4 className="text-base font-normal mb-4">{data.title}</h4>
          <SeeMoreP
            text={data.description}
            size="sm"
            className="text-sm"
            buttonClassName="text-sm"
          />
        </div>
        <div className="flex gap-3 text-[10px]">
          <span className="flex justify-center items-center gap-2">
            <PriorityIcon size={16} />
            {data.priority}
          </span>
          {/* <span className="flex justify-center items-center gap-2">
            <HouseIcon size={16} />
            Locality
          </span> */}
        </div>
      </div>
      <div className="hritem-map w-1/2 h-64	">
        <div className="w-full h-full">
          <MapReadPins
            givenPins={[data]}
            onPinClick={onPinClick}
            className="w-full h-full"
            defaultCenter={{ lat: data.coordinates.lat, lng: data.coordinates.lng }}
            customPinColor="red"
            disableDefaultUI={true}
          />
        </div>
        <span className="text-[12px]">{data.address}</span>
      </div>
    </div>
  );
}
