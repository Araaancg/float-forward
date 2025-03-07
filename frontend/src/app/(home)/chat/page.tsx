"use client";
import React, { useEffect, useMemo, useState } from "react";
import Breadcrumbs from "@/components/atoms/breadcrumbs/Breadcrumbs";
import { chatMock } from "@/mocks/chat";
import { IChat } from "@/types/structures";
import { useAuth } from "@/utils/hooks/useAuth";
import ChatItem from "@/components/molecules/list-items/chat-item/ChatItem";
import Button from "@/components/atoms/button/Button";
import theme from "@/theme";
import ArrowIcon from "@/components/atoms/icons/ArrowIcon";
import ChatHeader from "@/components/organisms/chat/chat-header/ChatHeader";
import ChatBody from "@/components/organisms/chat/chat-body/ChatBody";
import ChatInput from "@/components/organisms/chat/chat-input/ChatInput";
import { useApi } from "@/utils/hooks/useApi";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import "./chat.scss";

export default function ChatView() {
  const { isLoading, session } = useAuth({
    required: true,
    onError: (error) => {
      // console.error('Auth error:', error)
    },
  });
  console.log("session", session);

  const me = session?.user;

  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const [view, setView] = useState<"list" | "chat">("list");
  const [chats, setChats] = useState<IChat[]>(chatMock);
  const { callApi, loading, error } = useApi();
  const [selectedChat, setSelectedChat] = useState<IChat>();

  const selectedUser = useMemo(() => {
    return selectedChat?.participants.filter(
      (el) => el.user._id !== me?._id
    )[0];
  }, [selectedChat]);

  const toggleMobileView = () =>
    setView((prev) => (prev === "list" ? "chat" : "list"));

  // const clearChatParam = () => {
  //   // Create new search params
  //   const params = new URLSearchParams(searchParams);

  //   // Delete the 'chat' parameter
  //   params.delete('chatId');

  //   // If there are no more params, push just the pathname
  //   // Otherwise, push pathname with remaining params
  //   if (params.toString()) {
  //     router.push(`${pathname}?${params.toString()}`);
  //   } else {
  //     router.push(pathname);
  //   }
  // };

  const onChatClick = (chat: IChat, isMobile: boolean) => {
    if (isMobile) toggleMobileView();

    // Set the selected chat
    setSelectedChat(chat);

    // Update URL with new chat parameter
    const params = new URLSearchParams(searchParams);
    params.set("chatId", chat._id);

    // Push new URL with updated chat parameter
    router.push(`${pathname}?${params.toString()}`);
  };

  useEffect(() => {
    const fetchDisasters = async () => {
      const response = await callApi(`/api/chat`, {
        method: "GET",
        requiresAuth: true,
      });

      console.log("response", response);
      if (response.success && response.data) {
        setChats(response.data);
        const existingChatId = searchParams.get("chatId");
        console.log("existingChatId", existingChatId);

        if (existingChatId) {
          const chatInUrl = response.data.find(
            (el: IChat) => el._id === existingChatId
          );
          setSelectedChat(chatInUrl);
        } else {
          const firstChat = response.data[0];
          setSelectedChat(firstChat);

          const params = new URLSearchParams(searchParams);
          params.set("chatId", firstChat._id);

          router.push(`${pathname}?${params.toString()}`);
        }
      }
    };

    fetchDisasters();
  }, [searchParams, pathname, router]);

  const sendData = async (data: any) => {
    data.chatId = selectedChat?._id;
    data.pinId = selectedChat?.pin?._id;
    data.receiver = selectedChat?.participants.filter(
      (el) => el.user._id !== me?._id
    )[0].user._id;
    console.log(data);
    const response = await callApi(`/api/chat`, {
      method: "POST",
      requiresAuth: true,
      body: JSON.stringify(data), 
    });

    console.log("response", response);
    if (response.success && response.data) {
      setChats(response.data);
      setSelectedChat(
        response.data.filter((el: IChat) => el._id === data.chatId)
      );
    }
    //   {
    //     "chatId": "67c77906ee02b39e842f8b74",
    //     "pinId": "6786afe2325f25b757817c92",
    //     "receiver": "67868c26d75d912271b357ef",
    //     "message": "This is the first postman message"
    // }
  };

  return (
    <div className="chatView">
      {/* Breadcrumbs */}
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
          <ChatBody selectedChat={selectedChat} me={me} />
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
              <ArrowIcon size={24} color={theme.extend.colors.black.primary} />
            </Button>
            <div className="chatView-boxMobile-chat">
              <ChatHeader
                selectedUser={selectedUser}
                pinUrl={`/${selectedChat?.pin?.disaster?.slug}?pin=${selectedChat?.pin?._id}`}
              />
              <ChatBody selectedChat={selectedChat} me={me} />
              <ChatInput sendData={sendData} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
