"use client";
import React, { useEffect, useMemo, useState } from "react";
import Breadcrumbs from "@/components/atoms/breadcrumbs/Breadcrumbs";
import { IChat, IMessage, IPin, IUser } from "@/types/structures";
import ChatItem from "@/components/organisms/chat/chat-item/ChatItem";
import Button from "@/components/atoms/button/Button";
import theme from "@/theme";
import ArrowIcon from "@/components/atoms/icons/ArrowIcon";
import ChatHeader from "@/components/organisms/chat/chat-header/ChatHeader";
import ChatBody from "@/components/organisms/chat/chat-body/ChatBody";
import ChatInput from "@/components/organisms/chat/chat-input/ChatInput";
import { useRouter, useSearchParams } from "next/navigation";
import Loader from "@/components/atoms/loader/Loader";
import { useAuth } from "@/utils/hooks/useAuth";
import { useApi } from "@/utils/hooks/useApi";
import { useFeedback } from "@/context/feedbackContext";
import Toast from "@/components/molecules/toast/Toast";
import { useSocket } from "@/context/socketContext";
import { MessageStatus } from "@/types/enums";
import "./chat.scss";

export default function ChatView() {
  const { sessionLoading, session } = useAuth();
  const me = session?.user;

  const searchParams = useSearchParams();
  const router = useRouter();

  const [view, setView] = useState<"list" | "chat">("list");
  const { toast, showToast, resetToast } = useFeedback();

  const [selectedChat, setSelectedChat] = useState<IChat>();
  const [pin, setPin] = useState<IPin>();
  const [chats, setChats] = useState<IChat[]>();
  const [isNewChat, setIsNewChat] = useState<IUser | null>();
  const { callApi, loading, error } = useApi(session);

  const selectedUser = useMemo(() => {
    const receiver = selectedChat?.participants.filter(
      (el) => el.user._id !== me?._id
    )[0];
    console.log("SELECTED RECEIVER", receiver?.user._id);
    return receiver;
  }, [selectedChat]);

  const toggleMobileView = () =>
    // this is just for mobile
    setView((prev) => (prev === "list" ? "chat" : "list"));

  const onChatClick = async (chat: IChat, isMobile: boolean) => {
    console.log("SELECTED PIN", chat.pin._id);
    if (isMobile) toggleMobileView();

    // Set the selected chat
    setSelectedChat(chat);

    const receiver = chat.participants.filter(
      (el) => el.user._id !== me?._id
    )[0].user._id;
    const pin = chat.pin._id;
    // set them in the url
    const params = new URLSearchParams(searchParams.toString());
    params.set("pin", pin);
    params.set("receiver", receiver);

    // const response = await callApi(`/api/chat/read-messages`, {
    //   method: "POST",
    //   requiresAuth: true,
    //   body: { chatId: chat._id },
    // });

    // console.log("response read messages", response);
    router.push(`/chat?pin=${pin}&receiver=${receiver}`, { scroll: false });
  };

  const removeChatParams = () => {
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.delete("pin");
    newSearchParams.delete("receiver");
    router.push("/chat", { scroll: false });
  };

  useEffect(() => {
    if (session) {
      // STEP 1: fetch all the chats form this user
      const fetchChats = async () => {
        const response = await callApi("/api/chat", {
          method: "GET",
          requiresAuth: true,
        });

        if (response.success && response.data) {
          setChats(response.data);
        }
      };

      if (!chats) {
        fetchChats();
      }

      // STEP 2: get the url params form the page
      let receiver = searchParams.get("receiver");
      let pin = searchParams.get("pin");

      // STEP 3: decide, there are 4 possible scenarios
      // - Scenario 1: no params and no chats - put a message to the user that "you don't have any chats yet"
      // - Scenario 2: yes params and no chats - make a mock chat, fetch receiver's info and paint chat without sidebar
      // - Scenario 3: no params and yes chats - put the first chat as default
      // - Scenario 4: yes params and yes chats - select that chat to start with

      const paramsExist = receiver && pin;
      const chatsExist = chats && chats?.length > 0;

      if (chatsExist && paramsExist) {
        // SCENARIO 4
        console.log("SCENARIO 4");
        const selected = chats?.filter(
          (el) =>
            el.pin._id === pin &&
            el.participants.filter((el) => el.user._id !== me?._id).length > 0
        )[0];
        setSelectedChat(selected);
      } else if (chatsExist && !paramsExist) {
        // SCENARIO 3
        console.log("SCENARIO 3");
        setSelectedChat(chats[0]);
      } else if (!chatsExist && paramsExist) {
        // SCENARIO 2
        console.log("SCENARIO 2");
        const fetchSinglePin = async () => {
          const response = await callApi(`/api/pins?_id=${pin}`, {
            method: "GET",
            requiresAuth: true,
          });
          if (response.success && response.data) {
            setPin(response.data[0]);
          }
        };

        fetchSinglePin();

        const fetchUser = async () => {
          const response = await callApi(`/api/users?_id=${receiver}`, {
            method: "GET",
            requiresAuth: true,
          });
          if (response.success && response.data) {
            setIsNewChat(response.data[0]);
          }
        };

        fetchUser();
      }
    }
  }, [chats, session]);

  // SOCKET FUNCTIONALITY
  const { socket, isConnected } = useSocket();

  useEffect(() => {
    if (!socket) return;

    // Listen for new messages
    socket.on("newMessage", (message: IMessage) => {
      setSelectedChat((prev) => {
        if (!prev) return prev;
        return {
          ...prev,
          messages: [...prev?.messages!, message],
        };
      });
    });

    // Clean up
    return () => {
      socket.off("newMessage");
    };
  }, [socket]);

  const sendData = async (data: any) => {
    if (!socket || !data.message.trim()) return;
    data.chatId = selectedChat?._id;
    data.pinId = searchParams.get("pin");
    data.receiver = searchParams.get("receiver");
    const response = await callApi(`/api/chat`, {
      method: "POST",
      requiresAuth: true,
      body: JSON.stringify(data),
    });
    socket.emit("sendMessage", {
      sender: session?.user._id,
      content: data.message,
      status: MessageStatus.SENT,
      chatId: data.chatId,
      receiverId: searchParams.get("receiver")
    });
    if (!response.success) {
      showToast("error", "Message could not be sent", response.error);
    }
  };

  if (sessionLoading) {
    // add loading here?
    return <Loader view="chat" />;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="chatView">
      <Toast
        variant={toast.variant}
        content={toast.content}
        showToast={toast.showToast}
        onClose={resetToast}
      />
      {/* Header of page */}
      {view === "list" && (
        <>
          <Breadcrumbs
            links={[{ placeholder: "Chat", url: `/chat` }]}
            className="max-w-[800px]"
          />
          <div className="flex flex-col gap-4">
            <h1 className="text-4xl w-full text-left">Chats</h1>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
          </div>
        </>
      )}
      {(chats && chats?.length > 0) || isNewChat ? (
        <>
          {/* Desktop View */}
          <div className="chatView-boxDesktop">
            {/* Chat List */}
            <div className="chatView-boxDesktop-list">
              {chats && chats?.length > 0 ? (
                chats?.map((chat, index) => (
                  <div key={chat._id} className="w-full">
                    <ChatItem
                      data={chat}
                      me={me}
                      selected={chat?._id === selectedChat?._id}
                      onClick={() => onChatClick(chat, false)}
                    />
                    {index !== chats.length - 1 && (
                      <hr className="border border-solid border-green-primary w-1/2 mx-auto" />
                    )}
                  </div>
                ))
              ) : (
                <p>No chats yet. Write your first message.</p>
              )}
            </div>

            {/* Chat Box */}
            <div className="chatView-boxDesktop-chat">
              <ChatHeader
                selectedUser={selectedUser || isNewChat}
                pinUrl={`/${selectedChat?.pin?.disaster?.slug}?pin=${selectedChat?.pin?._id}`}
              />
              <ChatBody
                selectedChat={selectedChat!}
                me={me!}
                pin={pin}
                receiver={selectedUser?.user}
              />
              <ChatInput sendData={sendData} />
            </div>
          </div>

          {/* Mobile View */}
          <div className="chatView-boxMobile">
            {view === "list" ? (
              <div className="chatView-boxMobile-list">
                {chats?.map((chat, index) => (
                  <div key={chat._id} className="w-full">
                    <ChatItem
                      data={chat}
                      me={me}
                      selected={chat._id === selectedChat?._id}
                      onClick={() => onChatClick(chat, true)}
                    />
                    {index !== chats.length - 1 && (
                      <hr className="border border-solid border-green-primary w-1/2 mx-auto" />
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="h-full w-full flex flex-col gap-2">
                <Button
                  isLink
                  variant="no-color"
                  color="black"
                  className="ml-4"
                  onClick={() => {
                    toggleMobileView();
                    removeChatParams()
                  }}
                >
                  <ArrowIcon
                    size={24}
                    color={theme.extend.colors.black.primary}
                  />
                </Button>
                <div className="chatView-boxMobile-chat">
                  <ChatHeader
                    selectedUser={selectedUser}
                    pinUrl={`/${selectedChat?.pin?.disaster?.slug}?pin=${selectedChat?.pin?._id}`}
                  />
                  <ChatBody selectedChat={selectedChat!} me={me!} pin={pin} receiver={selectedUser?.user}/>
                  <ChatInput sendData={sendData} />
                </div>
              </div>
            )}
          </div>
        </>
      ) : (
        <div>Seems like you don't have any chats yet</div>
      )}
    </div>
  );
}
