"use client";
import React, { useState } from "react";
import { disasterMock } from "@/mocks/mock";
import Breadcrumbs from "@/components/atoms/breadcrumbs/Breadcrumbs";
import Modal from "@/components/molecules/modal/Modal";
import ExclamationMarkIcon from "@/components/atoms/icons/ExclamationMarkIcon";
import Button from "@/components/atoms/button/Button";
import theme from "@/theme";
import RequestHelpForm from "@/components/organisms/forms/RequestHelpForm/RequestHelpForm";
import "./request-help.scss";

export default function RequestHelpView() {
  const [showOwnHelpModal, setShowOwnHelpModal] = useState<boolean>(false);

  return (
    <div className="requestHelpView">
      <Breadcrumbs
        links={[
          {
            placeholder: disasterMock[0].title,
            url: `/${disasterMock[0].slug}`,
          },
          {
            placeholder: "Request help",
            url: "request-help",
          },
        ]}
        className="max-w-[800px]"
      />

      <h1 className="text-4xl flex gap-3 justify-start items-center">
        Offer Help{" "}
        <Button
          variant="no-color"
          onClick={() => setShowOwnHelpModal(!showOwnHelpModal)}
        >
          <ExclamationMarkIcon color={theme.extend.colors.green.primary} />
        </Button>
      </h1>
      <p className="text-center">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua.
      </p>

      <Modal
        onClose={() => setShowOwnHelpModal(!showOwnHelpModal)}
        isOpen={showOwnHelpModal}
        title="What help can you offer?"
        className="flex flex-col gap-6 max-w-xl	"
      >
        Some explanation here
      </Modal>

      <RequestHelpForm />
    </div>
  );
}
