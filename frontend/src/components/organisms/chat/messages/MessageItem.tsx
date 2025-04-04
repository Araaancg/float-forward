import timeAgo from "@/utils/functions/timeAgo";
import { IMessage } from "@/types/structures";
import Avatar from "@/components/atoms/avatar/Avatar";
import "./message-item.scss";

export default function MessageItem({
  message,
  showAvatar,
  side,
  avatar,
}: {
  message: IMessage;
  showAvatar: boolean;
  side: "right" | "left";
  avatar?: string;
}) {
  return (
    <div
      className={`flex flex-row justify-${
        side === "left" ? "start" : "end"
      } items-start gap-3 w-full`}
    >
      {showAvatar && side === "left" ? (
        <Avatar size={32} imageSrc={avatar}/>
      ) : (
        <div className="w-[32px] h-[32px]" />
      )}
      <div className={`messageItem ${side}`}>
        <p className="messageItem-content">{message.content}</p>
        <div className="messageItem-date">
          <span>{timeAgo(message.createdAt)}</span>
        </div>
      </div>
      {showAvatar && side === "right" ? (
        <Avatar size={32} imageSrc={avatar} />
      ) : (
        <div className="w-[32px] h-[32px]" />
      )}
    </div>
  );
}
