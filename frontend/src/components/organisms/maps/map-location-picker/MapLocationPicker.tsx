import { AdvancedMarker, Map, MapMouseEvent } from "@vis.gl/react-google-maps";
import { useState, useCallback, useEffect } from "react";
import MapPinIcon from "@/components/atoms/icons/MapPinIcon";
import theme from "@/theme";
import { ICoordinates, ILocation } from "@/types/interfaces";
import getUserLocation from "@/utils/functions/getUserLocation";
import "./map-location-picker.scss";

interface IMapLocationPicker {
  defaultLocation?: ILocation;
  onLocationSelect?: (location: ILocation) => void;
  label?: string;
  className?: string;
}

const MapLocationPicker = ({
  defaultLocation = { lat: -33.860664, lng: 151.208138 },
  onLocationSelect,
  label,
  className,
}: IMapLocationPicker) => {
  const [selectedLocation, setSelectedLocation] = useState<ILocation | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(false);

  const getAddressFromCoordinates = async (lat: number, lng: number) => {
    try {
      const geocoder = new google.maps.Geocoder();
      const response = await geocoder.geocode({
        location: { lat, lng },
      });

      if (response.results[0]) {
        return response.results[0].formatted_address;
      }
      return "Address not found";
    } catch (error) {
      console.error("Error getting address:", error);
      return "Error getting address";
    }
  };

  const handleMapClick = useCallback(
    (event: MapMouseEvent) => {
      // Access coordinates from event.detail instead of event.latLng
      const lat = event.detail.latLng?.lat!;
      const lng = event.detail.latLng?.lng!;

      setIsLoading(true);

      getAddressFromCoordinates(lat, lng)
        .then((address) => {
          const newLocation = { lat, lng, address };
          setSelectedLocation(newLocation);
          onLocationSelect?.(newLocation);
        })
        .catch((error) => {
          console.error("Error handling map click:", error);
        })
        .finally(() => {
          setIsLoading(false);
        });
    },
    [onLocationSelect]
  );

  const [userLocation, setUserLocation] =
    useState<ICoordinates>(defaultLocation);

  useEffect(() => {
    getUserLocation().then((response) => {
      if (response) {
        setUserLocation(response);
      }
    });
  }, [getUserLocation]);

  return (
    <div className={`w-full ${className}`}>
      <div className="mb-4">
        {label && (
          <label>
            <h5 className={`font-semibold`}>{label}</h5>
          </label>
        )}
        <p className="text-sm text-grey">
          Please select a place on the map and then confirm the address write
          below.
        </p>
      </div>

      <div className="mb-4">
        {selectedLocation && !isLoading && (
          <p>Selected Address: {selectedLocation.address}</p>
        )}
        {isLoading && <p>Loading location details...</p>}
      </div>

      <Map
        defaultZoom={13}
        defaultCenter={userLocation}
        mapId="YOUR_MAP_ID"
        onClick={handleMapClick}
        className="w-full h-96"
      >
        {selectedLocation && (
          <AdvancedMarker
            position={{ lat: selectedLocation.lat, lng: selectedLocation.lng }}
          >
            <MapPinIcon
              color={theme.extend.colors.pins.red.primary}
              size={28}
              filled
            />
          </AdvancedMarker>
        )}
      </Map>
    </div>
  );
};

export default MapLocationPicker;
