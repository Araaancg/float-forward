import { Map } from "@vis.gl/react-google-maps";
import { HTMLAttributes, useEffect, useRef, useState } from "react";
import PoiMarkers from "../poi-markers/PoiMarkers";
import { IPin } from "@/types/structures";
import { ICoordinates } from "@/types/interfaces";
import getUserLocation from "@/utils/functions/getUserLocation";
import "./map-read-pins.scss";

interface IMapReadPins extends HTMLAttributes<HTMLDivElement> {
  givenPins: IPin[];
  onPinClick: (pin: IPin) => void;
  defaultCenter?: ICoordinates;
  customPinColor?: string;
  disableDefaultUI?: boolean;
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
  const locationFetchedRef = useRef(false);
  const [userLocation, setUserLocation] = useState<ICoordinates | undefined>();

  useEffect(() => {
    const fetchLocation = async () => {
      if (!defaultCenter && !locationFetchedRef.current) {
        locationFetchedRef.current = true;
        const location = await getUserLocation();
        if (location) {
          setUserLocation(location);
        }
      }
    };

    fetchLocation();
  }, []); 

  return (
    <div className={`customMap ${className}`} {...props}>
      <Map
        defaultZoom={12}
        defaultCenter={defaultCenter || userLocation}
        mapId="YOUR_MAP_ID"
        disableDefaultUI={disableDefaultUI}
      >
        <PoiMarkers 
          pois={givenPins} 
          onPinClick={onPinClick} 
          customPinColor={customPinColor} 
        />
      </Map>
    </div>
  );
};

export default MapReadPins;