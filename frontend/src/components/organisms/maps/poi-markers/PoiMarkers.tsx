import MapPinIcon from "@/components/atoms/icons/MapPinIcon";
import theme from "@/theme";
import { PinTypes, pinTypesCrossColor } from "@/types/enums";
import { IPin } from "@/types/structures";
import { Marker, MarkerClusterer } from "@googlemaps/markerclusterer";
import { AdvancedMarker, useMap } from "@vis.gl/react-google-maps";
import { useCallback, useRef } from "react";

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
  const markersRef = useRef<{ [key: string]: Marker }>({});
  const clustererRef = useRef<MarkerClusterer | null>(null);
  
  // Initialize clusterer once when map is available
  if (map && !clustererRef.current) {
    clustererRef.current = new MarkerClusterer({ map });
  }

  const handleClick = useCallback((ev: google.maps.MapMouseEvent) => {
    if (!map || !ev.latLng) return;
    
    const marker = filterPinsByCoordinates(
      pois,
      ev.latLng.toJSON().lat,
      ev.latLng.toJSON().lng
    );
    
    if (marker) onPinClick(marker);
    map.panTo(ev.latLng);
  }, [map, pois, onPinClick]);

  const setMarkerRef = useCallback((marker: Marker | null, key: string) => {
    const currentMarker = markersRef.current[key];
    
    // Do nothing if the marker reference hasn't changed
    if ((marker && currentMarker) || (!marker && !currentMarker)) return;
    
    // Update the markers ref and update the clusterer
    if (marker) {
      markersRef.current[key] = marker;
    } else {
      delete markersRef.current[key];
    }
    
    // Update the clusterer with the current markers
    if (clustererRef.current) {
      clustererRef.current.clearMarkers();
      clustererRef.current.addMarkers(Object.values(markersRef.current));
    }
  }, []);

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