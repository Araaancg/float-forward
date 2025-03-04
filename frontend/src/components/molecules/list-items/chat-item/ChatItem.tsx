import { IChat, IUser } from "@/types/structures";
import Avatar from "@/components/atoms/avatar/Avatar";
import timeAgo from "@/utils/functions/timeAgo";
import "./chat-item.scss";
import getPinColor from "@/utils/functions/getPinColor";

export default function ChatItem({
  data,
  me,
  selected,
  onClick,
}: {
  data: IChat;
  selected: boolean;
  onClick: (chat: IChat) => void;
  me?: IUser;
}) {
  const receiver = data.participants.filter((el) => el.user._id !== me?._id)[0];
  return (
    <div
      className={`chatItem ${selected && "selected"}`}
      onClick={() => onClick(data)}
    >
      <span className={`chatItem-pinType color-${getPinColor(data.pin)}`}>
        {data.pin.type.title}
      </span>
      <div className="chatItem-body">
        <Avatar size={38}/>
        <div className="chatItem-body-content">
          <div className="flex justify-between items-center">
            {receiver && <h3>{receiver?.user?.name}</h3>}
            {data.updatedAt && (
              <span className="text-sm">{timeAgo(data.updatedAt)}</span>
            )}
          </div>
          <span className="text-xs">
            {data?.messages && data?.messages[0].content}
          </span>
        </div>
      </div>
    </div>
  );
}
