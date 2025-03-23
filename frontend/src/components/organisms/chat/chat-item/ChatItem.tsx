import { IChat, IUser } from "@/types/structures";
import Avatar from "@/components/atoms/avatar/Avatar";
import timeAgo from "@/utils/functions/timeAgo";
import getPinColor from "@/utils/functions/getPinColor";
import "./chat-item.scss";

export default function ChatItem({
  data,
  selected,
  onClick,
  me,
}: {
  data: IChat;
  selected: boolean;
  onClick: (chat: IChat) => void;
  me?: IUser;
}) {
  const receiver = data.participants.filter((el) => el.user._id !== me?._id)[0];
  let unreadMessages = 0
  if (data && data.messages) {
    // Count unread messages (status = 'sent')
    const unreadMessages_ = data.messages.filter(
      (message) => message.status === "sent" && message.sender !== me?._id
    ).length;

    // Store count for the individual chat
    unreadMessages = unreadMessages_;
  }

  return (
    <div
      className={`chatItem ${selected && "selected"}`}
      onClick={() => onClick(data)}
    >
      <div className="flex justify-between">
        <span className={`chatItem-pinType color-${getPinColor(data?.pin)}`}>
          {data?.pin?.type?.title}
        </span>
        {unreadMessages > 0 && (
            <span className="chatItem-unreadMsgs">
              {unreadMessages}
            </span>
          )}
      </div>
      <div className="chatItem-body">
        <Avatar size={38} imageSrc={receiver.user.profilePicture || ""}/>
        <div className="chatItem-body-content">
          <div className="flex justify-between items-center">
            {receiver && <h3>{receiver?.user?.name?.slice(0, 15)}...</h3>}
            {data?.updatedAt && (
              <span className="text-xs">{timeAgo(data.updatedAt)}</span>
            )}
          </div>
          <span className="text-xs">
            {data?.messages && data?.messages[0]?.content}
          </span>
        </div>
      </div>
    </div>
  );
}
