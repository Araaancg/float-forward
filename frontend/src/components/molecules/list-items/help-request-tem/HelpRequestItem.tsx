import PriorityIcon from "@/components/atoms/icons/PriorityIcon";
import HouseIcon from "@/components/atoms/icons/HouseIcon";
import Image from "next/image";
import "./help-request-item.scss";

interface IHelpRequest {
  helpData?: {
    title: string;
    description: string;
    priority: "H" | "M" | "L";
    address: string;
  };
}

export default function HelpRequestItem({ helpData }: IHelpRequest) {
  return (
    <div className="hritem">
      <div className="hritem-info">
        <div>
          <h4 className="text-base font-normal">Help's title</h4>
          <p className="text-xs font-normal">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua...
          </p>
        </div>
        <div className="flex gap-3 text-[8px]">
          <span className="flex justify-center items-center gap-2">
            <PriorityIcon size={16}/>
            High priority
          </span>
          <span className="flex justify-center items-center gap-2">
            <HouseIcon size={16}/>
            Locality
          </span>
        </div>
      </div>
      <div className="hritem-map">
        <Image src="/map-small.png" alt="google map" width={112} height={99} />
        <span className="text-[8px]">Headington Rd Headington Oxford OX3 0BP</span>
      </div>
    </div>
  );
}
