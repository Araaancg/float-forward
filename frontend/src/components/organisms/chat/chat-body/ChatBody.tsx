import MapPinIcon from "@/components/atoms/icons/MapPinIcon";
import getPinColor from "@/utils/functions/getPinColor";
import theme from "@/theme";
import SeeMoreP from "@/components/atoms/see-more-p/SeeMoreP";
import MessageItem from "../messages/MessageItem";
import "./chat-body.scss";

const ChatBody = ({ selectedChat, me }: { selectedChat: any; me: any }) => (
  // The component is going to be reversed so that is kept scrolled down
  <div className="chatBody">
    <div className="chatBody-messages">
      <div className="chatBody-messages-content">
        {selectedChat?.messages.map((msg: any, index: number) => (
          <MessageItem
            message={msg}
            key={`chatId-${selectedChat?._id}-msg-${index}`}
            showAvatar={
              index === 0 ||
              selectedChat?.messages[index - 1].sender !== msg.sender
            }
            side={msg.sender === me._id ? "right" : "left"}
          />
        ))}
      </div>
    </div>

    <div className="chatBody-pinInfo">
      <div className="chatBody-pinInfo-header">
        <span className="text-base">{selectedChat?.pin.title}</span>
        <div className="flex justify-center items-center gap-3">
          <span className="text-sm">{selectedChat?.pin.type.title}</span>
          <MapPinIcon
            size={16}
            filled
            color={
              theme.extend.colors.pins[getPinColor(selectedChat?.pin)]?.primary
            }
          />
        </div>
      </div>
      <SeeMoreP text={selectedChat?.pin.description} size="sm" />
    </div>
  </div>
);

export default ChatBody;
