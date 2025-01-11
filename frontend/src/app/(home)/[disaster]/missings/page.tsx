"use client";
import React, { useEffect, useState } from "react";
import { disasterMock } from "@/mocks/mock";
import Breadcrumbs from "@/components/atoms/breadcrumbs/Breadcrumbs";
import Tabs from "@/components/atoms/tabs/Tabs";
import "./missings.scss";
import ReportMissingForm from "@/components/organisms/forms/ReportMissingForm/ReportMissingForm";
import Modal from "@/components/molecules/modal/Modal";
import ExclamationMarkIcon from "@/components/atoms/icons/ExclamationMarkIcon";
import Button from "@/components/atoms/button/Button";
import theme from "@/theme";

export default function MissingsView() {
  const options = ["Missings map", "Report missing person or pet"];

  // Read the current tab from URLSearchParams
  const getTabFromUrl = () => {
    const urlParams = new URLSearchParams(window.location.search);
    const tabIndex = urlParams.get("section");
    return tabIndex ? parseInt(tabIndex, 10) : 0; // Default to 0 if not present
  };

  const [currentTab, setCurrentTab] = useState<number>(getTabFromUrl());

  // Update the URL when the selected tab changes
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    urlParams.set("section", currentTab.toString());
    window.history.replaceState(null, "", "?" + urlParams.toString());
  }, [currentTab]);

  const [showOwnHelpModal, setShowOwnHelpModal] = useState<boolean>(false);

  return (
    <div className="missingsView">
      <Breadcrumbs
        links={[
          {
            placeholder: disasterMock[0].title,
            url: `/${disasterMock[0].slug}`,
          },
          {
            placeholder: "Missing persons or pets",
            url: "missings",
          },
        ]}
        className="max-w-[800px]"
      />

      <h1 className="text-4xl">Offer Help</h1>
      <p className="text-center">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua.
      </p>
      <Tabs
        options={options}
        selectedTab={currentTab}
        onClick={(index: number) => setCurrentTab(index)}
      />
      {currentTab === 1 && (
        <>
          <h2 className="flex gap-3 justify-start items-center text-2xl	">
            Report missing person or pet
            <Button
              variant="no-color"
              onClick={() => setShowOwnHelpModal(!showOwnHelpModal)}
            >
              <ExclamationMarkIcon color={theme.extend.colors.green.primary} />
            </Button>
          </h2>

          <Modal
            onClose={() => setShowOwnHelpModal(!showOwnHelpModal)}
            isOpen={showOwnHelpModal}
            title="What help can you offer?"
            className="flex flex-col gap-6 max-w-xl	"
          >
            Some explanation here
          </Modal>

          <ReportMissingForm />
        </>
      )}
    </div>
  );
}
