import Button from "@/components/atoms/button/Button";
import Image from "next/image";
import { IDisasters } from "@/types/structures";
import "./disaster-events-card.scss";

export default function DisasterEventsCard({ info }: { info: IDisasters }) {
  return (
    <div className="decard">
      <div className="decard-info">
        <div className="text-sm text-grey">
          <span className="mr-4">{info?.date?.toString().split("T")[0].split("-").reverse().join("-")}</span>
          <span>
            {info?.city}, {info?.country}
          </span>
        </div>
        <h2 className="text-3xl">{info?.title}</h2>
        <p className="text-left sm:text-right">{info?.description}</p>
        <Button isFullWidth isLink linkProps={{ href: `/${info?.slug}` }}>
          See more
        </Button>
      </div>
      <div className="decard-image">
        {info?.images[0]?.href && info?.images[0]?.alt && (
          <Image
            // src={info?.images[0]?.href}
            src={"/mocks/placeholder.png"}
            alt={info?.images[0]?.alt}
            fill
            className="object-cover rounded-t-md sm:rounded-l-none sm:rounded-r-md"
          />
        )}
      </div>
    </div>
  );
}
