import Button from "@/components/atoms/button/Button";
import "./chat-header.scss";

const ChatHeader = ({
  selectedUser,
  pinUrl,
}: {
  selectedUser: any;
  pinUrl: string;
}) => {
  return (
    <div className="chatHeader">
      <span>{selectedUser?.name}</span>
      <Button variant="no-color" isLink linkProps={{ href: pinUrl }} size="lg">
        Go to pin
      </Button>
    </div>
  );
};

export default ChatHeader;
