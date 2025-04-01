import React, { useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import {
  Control,
  Controller,
  UseFormGetValues,
  UseFormSetValue,
} from "react-hook-form";
import Button from "@/components/atoms/button/Button";
import "./drag-and-drop.scss";
import { useFeedback } from "@/context/feedbackContext";

export default function DragAndDrop({
  setValue,
  getValues,
  control,
  name,
  showToast
}: {
  setValue: UseFormSetValue<any>;
  getValues: UseFormGetValues<any>;
  // errors: FieldErrors<any>;
  control: Control<any>;
  name: string;
  showToast: (
    type: "error" | "success",
    title: string,
    message: string
  ) => void;
}): React.JSX.Element {
  const [fileDropped, setFileDropped] = useState<File | null>(
    getValues(name) || null
  );
  const [fileError, setFileError] = useState<string>();

  const {
    getRootProps,
    getInputProps,
    isDragActive,
    open,
    acceptedFiles,
    fileRejections,
  } = useDropzone({
    accept: {
      "application/pdf": [".pdf"],
    },
    maxFiles: 1,
    noClick: true,
  });

  useEffect(() => {
    if (acceptedFiles.length > 0) {
      // Only keep the latest file
      setFileDropped(acceptedFiles[0]);
    }

    fileRejections.forEach(({ file, errors }) => {
      errors.forEach((e) => {
        if (e.code === "file-invalid-type") {
          showToast(
            "error",
            "Wrong file format",
            "You can only upload pdf files."
          );
        } else if (e.code === "too-many-files") {
          showToast("error", "Too many files", "You can only upload 1 file.");
        } else {
          showToast("error", "Something went wrong", e.message);
        }
      });
    });
  }, [acceptedFiles, fileRejections]);

  useEffect(() => {
    setFileError("");
    setValue(name, fileDropped);
  }, [fileDropped, name, setValue]);

  const removeFile = (e: React.MouseEvent) => {
    e.preventDefault();
    setFileDropped(null);
    setValue(name, null);
  };

  const handleButtonClick = (e: React.MouseEvent) => {
    e.preventDefault();
    open();
  };

  return (
    <>
      <div className="flex flex-col w-full">
        <Controller
          name={name}
          control={control}
          render={() => (
            <div
              {...getRootProps()}
              className="w-full flex flex-col justify-center items-end gap-4"
            >
              <input {...getInputProps()} />
              <div
                className={`bg-disabled-input w-full rounded flex justify-center items-center py-10`}
              >
                {fileDropped ? (
                  <div className="w-full px-10 flex flex-row justify-start items-center gap-3">
                    <div className="flex items-center gap-2">
                      <div className="p-2 border rounded">
                        <svg
                          width="32"
                          height="32"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                          <polyline points="14 2 14 8 20 8"></polyline>
                          <path d="M9 15v-4"></path>
                          <path d="M12 15v-6"></path>
                          <path d="M15 15v-2"></path>
                        </svg>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-sm font-medium">
                          {fileDropped.name}
                        </span>
                        <span className="text-xs opacity-50">
                          {(fileDropped.size / 1024 / 1024).toFixed(2)} MB
                        </span>
                      </div>
                      <button
                        type="button"
                        onClick={removeFile}
                        className="ml-2 text-sm hover:underline text-red-500"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ) : (
                  <div>
                    <p className="text-center">
                      {!isDragActive
                        ? "Drag and drop a PDF file here"
                        : "Drop here..."}
                    </p>
                    <p className="text-[10px] opacity-50 w-full text-center">
                      Maximin 1 file - Format: PDF
                    </p>
                  </div>
                )}
              </div>
              <Button
                variant="primary"
                color="green"
                type="button"
                onClick={handleButtonClick}
              >
                Select a file
              </Button>
            </div>
          )}
        />
        {/* {errors[name] != null && <InputError errors={errors} name={name} />}
        {fileError && <InputError dropError={fileError} />} */}
      </div>
    </>
  );
}
