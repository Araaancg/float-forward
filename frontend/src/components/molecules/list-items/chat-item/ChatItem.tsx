import { IChat, IUser } from "@/types/structures";
import Avatar from "@/components/atoms/avatar/Avatar";
import timeAgo from "@/utils/functions/timeAgo";
import { PinTypes, pinTypesCrossColor } from "@/types/enums";
import { useMemo } from "react";
import "./chat-item.scss";

export default function ChatItem({ data, me }: { data: IChat; me?: IUser }) {
  const receiver = data?.participants.filter(
    (item: { user: IUser; role: "seeker" | "volunteer"; lastRead: string }) =>
      item.user._id === me?._id
  )[0];

  const pinColor = useMemo(
      () => pinTypesCrossColor[data.pin.type.title as PinTypes],
      [data.pin.type.title]
    );
  // const pinColor = "black";

  return (
    <div className="chatItem">
      <span className={`chatItem-pinType color-${pinColor}`}>
        {data?.pin.type.title}
      </span>
      <div className="chatItem-content">
        <Avatar imageSrc={receiver?.user.profilePicture!} />
        <div className="flex flex-col border-b border-solid border-green-primary w-full">
          <div className="flex flex-row gap-4 justify-start items-center">
            <h3 className="text-base font-medium">
              {receiver?.user.name?.slice(0, 20)}
              {receiver?.user?.name!.length > 20 && "..."}
            </h3>

            {data.messages ? (
              <p className="text-sm">
                {timeAgo(data?.messages[0].createdAt.toString())}
              </p>
            ) : (
              <p className="text-sm">Loading...</p>
            )}
          </div>
          {data.messages ? (
            <p className="text-sm">
              {data?.messages[0].content.slice(0, 20)}{" "}
              {data?.messages[0].content.length > 20 && "..."}
            </p>
          ) : (
            <p className="text-sm">Loading...</p>
          )}
        </div>
      </div>
    </div>
  );
}
