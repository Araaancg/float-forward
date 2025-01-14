import MapPinIcon from "@/components/atoms/icons/MapPinIcon";
import theme from "@/theme";
import { PinTypes, pinTypesCrossColor } from "@/types/enums";
import { IPin } from "@/types/structures";
import { Marker, MarkerClusterer } from "@googlemaps/markerclusterer";
import { AdvancedMarker, useMap } from "@vis.gl/react-google-maps";
import { useCallback, useEffect, useRef, useState } from "react";

function filterPinsByCoordinates(
  pins: IPin[],
  lat: number,
  lng: number
): IPin | undefined {
  return pins.find(
    (pin) => pin.coordinates.lat === lat && pin.coordinates.lng === lng
  );
}

const PoiMarkers = ({
  pois,
  onPinClick,
  customPinColor,
}: {
  pois: IPin[];
  onPinClick: (pin: IPin) => void;
  customPinColor?: string;
}) => {
  const map = useMap();
  const [markers, setMarkers] = useState<{ [key: string]: Marker }>({});
  const clusterer = useRef<MarkerClusterer | null>(null);
  const handleClick = useCallback((ev: google.maps.MapMouseEvent) => {
    if (!map) return;
    if (!ev.latLng) return;
    const marker = filterPinsByCoordinates(
      pois,
      ev.latLng.toJSON().lat,
      ev.latLng.toJSON().lng
    );
    // console.log("marker clicked:", marker);
    if (marker) onPinClick(marker);
    map.panTo(ev.latLng);
  }, []);

  // Initialize MarkerClusterer, if the map has changed
  useEffect(() => {
    if (!map) return;
    if (!clusterer.current) {
      clusterer.current = new MarkerClusterer({ map });
    }
  }, [map]);

  // Update markers, if the markers array has changed
  useEffect(() => {
    clusterer.current?.clearMarkers();
    clusterer.current?.addMarkers(Object.values(markers));
  }, [markers]);

  const setMarkerRef = (marker: Marker | null, key: string) => {
    if (marker && markers[key]) return;
    if (!marker && !markers[key]) return;

    setMarkers((prev) => {
      if (marker) {
        return { ...prev, [key]: marker };
      } else {
        const newMarkers = { ...prev };
        delete newMarkers[key];
        return newMarkers;
      }
    });
  };
  console.log("pois", pois);

  return (
    <>
      {pois.map((poi: IPin) => (
        <AdvancedMarker
          key={poi._id}
          position={{ lat: poi.coordinates.lat, lng: poi.coordinates.lng }}
          ref={(marker) => setMarkerRef(marker, poi._id)}
          clickable={true}
          onClick={handleClick}
        >
          <MapPinIcon
            color={
              customPinColor ||
              pinTypesCrossColor[poi.type.title as PinTypes] ||
              theme.extend.colors.black.primary
            }
            size={28}
            filled
          />
        </AdvancedMarker>
      ))}
    </>
  );
};

export default PoiMarkers;
