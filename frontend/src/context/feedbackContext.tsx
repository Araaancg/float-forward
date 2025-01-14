"use client";
import { IToast } from "@/types/interfaces";
import { useState, createContext, useContext } from "react";

interface IContext {
  children: any;
}

const defaultState: IToast = {
  showToast: false,
  variant: "success",
  content: { title: "", description: "" },
};

export const FeedbackContext = createContext<any>({
  toast: defaultState,
});

export const FeedbackProvider = ({ children }: IContext): any => {
  // FEEDBACK TOAST -> to show the user success or error
  const [toast, setToast] = useState<IToast>(defaultState);

  const showToast = (
    variant: "success" | "error",
    title: string,
    description: string
  ) => {
    setToast({
      showToast: true,
      variant,
      content: { title, description },
    });
  };

  const resetToast = () => {
    setToast({
      showToast: false,
      variant: "success",
      content: { title: "", description: "" },
    });
  };

  const values = {
    toast,
    showToast,
    resetToast,
  };

  return (
    <FeedbackContext.Provider value={values}>
      {children}
    </FeedbackContext.Provider>
  );
};

export function useFeedback() {
  return useContext(FeedbackContext);
}
