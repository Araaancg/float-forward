export default function handleMapsRedirect(
  latitude: number,
  longitude: number
) {
  // Construct the Google Maps URL for directions
  const googleMapsUrl = `https://www.google.com/maps/dir/?api=1&origin=current+location&destination=${latitude},${longitude}`;
  window.open(googleMapsUrl, "_blank"); // Opens in a new tab
}
