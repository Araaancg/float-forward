"use client";
import Carrousel from "@/components/organisms/carrousel/Carrousel";
import { useSession } from "next-auth/react";
import { IDisasters } from "@/types/structures";
import { useData } from "@/utils/hooks/useData";
import Loader from "@/components/atoms/loader/Loader";
import VerifyEmailBanner from "@/components/molecules/banners/verify-email-banner/VerifyEmailBanner";
import Button from "@/components/atoms/button/Button";
import TwoPeopleCarryingBoxIcon from "@/components/atoms/icons/TwoPeopleCarryingBoxIcon";
import HoldingHandsIcon from "@/components/atoms/icons/HoldingHandsIcon";
import FirstAidKitIcon from "@/components/atoms/icons/FirstAidKitIcon";
import ContactUsForm from "@/components/organisms/forms/ContactUsForm/ContactUsForm";
import { useFeedback } from "@/context/feedbackContext";
import Toast from "@/components/molecules/toast/Toast";
import "./home.scss";

const whoIsThisPlatformFor = [
  {
    id: "witpf-1",
    title: "Volunteers",
    quote: "Be the hero in your community",
    content:
      "Whether you're skilled in first aid, logistics, or simply willing to lend a helping hand, your contribution can make a difference. Register as a volunteer and help those in need during critical times.",
    icon: <TwoPeopleCarryingBoxIcon size={56} />,
  },
  {
    id: "witpf-2",
    title: "People in Need",
    quote: "Help is closer than you think",
    content:
      "If you need support during a crisis, this platform connects you with volunteers and responders ready to provide assistance. Whether it's evacuation, supplies, or information, we're here to help.",
    icon: <HoldingHandsIcon size={56} />,
  },
  {
    id: "witpf-3",
    title: "First Responders",
    quote: "Your expertise saves lives",
    content:
      "As a trained professional, your skills are vital in emergencies. This platform helps you connect with those who need your immediate assistance in disaster-affected areas.",
    icon: <FirstAidKitIcon size={56} />,
  },
];

const howDoesHelpVolunteerSystemWork = [
  {
    id: "hdhvsw-1",
    number: "1",
    title: "Where do you want to start?",
    text: "Choose the type of emergency you want to assist with — flood, earthquake, fire, or any other disaster.",
  },
  {
    id: "hdhvsw-2",
    number: "2",
    title: "What do you want to do?",
    text: "Decide wether you want to offer help as a volunteer or first responder or request help if you are in need.",
  },
  {
    id: "hdhvsw-3",
    number: "3",
    title: "Connect throught the map",
    text: "Fill out a simple form to place a pin on the map with details about what you need or how can you help. Alternatively, browse the map to find someone already offering or requesting assistance and connect with them directly.",
  },
  {
    id: "hdhvsw-4",
    number: "4",
    title: "“Closed”",
    text: "Once the situation is handled, mark the pin as closed to keep the platform up to date.",
  },
];

export default function Home() {
  const { data: session } = useSession();
  console.log("session", session);
  const { toast, showToast, resetToast } = useFeedback();

  const {
    data: disasters,
    loading,
    error,
  } = useData<IDisasters[]>("/api/disasters", {
    method: "GET",
  });

  if (loading) {
    return <Loader view="home" />;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="home flex flex-col justify-center items-center gap-12">
      {session && !session?.user.isVerified && <VerifyEmailBanner />}
      <div className="max-w-4xl	p-4">
        <h1 className="my-4 text-center text-4xl	">Recent events</h1>
        <p className="text-center">
          This list has global events where you may have the chance to offer
          assistance to those in need, or on the contrary, where you yourself
          may require support.
        </p>
      </div>
      {disasters && !loading && !error && <Carrousel info={disasters} />}

      <section className="cub">
        <p className="cub-text">ANY QUESTIONS? - Don't hesitate to ask!</p>
        <Button
          variant="primary"
          color="white"
          className="w-full sm:w-1/5"
          isLink
          linkProps={{ href: "/#contact-us" }}
        >
          Contact Us
        </Button>
      </section>

      <section className="witpf">
        <h2 className="witpf-title">Who is this platform for?</h2>
        <div className="witpf-content">
          {whoIsThisPlatformFor.map((card: any) => (
            <div key={card.id} className="witpf-card">
              {card.icon}
              <h4 className="witpf-card-title ">{card.title}</h4>
              <p className="witpf-card-quote">&quot;{card.quote}&quot;</p>
              <p className="witpf-card-content">{card.content}</p>
            </div>
          ))}
        </div>
      </section>

      <hr className="border border-green-primary w-11/12" />

      <section className="hdthvsw" id="help">
        <h2 className="hdthvsw-title">
          How does the help-volunteer system work?
        </h2>
        <div className="flex flex-col justify-start items-center gap-8">
          {howDoesHelpVolunteerSystemWork.map((card: any, index: number) => (
            <div key={card.id} className={"hdthvsw-card"}>
              <span className={`hdthvsw-card-number ${index === 0 && "first"}`}>
                {card.number}
              </span>
              <div className="hdthvsw-card-content">
                <p className="hdthvsw-card-content-title">{card.title}</p>
                <p className="hdthvsw-card-conetent-text">{card.text}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <hr className="border border-green-primary w-11/12" />

      <section className="cuf" id="contact-us">
        <h2 className="cuf-title">Any questions or suggestions?</h2>
        <div className="">
          <ContactUsForm showToast={showToast}/>
        </div>
      </section>

      <Toast
        variant={toast.variant}
        content={toast.content}
        showToast={toast.showToast}
        onClose={resetToast}
      />
    </div>
  );
}
