"use client";
import React, { useEffect, useMemo, useState } from "react";
import Breadcrumbs from "@/components/atoms/breadcrumbs/Breadcrumbs";
import { IChat, IMessage, IPin } from "@/types/structures";
import ChatItem from "@/components/organisms/chat/chat-item/ChatItem";
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
import { pusherClient } from "@/pusher";

export default function ChatView() {
  const { sessionLoading, session } = useAuth();
  const me = session?.user;

  const searchParams = useSearchParams();
  const router = useRouter();

  const [view, setView] = useState<"list" | "chat">("chat");
  const [selectedChat, setSelectedChat] = useState<IChat>();
  const [pin, setPin] = useState<IPin>();
  const [chats, setChats] = useState<IChat[]>();
  const { callApi, loading, error } = useApi(session);

  useEffect(() => {
    const fetchChats = async () => {
      const response = await callApi("/api/chat", {
        method: "GET",
        requiresAuth: true,
      });

      console.log("response", response);
      if (response.success && response.data) {
        setChats(response.data);
      }
    };

    fetchChats();
  }, []);

  const selectedUser = useMemo(() => {
    return selectedChat?.participants.filter(
      (el) => el.user._id !== me?._id
    )[0];
  }, [selectedChat]);

  const toggleMobileView = () =>
    // this is just for mobile
    setView((prev) => (prev === "list" ? "chat" : "list"));

  const onChatClick = async (chat: IChat, isMobile: boolean) => {
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

    const response = await callApi(`/api/chat/read-messages`, {
      method: "POST",
      requiresAuth: true,
      body: { chatId: chat._id },
    });

    console.log("response read messages", response);

    router.push(`/chat?pin=${pin}&receiver=${receiver}`, { scroll: false });
  };

  // const {
  //   data: chats,
  //   loading,
  //   error,
  // } = useData<IChat[]>(
  //   "/api/chat",
  //   {
  //     method: "GET",
  //     requiresAuth: true,
  //   },
  //   session
  // );

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
      )[0];

      setSelectedChat(selected);

      // if there is no chat selected means the chat is new
      // retrieve pin info:
      if (!selected) {
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
      }
    }
  }, [chats, searchParams, router]);

  const sendData = async (data: any) => {
    // data.message = "hola";
    data.chatId = selectedChat?._id;
    data.pinId = searchParams.get("pin");
    data.receiver = searchParams.get("receiver");
    // console.log("message ->", data);
    const response = await callApi(`/api/chat`, {
      method: "POST",
      requiresAuth: true,
      body: JSON.stringify(data),
    });
    // console.log("response", response);
  };

  useEffect(() => {
    if (!selectedChat?._id || !me?._id) return;
    
    const chatChannel = `chat__${selectedChat._id}`;
    const unreadMessagesChannel = `user__${me._id}__unread_messages`;
    
    pusherClient.subscribe(chatChannel);
    pusherClient.subscribe(unreadMessagesChannel);
  
    const newMessagesHandler = (message: IMessage) => {
      // Update the selected chat with the new message
      setSelectedChat((prev) => {
        if (!prev) return prev;
        return {
          ...prev,
          messages: [...prev?.messages!, message],
        };
      });
    };
  
    const unreadMessagesHandler = (data: { chatId: string, unreadCount: number }) => {
      // Update the unread count in our local chats copy
      setChats((prevChats) => {
        if (!prevChats) return prevChats;
        
        return prevChats.map(chat => {
          if (chat._id === data.chatId) {
            // Find the participant that represents the current user
            const updatedParticipants = chat.participants.map(participant => {
              if (participant.user._id === me._id) {
                return {
                  ...participant,
                  unreadCount: data.unreadCount // Or increment the current count
                };
              }
              return participant;
            });
            
            return {
              ...chat,
              participants: updatedParticipants
            };
          }
          return chat;
        });
      });
    };
  
    pusherClient.bind("new_message", newMessagesHandler);
    pusherClient.bind("unread_message", unreadMessagesHandler);
  
    return () => {
      pusherClient.unsubscribe(chatChannel);
      pusherClient.unsubscribe(unreadMessagesChannel);
      pusherClient.unbind("new_message", newMessagesHandler);
      pusherClient.unbind("unread_message", unreadMessagesHandler);
    };
  }, [selectedChat?._id, me?._id]);

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
              <ChatBody selectedChat={selectedChat!} me={me!} pin={pin} />
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
                  <ChatBody selectedChat={selectedChat!} me={me!} pin={pin} />
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
