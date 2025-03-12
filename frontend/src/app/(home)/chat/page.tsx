"use client";
import React, { useEffect, useMemo, useState } from "react";
import Breadcrumbs from "@/components/atoms/breadcrumbs/Breadcrumbs";
import { IChat, IPin } from "@/types/structures";
import ChatItem from "@/components/molecules/list-items/chat-item/ChatItem";
import Button from "@/components/atoms/button/Button";
import theme from "@/theme";
import ArrowIcon from "@/components/atoms/icons/ArrowIcon";
import ChatHeader from "@/components/organisms/chat/chat-header/ChatHeader";
import ChatBody from "@/components/organisms/chat/chat-body/ChatBody";
import ChatInput from "@/components/organisms/chat/chat-input/ChatInput";
import { useRouter, useSearchParams } from "next/navigation";
import Loader from "@/components/atoms/loader/Loader";
import { useData } from "@/utils/hooks/useData";
import { useAuth } from "@/utils/hooks/useAuth";
import { useApi } from "@/utils/hooks/useApi";
import "./chat.scss";

// http://localhost:3000/chat?pin=6793c20e4ef2222c5e127105&receiver=6793c1ab4ef2222c5e1270e2

export default function ChatView() {
  const { sessionLoading, session } = useAuth();
  const me = session?.user;

  const searchParams = useSearchParams();
  const router = useRouter();

  const [view, setView] = useState<"list" | "chat">("list");
  const [selectedChat, setSelectedChat] = useState<IChat>();
  const [pin, setPin] = useState<IPin>()
  const { callApi } = useApi(session);

  const selectedUser = useMemo(() => {
    return selectedChat?.participants.filter(
      (el) => el.user._id !== me?._id
    )[0];
  }, [selectedChat]);

  const toggleMobileView = () =>
    // this is just for mobile
    setView((prev) => (prev === "list" ? "chat" : "list"));

  const onChatClick = (chat: IChat, isMobile: boolean) => {
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

    router.push(`/chat?pin=${pin}&receiver=${receiver}`, { scroll: false });
  };

  const {
    data: chats,
    loading,
    error,
  } = useData<IChat[]>(
    "/api/chat",
    {
      method: "GET",
      requiresAuth: true,
    },
    session
  );

  useEffect(() => {
    if (chats && chats.length > 0) {
      let receiver = searchParams.get("receiver");
      let pin = searchParams.get("pin");

      if (!pin || !receiver) {
        // means there is no data in the url, we push it ourselves
        receiver = chats[0].participants.filter(
          (el) => el.user._id !== me?._id
        )[0].user._id;
        pin = chats[0].pin._id;
        // set them in the url
        const params = new URLSearchParams(searchParams.toString());
        params.set("pin", pin);
        params.set("receiver", receiver);

        router.push(`/chat?pin=${pin}&receiver=${receiver}`, {
          scroll: false,
        });
      }

      const selected = chats?.filter(
        (el) =>
          el.pin._id === pin &&
          el.participants.filter((el) => el.user._id !== me?._id).length > 0
      )[0]

      setSelectedChat(selected);

      // if there is no chat selected means the chat is new
      // retrieve pin info:
      if (!selected) {
        console.log("CHAT DOES NOT EXIST")
        const fetchSinglePin = async () => {
          const response = await callApi(`/api/pins?_id=${pin}`, {
            method: "GET",
            requiresAuth: true,
          });
          console.log(response)
          if (response.success && response.data) {
            console.log("response", response);
            setPin(response.data[0]);
          }
        };
    
        fetchSinglePin();
      }
    }
  }, [chats, searchParams, router]);

  const sendData = async (data: any) => {
    data.message = "hola"
    data.chatId = selectedChat?._id;
    data.pinId = searchParams.get("pin");
    data.receiver = searchParams.get("receiver");
    console.log("message ->", data);
    const response = await callApi(`/api/chat`, {
      method: "POST",
      requiresAuth: true,
      body: JSON.stringify(data),
    });
    console.log("response", response);
  };

  if (sessionLoading || loading) {
    return <Loader view="chat" />;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="chatView">
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
      {chats && chats?.length > 0 ? (
        <>
          {/* Desktop View */}
          <div className="chatView-boxDesktop">
            {/* Chat List */}
            <div className="chatView-boxDesktop-list">
              {chats?.map((chat, index) => (
                <div key={chat._id} className="w-full">
                  <ChatItem
                    data={chat}
                    me={me}
                    selected={chat._id === selectedChat?._id}
                    onClick={() => onChatClick(chat, false)}
                  />
                  {index !== chats.length - 1 && (
                    <hr className="border border-solid border-green-primary w-1/2 mx-auto" />
                  )}
                </div>
              ))}
            </div>

            {/* Chat Box */}
            <div className="chatView-boxDesktop-chat">
              <ChatHeader
                selectedUser={selectedUser}
                pinUrl={`/${selectedChat?.pin?.disaster?.slug}?pin=${selectedChat?.pin?._id}`}
              />
              <ChatBody selectedChat={selectedChat!} me={me!} pin={pin}/>
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
                  onClick={toggleMobileView}
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
                  <ChatBody selectedChat={selectedChat!} me={me!} pin={pin}/>
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
