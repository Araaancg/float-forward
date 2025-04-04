"use client";
import { useAuth } from "@/utils/hooks/useAuth";
import Loader from "@/components/atoms/loader/Loader";
import "./first-responder.scss";
import Breadcrumbs from "@/components/atoms/breadcrumbs/Breadcrumbs";
import FirstAidKitIcon from "@/components/atoms/icons/FirstAidKitIcon";
import theme from "@/theme";
import HoldingHandsIcon from "@/components/atoms/icons/HoldingHandsIcon";
import Button from "@/components/atoms/button/Button";
import HealthcareIcon from "@/components/atoms/icons/HealthcareIcon";
import { UserRoles } from "@/types/enums";
import ContactUsForm from "@/components/organisms/forms/ContactUsForm/ContactUsForm";
import { useFeedback } from "@/context/feedbackContext";
import Toast from "@/components/molecules/toast/Toast";

const benefits = [
  {
    id: "bfr-1",
    title: "Establish Medical Points",
    content: (
      <p>
        First responders can place official medical point markers on the map.
        These are essential sites in high-risk areas (Zone 0) where medical
        professionals provide treatment and care during emergencies. Only
        verified first responders can set these points to ensure legitimacy and
        safety.
      </p>
    ),
    icon: (
      <FirstAidKitIcon size={56} color={theme.extend.colors.pins.red.primary} />
    ),
  },
  {
    id: "bfr-2",
    title: "Submit Official Requests",
    content: (
      <ul className="list-disc">
        Gain the ability to submit verified forms directly through the platform.
        These requests may include:
        <li className="ml-6">
          Resource allocation (e.g., requesting more medical supplies)
        </li>
        <li className="ml-6">
          Additional information that must be shared with the public
        </li>
        <li className="ml-6">Coordination support for local authorities</li>
      </ul>
    ),
    icon: (
      <HoldingHandsIcon
        size={56}
        color={theme.extend.colors.pins.red.primary}
      />
    ),
  },
];

const whoCanApply = [
  {
    id: "wcp-0",
    number: "1",
    text: "Licensed Medical Proffesionals",
  },
  {
    id: "wcp-1",
    number: "2",
    text: "Firefighters",
  },
  {
    id: "wcp-2",
    number: "3",
    text: "Police Officers",
  },
  {
    id: "wcp-3",
    number: "4",
    text: "Certified Emergency Responders",
  },
  {
    id: "wcp-4",
    number: "5",
    text: "Members of Recognized Disaster Relief Organizations",
  },
];

export default function FirstResponderView() {
  const { sessionLoading, session } = useAuth();
  const { showToast, toast, resetToast } = useFeedback();

  if (sessionLoading) {
    return <Loader view="home" />;
  }

  return (
    <div className="firstResponderView">
      <Breadcrumbs
        links={[
          { placeholder: "I am a first responder", url: `/first-responder` },
        ]}
        className="max-w-4xl"
      />
      <section className="flex flex-col justify-start items-start gap-8">
        <div className="flex flex-row justify-center items-center gap-6">
          <div className="flex justify-center items-center w-14 h-14 rounded-full border border-pins-red-primary border-[3px]">
            <HealthcareIcon
              size={32}
              color={theme.extend.colors.pins.red.primary}
            />
          </div>
          <h1 className="text-2xl">FIRST RESPONDERS</h1>
        </div>
        {session?.user.role === UserRoles.REGULAR && (
          <>
            <h2 className="font-semibold">
              &quot;Your expertise is vital. Join us in providing critical
              support during emergencies.&quot;
            </h2>
            <p>
              This page is dedicated to trained first responders who wish to
              contribute their skills in times of crisis. By registering, you'll
              gain access to key platform features that allow you to:
            </p>
            <div className="firstResponderView-benefits">
              {benefits.map((card: any) => (
                <div key={card.id} className="firstResponderView-benefits-card">
                  <div className="flex flex-col justify-center items-center w-full sm:w-1/3 gap-4">
                    {card.icon}
                    <p className="text-lg">{card.title}</p>
                  </div>
                  <div className="w-full sm:w-2/3">{card.content}</div>
                </div>
              ))}
            </div>
          </>
        )}
        {session?.user.role === UserRoles.FIRST_RESPONDER && (
          <>
            <p>
              Thank you for registering as a first responder. Below you can find
              a form where you can make official requests to the platform.
            </p>
            <p>
              Every idea or suggestion is welcome. You can even request to show
              certain additional information if you think people are going to
              find it userful.
            </p>
          </>
        )}
      </section>

      {session?.user.role === UserRoles.REGULAR && (
        <>
          <Button
            variant="primary"
            color="red"
            isLink
            linkProps={{ href: "/first-responder/register" }}
            className="w-full sm:w-1/3"
          >
            Register as a first responder
          </Button>

          <hr className="w-11/12 border border-pins-red-primary" />

          <section className="wcafr">
            <h3 className="wcafr-title">
              Who can apply for the "first responder" role in Float Forward?
            </h3>
            <ul className="wcafr-list">
              {whoCanApply.map((card: any, index: number) => (
                <li key={card.id} className={`wcafr-list-item`}>
                  <span
                    className={`wcafr-list-item-number  ${
                      index === 0 && "first"
                    }`}
                  >
                    {card.number}
                  </span>
                  <p className="wcafr-list-item-text">{card.text}</p>
                </li>
              ))}
            </ul>
          </section>
        </>
      )}
      {session?.user.role === UserRoles.FIRST_RESPONDER && (
        <>
          <ContactUsForm showToast={showToast} />
          <Toast
            variant={toast.variant}
            content={toast.content}
            showToast={toast.showToast}
            onClose={resetToast}
          />
        </>
      )}
    </div>
  );
}
