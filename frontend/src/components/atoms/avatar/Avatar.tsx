import Image from "next/image";
import UserIcon from "../icons/UserIcon";
import "./avatar.scss";

interface IAvatar {
  imageSrc?: string;
  alt?: string;
  size?: number;
}

export default function Avatar({ imageSrc, alt = "Avatar", size = 48 }: IAvatar) {
  return (
    <a
      className={`avatar ${imageSrc ? "avatar-with-image" : "avatar-with-icon"} w-[${size}px] h-[${size}px]`}
      style={{ width: `${size}px`, height: `${size}px` }} // Ensure dynamic size on the container
    >
      {imageSrc ? (
        <Image
          className="avatar-content"
          src={imageSrc}
          alt={alt}
          fill
        />
      ) : (
        <UserIcon size={size} />
      )}
    </a>
  );
}
