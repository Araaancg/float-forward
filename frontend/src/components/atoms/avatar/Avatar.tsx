import Image from "next/image";
import UserIcon from "../icons/UserIcon";
import "./avatar.scss";

interface IAvatar {
  imageSrc?: string;
  alt?: string;
}

export default function Avatar({ imageSrc, alt = "Avatar" }: IAvatar) {
  return (
    <>
      <a className="avatar">
        {imageSrc ? (
          <Image className="avatar-content" src={imageSrc} alt={alt} fill />
        ) : (
          <UserIcon size={34} />
        )}
      </a>
    </>
  );
}
