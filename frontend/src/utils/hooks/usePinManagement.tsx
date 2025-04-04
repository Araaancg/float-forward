import { useState, useEffect } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { IPin } from "@/types/structures";
import { useApi } from "./useApi";

const usePinManagement = (pinsList: IPin[] | undefined) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname().split("/");
  const { callApi, loading, error } = useApi();

  // State to manage selected pin
  const [selectedPin, setSelectedPin] = useState<IPin | null>(null);

  // Function to update the URL search params
  const updateSearchParam = (key: string, value: string | null) => {
    const newSearchParams = new URLSearchParams(searchParams);
    if (value) {
      newSearchParams.set(key, value);
    } else {
      newSearchParams.delete(key);
    }
    router.push(
      `${pathname.join("/")}${
        newSearchParams.toString() ? `?${newSearchParams.toString()}` : ""
      }`
    );
  };

  // Function to add pin ID to search params
  const addPinParam = (pinId: string) => updateSearchParam("pin", pinId);

  // Function to remove pin ID from search params
  const removePinParam = () => updateSearchParam("pin", null);

  // Handle selecting a pin
  const onPinClick = (pin: IPin) => {
    addPinParam(pin._id);
  };

  // Check the URL for the selected pin and update state accordingly
  useEffect(() => {
    const pinId = searchParams.get("pin");

    if (!pinId) {
      setSelectedPin(null);
      return;
    }

    // If we have the pinsList, search there first
    if (pinsList) {
      const pinInfo = pinsList.find((pin) => pin._id === pinId);
      if (pinInfo) {
        setSelectedPin(pinInfo);
        return;
      }
    }

    // If we don't have pinsList or didn't find the pin there, fetch it
    const fetchPin = async () => {
      try {
        const response = await callApi(`/api/pins?_id=${pinId}`, {
          method: "GET",
        });

        if (response.success && response.data && response.data.length > 0) {
          setSelectedPin(response.data[0]);
        } else {
          console.log("Pin not found");
          setSelectedPin(null);
        }
      } catch (error) {
        console.error("Error fetching pin:", error);
        setSelectedPin(null);
      }
    };

    fetchPin();
  }, [searchParams, pinsList, callApi]);

  return {
    selectedPin,
    onPinClick,
    removePinParam,
    loading,
    error
  };
};

export default usePinManagement;