import AuthLoader from "./loader-views/AuthLoader";
import ChatLoader from "./loader-views/ChatLoader";
import DisasterLoader from "./loader-views/DisasterLoader";
import FormLoader from "./loader-views/FormLoader";
import HomeLoader from "./loader-views/HomeLoader";
import "./loader.scss";

export default function Loader({ view }: { view: string }) {
  switch (view) {
    case "home":
      return <HomeLoader />;
    case "auth":
      return <AuthLoader />;
    case "disaster":
      return <DisasterLoader />;
    case "chat":
      return <ChatLoader />;
    case "form":
      return <FormLoader />
    default:
      return <div>Loading...</div>;
  }
}
