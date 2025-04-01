"use client";
import TextField from "@/components/molecules/inputs/text-field/TextField";
import { useForm } from "react-hook-form";
import Button from "@/components/atoms/button/Button";
import { yupResolver } from "@hookform/resolvers/yup";
import TextArea from "@/components/molecules/inputs/textarea/TextArea";
import MapLocationPicker from "../../maps/map-location-picker/MapLocationPicker";
import { useState } from "react";
import { schema } from "./offer-help-schema";
import { IDisasters } from "@/types/structures";
import { useApi } from "@/utils/hooks/useApi";
import { PinTypes, UserRoles } from "@/types/enums";
import { useFeedback } from "@/context/feedbackContext";
import Toast from "@/components/molecules/toast/Toast";
import Loader from "@/components/atoms/loader/Loader";
import Selector from "@/components/molecules/inputs/selector/Selector";

export default function OfferOwnHelpForm({
  disaster,
  session,
}: {
  disaster: IDisasters;
  session: any;
}) {
  const { callApi, loading, error } = useApi(session);
  const { toast, showToast, resetToast } = useFeedback();

  const [helpType, setHelpType] = useState<string>(PinTypes.HELP_OFFER);

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<any>({
    mode: "all",
    resolver: yupResolver(schema),
  });

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
    // Do something with the selected place data
    // e.g., update form state, make API calls, etc.
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
        data["coordinates"] = {
          lat: selectedPlace?.latitude,
          lng: selectedPlace?.longitude,
        };
        data["address"] = selectedPlace?.address;
        data["disaster"] = disaster._id;
        data["type"] = helpType;

        const response = await callApi(`/api/pins`, {
          method: "POST",
          requiresAuth: true,
          body: data,
        });
        if (response.success) {
          showToast("success", "Success!", "Pin registered successfully.");
          reset();
        } else {
          throw Error;
        }
      }
    } catch (e) {
      showToast(
        "error",
        "Oh no!",
        `Something went wrong when registering this pin. Try again later. Error: ${e}`
      );
    }
  };

  if (loading) {
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
      <Selector
        options={
          session?.user?.role === UserRoles.FIRST_RESPONDER
            ? [
                { placeholder: "Own Help Offer", value: PinTypes.HELP_OFFER },
                {
                  placeholder: "Collection Point",
                  value: PinTypes.COLLECTION_POINT,
                },
                {
                  placeholder: "Information Point",
                  value: PinTypes.INFORMATION_POINT,
                },
                {
                  placeholder: "Medical Point",
                  value: PinTypes.MEDICAL_POINT,
                },
              ]
            : [
                { placeholder: "Own Help Offer", value: PinTypes.HELP_OFFER },
                {
                  placeholder: "Collection Point",
                  value: PinTypes.COLLECTION_POINT,
                },
                {
                  placeholder: "Information Point",
                  value: PinTypes.INFORMATION_POINT,
                },
              ]
        }
        selected={helpType}
        onSelect={(value: string) => setHelpType(value)}
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
        Submit help offer
      </Button>
    </form>
  );
}
