import Button from "@/components/atoms/button/Button";
import "./additional-information-item.scss";
import { IAdditionalInformation } from "@/types/interfaces";

export default function AdditionalInformationItem({
  id,
  author,
  title,
  content,
  link,
}: IAdditionalInformation) {
  return (
    <div className="addInfoItem">
      <span className="addInfoItem-author">{author}</span>
      <p className="addInfoItem-title">{title}</p>
      <p className="addInfoItem-content">
        {content}
      </p>
      <Button variant="no-color" color="green" isLink linkProps={{ href: link }}>
        Go to source
      </Button>
    </div>
  );
}
