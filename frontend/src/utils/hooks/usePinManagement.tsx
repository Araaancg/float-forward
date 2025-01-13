import { useState, useEffect } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { IPin } from "@/types/structures";
import { pinListMock } from "@/mocks/pins";

const usePinManagement = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname().split("/");

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
    router.push(`${pathname.join("/")}${newSearchParams.toString() ? `?${newSearchParams.toString()}` : ""}`);
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
    if (pinId) {
      const pinInfo = pinListMock.find((pin) => pin._id === pinId);
      if (pinInfo) setSelectedPin(pinInfo);
    } else {
      setSelectedPin(null);
    }
  }, [searchParams]);

  return {
    selectedPin,
    onPinClick,
    removePinParam,
  };
};

export default usePinManagement;
