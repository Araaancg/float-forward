"use client";
import TextField from "@/components/molecules/inputs/text-field/TextField";
import { useForm } from "react-hook-form";
import Button from "@/components/atoms/button/Button";
import { yupResolver } from "@hookform/resolvers/yup";
import TextArea from "@/components/molecules/inputs/textarea/TextArea";
import MapLocationPicker from "../../maps/map-location-picker/MapLocationPicker";
import { useState } from "react";
import { schema } from "./report-missing-schema";
import { IDisasters } from "@/types/structures";
import { useApi } from "@/utils/hooks/useApi";
import { PinTypes } from "@/types/enums";

export default function ReportMissingForm({
  disaster,
}: {
  disaster: IDisasters;
}) {
  const { callApi, loading, error } = useApi();
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
    console.log("Selected place:", place);
    setSelectedPlace({
      latitude: place?.lat!,
      longitude: place?.lng!,
      address: place?.address!,
    });
    // Do something with the selected place data
    // e.g., update form state, make API calls, etc.
  };

  const sendData = async (data: any) => {
    data["coordinates"] = {
      lat: selectedPlace?.latitude,
      lng: selectedPlace?.longitude,
    };
    data["address"] = selectedPlace?.address;
    data["disaster"] = disaster._id;
    data["type"] = PinTypes.MISSINGS;
    console.log(data);

    const response = await callApi(`/api/pins`, {
      method: "POST",
      requiresAuth: true,
      body: data,
    });
    console.log("pin created res", response);
    reset();
  };

  return (
    <form
      className="w-full flex flex-col gap-4 max-w-[800px]"
      onSubmit={handleSubmit(sendData)}
    >
      <TextField
        register={register}
        errors={errors}
        name="title"
        type="text"
        placeholder="Collection Point on High Street"
        label="Title"
      />
      <TextArea
        register={register}
        errors={errors}
        name="description"
        type="text"
        placeholder="Near the old supermarket there is a collection point... We need x materials"
        label="Description"
      />
      <MapLocationPicker
        onLocationSelect={handlePlaceSelect}
        label="Select a location"
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
        Submit missings pin
      </Button>
    </form>
  );
}
