import Button from "@/components/atoms/button/Button";
import "./verify-email-banner.scss";
import { useSession } from "next-auth/react";
import { useApi } from "@/utils/hooks/useApi";
import Toast from "../../toast/Toast";
import { useFeedback } from "@/context/feedbackContext";

export default function VerifyEmailBanner() {
  const { data: session, update } = useSession();
  const { toast, showToast, resetToast } = useFeedback();
  const { callApi } = useApi(session);

  const resendVerifyEmail = async () => {
    const result = await callApi("/api/auth/resend-verify-email", {
      method: "GET",
      requiresAuth: true,
    });

    console.log("resend-verify-email", result)
    if (result.success) {
      showToast(
        "success",
        "Verify Email Sent",
        "Check your inbox and click on the link provided to verify your email. Don't forget to check spam."
      );
    } else {
      showToast(
        "error",
        "Something went wrong",
        "Link to verify your email could not be sent, please try again later."
      );
    }
  };

  const checkVerification = async () => {
    const result = await callApi("/api/auth/is-verified", {
      method: "GET",
      requiresAuth: true,
    });
    console.log("checkVerificaation", result)
    if (result.success) {
      if (result.data) {
        await update({
          ...session,
          user: {
            ...session?.user,
            isVerified: true,
          },
        });
        showToast(
          "success",
          "You are verified!",
          "Your email was correctly verified. Time to use the platform fully."
        );
      } else {
        showToast(
          "error",
          "Email not verified",
          "Your email is not verified, please go to your inbox and click the link provided or click the button above."
        );
      }
    } else {
      showToast(
        "error",
        "Internal Server Error",
        "Something happened when checking if your email is verified. Please try again later."
      );
    }
  };

  return (
    <div className="verifyEmailBanner">
      <Toast
        variant={toast.variant}
        content={toast.content}
        showToast={toast.showToast}
        onClose={resetToast}
      />
      <h5 className="verifyEmailBanner-title">
        You have to verify your email.
      </h5>
      <div className="verifyEmailBanner-body">
        <p className="verifyEmailBanner-text">
          Check your inbox for a "Verify your email" email. Check spam too. If
          you didn't receive anything, click the button below to resend the
          email.
        </p>
        <Button type="button" variant="primary" color="red" isFullWidth onClick={resendVerifyEmail}>
          Send verification email
        </Button>
        <p className="verifyEmailBanner-text mt-4">
          If you are already verified and this banner still apperas, click the
          button below
        </p>
        <Button
          type="button"
          variant="no-color"
          color="red"
          isFullWidth
          onClick={checkVerification}
        >
          I am already verified
        </Button>
      </div>
    </div>
  );
}
