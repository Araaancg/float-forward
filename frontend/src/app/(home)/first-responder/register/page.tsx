"use client";
import { useAuth } from "@/utils/hooks/useAuth";
import Loader from "@/components/atoms/loader/Loader";
import Breadcrumbs from "@/components/atoms/breadcrumbs/Breadcrumbs";
import RegisterFirstResponderForm from "@/components/organisms/forms/RegisterFirstResponderForm/RegisterFirstResponderForm";
import { useFeedback } from "@/context/feedbackContext";
import Toast from "@/components/molecules/toast/Toast";
import "./register-fr.scss";

export default function RegisterFirstResponder() {
  const { sessionLoading, session } = useAuth();
  const { showToast, toast, resetToast } = useFeedback();

  if (sessionLoading) {
    return <Loader view="form" />;
  }

  return (
    <div className="firstResponderView">
      <Breadcrumbs
        links={[
          { placeholder: "I am a first responder", url: `/first-responder` },
          { placeholder: "Register", url: `/first-responder/register` },
        ]}
        className="max-w-4xl"
      />
      <h1 className="text-2xl">REGISTER AS A FIRST RESPONDER</h1>
      <p>
        To register as a first responder, please fill out the following form:
      </p>

      <RegisterFirstResponderForm showToast={showToast} session={session}/>
      <Toast
        variant={toast.variant}
        content={toast.content}
        showToast={toast.showToast}
        onClose={resetToast}
      />
    </div>
  );
}
