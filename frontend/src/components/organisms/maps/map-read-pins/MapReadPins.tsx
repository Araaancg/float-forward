import { Map } from "@vis.gl/react-google-maps";
import { HTMLAttributes, useEffect, useState } from "react";
import PoiMarkers from "../poi-markers/PoiMarkers";
import { IPin } from "@/types/structures";
import { ICoordinates } from "@/types/interfaces";
import getUserLocation from "@/utils/functions/getUserLocation";
import "./map-read-pins.scss";

interface IMapReadPins extends HTMLAttributes<HTMLDivElement> {
  givenPins: IPin[];
  onPinClick: (pin: IPin) => void;
  defaultCenter?: ICoordinates;
  customPinColor?: string,
  disableDefaultUI?: boolean
}

const MapReadPins = ({
  givenPins,
  onPinClick,
  defaultCenter,
  customPinColor,
  disableDefaultUI = false,
  className,
  ...props
}: IMapReadPins) => {
  const [userLocation, setUserLocation] = useState<ICoordinates | undefined>();
  console.log("givenPins", givenPins)
  useEffect(() => {
    if (!defaultCenter) {
      getUserLocation().then((response) => {
        if (response) {
          setUserLocation(response);
        }
      });
    }
  }, [getUserLocation]);
  return (
    <div className={`customMap ${className}`}>
      <Map
        defaultZoom={12}
        defaultCenter={defaultCenter || userLocation}
        mapId="YOUR_MAP_ID"
        disableDefaultUI={disableDefaultUI}
      >
        <PoiMarkers pois={givenPins} onPinClick={onPinClick} customPinColor={customPinColor}/>
      </Map>
    </div>
  );
};

export default MapReadPins;
