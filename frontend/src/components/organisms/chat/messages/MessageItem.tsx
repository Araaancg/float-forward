import timeAgo from "@/utils/functions/timeAgo";
import { IMessage } from "@/types/structures";
import "./message-item.scss";
import Avatar from "@/components/atoms/avatar/Avatar";

export default function MessageItem({
  message,
  showAvatar,
  side,
}: {
  message: IMessage;
  showAvatar: boolean;
  side: "right" | "left";
}) {
  return (
    <div
      className={`flex flex-row justify-${side === "left" ? "start" : "end"} items-start gap-3 w-full`}
    >
      {showAvatar && side === "left" ? (
        <Avatar size={32} />
      ) : (
        <div className="w-[32px] h-[32px]" />
      )}
      <div className="messageItem">
        <p className="messageItem-content">{message.content}</p>
        <div className="messageItem-date">
          <span>{timeAgo(message.createdAt)}</span>
        </div>
      </div>
      {showAvatar && side === "right" ? (
        <Avatar size={32} />
      ) : (
        <div className="w-[32px] h-[32px]" />
      )}
    </div>
  );
}
