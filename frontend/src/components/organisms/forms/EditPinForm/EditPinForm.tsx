"use client";
import TextField from "@/components/molecules/inputs/text-field/TextField";
import { useForm } from "react-hook-form";
import Button from "@/components/atoms/button/Button";
import { yupResolver } from "@hookform/resolvers/yup";
import TextArea from "@/components/molecules/inputs/textarea/TextArea";
import MapLocationPicker from "../../maps/map-location-picker/MapLocationPicker";
import { useEffect, useState } from "react";
import { schema } from "./edit-pin-form";
import { IDisasters, IPin } from "@/types/structures";
import { useApi } from "@/utils/hooks/useApi";
import { useFeedback } from "@/context/feedbackContext";
import Toast from "@/components/molecules/toast/Toast";
import Loader from "@/components/atoms/loader/Loader";

export default function EditPinForm({
  disaster,
  pinData,
  session,
}: {
  disaster: IDisasters;
  pinData: IPin;
  session: any;
}) {
  const { callApi, loading, error } = useApi(session);
  const { toast, showToast, resetToast } = useFeedback();

  const {
    register,
    reset,
    handleSubmit,
    setValue,
    formState: { errors, isValid },
  } = useForm<any>({
    mode: "all",
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    if (pinData) {
      setValue("title", pinData?.title);
      setValue("description", pinData?.description);
      setValue("additionalInfo", pinData?.additionalInfo);
      setSelectedPlace({
        latitude: pinData?.coordinates?.lat,
        longitude: pinData?.coordinates?.lng,
        address: pinData?.address,
      });
    }
  }, [pinData]);

  const [selectedPlace, setSelectedPlace] = useState<{
    latitude: number;
    longitude: number;
    address: string;
  } | null>();

  const handlePlaceSelect = (place: {
    address?: string;
    lat?: number;
    lng?: number;
  }) => {
    setSelectedPlace({
      latitude: place?.lat!,
      longitude: place?.lng!,
      address: place?.address!,
    });
  };

  const sendData = async (data: any) => {
    try {
      if (!selectedPlace) {
        showToast(
          "error",
          "Incomplete information",
          "Please select a location in the map"
        );
        return;
      } else {
        data["_id"] = pinData._id;
        data["coordinates"] = {
          lat: selectedPlace?.latitude,
          lng: selectedPlace?.longitude,
        };
        data["address"] = selectedPlace?.address;
        data["disaster"] = disaster._id;

        const response = await callApi(`/api/pins`, {
          method: "PUT",
          requiresAuth: true,
          body: data,
        });
        if (response.success) {
          showToast("success", "Success!", "Pin edited successfully.");
          reset();
        } else {
          throw Error;
        }
      }
    } catch (e) {
      showToast(
        "error",
        "Oh no!",
        `Something went wrong when editing this pin. Try again later. Error: ${e}`
      );
    }
  };

  if (loading || !pinData) {
    return <Loader view="form" />;
  }

  if (error) {
    <p>Error: {error}</p>;
  }

  return (
    <form
      className="w-full flex flex-col gap-4 max-w-[800px]"
      onSubmit={handleSubmit(sendData)}
    >
      <Toast
        variant={toast.variant}
        content={toast.content}
        showToast={toast.showToast}
        onClose={resetToast}
      />
      <TextField
        register={register}
        errors={errors}
        name="title"
        type="text"
        placeholder="Title of the pin"
        label="Title"
      />
      <TextArea
        register={register}
        errors={errors}
        name="description"
        type="text"
        placeholder="Description of information to be provided, please be as clear as possible"
        label="Description"
      />
      <MapLocationPicker
        onLocationSelect={handlePlaceSelect}
        label="Select a location"
        defaultCenter={disaster?.coordinates}
        defaultPin={{
          lat: pinData?.coordinates?.lat,
          lng: pinData?.coordinates?.lng,
        }}
      />
      <TextArea
        register={register}
        errors={errors}
        name="additionalInformation"
        type="text"
        placeholder="Any additional information needed"
        label="Additional Information"
      />
      <Button isFullWidth disabled={!isValid} type="submit">
        Update pin
      </Button>
    </form>
  );
}
