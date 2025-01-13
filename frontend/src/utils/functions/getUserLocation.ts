import { ICoordinates } from "@/types/interfaces";

export default function getUserLocation(): Promise<ICoordinates> {
  if (navigator.geolocation) {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          resolve({ lat: latitude, lng: longitude });
        },
        (error) => {
          console.error("Error getting location:", error);
          reject(error);
        }
      );
    });
  } else {
    console.error("Geolocation is not supported by this browser.");
    return Promise.reject(new Error("Geolocation not supported"));
  }
}
