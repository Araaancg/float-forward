"use client";
import React, { useMemo, useState } from "react";
import Breadcrumbs from "@/components/atoms/breadcrumbs/Breadcrumbs";
import { chatMock } from "@/mocks/chat";
import { IChat } from "@/types/structures";
import { useAuth } from "@/utils/hooks/useAuth";
import ChatItem from "@/components/molecules/list-items/chat-item/ChatItem";
import Button from "@/components/atoms/button/Button";
import MapPinIcon from "@/components/atoms/icons/MapPinIcon";
import SeeMoreP from "@/components/atoms/see-more-p/SeeMoreP";
import theme from "@/theme";
import getPinColor from "@/utils/functions/getPinColor";
import MessageItem from "@/components/organisms/messages/MessageItem";
import TextField from "@/components/molecules/inputs/text-field/TextField";
import { useForm } from "react-hook-form";
import SendMessageIcon from "@/components/atoms/icons/SendMessageIcon";
import ArrowIcon from "@/components/atoms/icons/ArrowIcon";

import "./chat.scss";

const ChatHeader = ({ selectedUser }: { selectedUser: any }) => (
  <div className="chatView-boxDesktop-chat-header">
    <span>{selectedUser.user.name}</span>
    <Button variant="no-color" isLink linkProps={{ href: "/" }} size="lg">
      Go to pin
    </Button>
  </div>
);
const ChatBody = ({ selectedChat, me }: { selectedChat: any, me: any }) => (
  <div className="chatView-boxDesktop-chat-body">
    <div className="chatView-boxDesktop-chat-body-pinInfo">
      <div className="flex justify-between items-center w-full">
        <span className="text-base">{selectedChat.pin.title}</span>
        <div className="flex justify-center items-center gap-3">
          <span className="text-sm">{selectedChat.pin.type.title}</span>
          <MapPinIcon
            size={16}
            filled
            color={theme.extend.colors.pins[getPinColor(selectedChat.pin)].primary}
          />
        </div>
      </div>
      <SeeMoreP text={selectedChat.pin.description} size="sm" />
    </div>

    <div className="w-11/12">
      <div className="tex-base flex flex-col gap-2">
        {selectedChat.messages.map((msg: any, index: number) => (
          <MessageItem
            message={msg}
            key={`chatId-${selectedChat._id}-msg-${index}`}
            showAvatar={index === 0 || selectedChat?.messages[index - 1].sender !== msg.sender}
            side={msg.sender === me._id ? "right" : "left"}
          />
        ))}
      </div>
    </div>
  </div>
);
const ChatInput = ({ register, errors }: any) => (
  <div className="flex flex-row justify-between items-center p-4 bg-white-full">
    <TextField register={register} errors={errors} name="title" type="text" placeholder="Write your message" />
    <Button isLink variant="no-color" color="black" className="ml-4">
      <SendMessageIcon size={24} />
    </Button>
  </div>
);

// TO DO
// - put components in another file
// - put chatId in the url for sharing or something
// - refactor css
// - fix messages scroll - the other way around

export default function ChatView() {
  const me = {
    email: "19315348@brookes.ac.uk",
    name: "Arancha Carpintero Guardiola",
    profilePicture:
      "https://lh3.googleusercontent.com/a/ACg8ocKKeDvPpcMcfzfoPPJkvvjcOiaPM247RNwBp0lrr8iwfV-HrQ=s96-c",
    _id: "6793c1ab4ef2222c5e1270e2",
  };

  const [view, setView] = useState<"list" | "chat">("list");
  const [chats, setChats] = useState<IChat[]>(chatMock);
  const [selectedChat, setSelectedChat] = useState<IChat>(chats[0]);

  const selectedUser = useMemo(() => {
    return selectedChat.participants.filter((el) => el.user._id !== me?._id)[0];
  }, [selectedChat]);

  const toggleMobileView = () => setView((prev) => (prev === "list" ? "chat" : "list"));

  const onChatClick = (chat: IChat, isMobile: boolean) => {
    if (isMobile) toggleMobileView();
    setSelectedChat(chat);
  };

  const { register, handleSubmit, formState: { errors, isValid } } = useForm();

  return (
    <div className="chatView">
      {/* Breadcrumbs */}
      {view === "list" && (
        <>
          <Breadcrumbs links={[{ placeholder: "Chat", url: `/chat` }]} className="max-w-[800px]" />
          <div className="flex flex-col gap-4">
            <h1 className="text-4xl w-full text-left">Chats</h1>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
          </div>
        </>
      )}

      {/* Desktop View */}
      <div className="chatView-boxDesktop">
        {/* Chat List */}
        <div className="chatView-boxDesktop-list">
          {chats.map((chat, index) => (
            <div key={chat._id} className="w-full">
              <ChatItem
                data={chat}
                me={me}
                selected={chat._id === selectedChat._id}
                onClick={() => onChatClick(chat, false)}
              />
              {index !== chats.length - 1 && <hr className="border border-solid border-green-primary w-1/2 mx-auto" />}
            </div>
          ))}
        </div>

        {/* Chat Box */}
        <div className="chatView-boxDesktop-chat">
          <ChatHeader selectedUser={selectedUser} />
          <ChatBody selectedChat={selectedChat} me={me} />
          <ChatInput register={register} errors={errors} />
        </div>
      </div>

      {/* Mobile View */}
      <div className="chatView-boxMobile">
        {view === "list" ? (
          <div className="chatView-boxMobile-list">
            {chats.map((chat, index) => (
              <div key={chat._id} className="w-full">
                <ChatItem
                  data={chat}
                  me={me}
                  selected={chat._id === selectedChat._id}
                  onClick={() => onChatClick(chat, true)}
                />
                {index !== chats.length - 1 && <hr className="border border-solid border-green-primary w-1/2 mx-auto" />}
              </div>
            ))}
          </div>
        ) : (
          <div className="h-full w-full flex flex-col gap-2">
            <Button isLink variant="no-color" color="black" className="ml-4" onClick={toggleMobileView}>
              <ArrowIcon size={24} color={theme.extend.colors.black.primary} />
            </Button>
            <div className="chatView-boxMobile-chat">
              <ChatHeader selectedUser={selectedUser} />
              <ChatBody selectedChat={selectedChat} me={me} />
              <ChatInput register={register} errors={errors} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
