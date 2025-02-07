"use client";
import React, { useEffect, useMemo, useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { IChat, IUser } from "@/types/structures";
import { useAuth } from "@/utils/hooks/useAuth";
import { useApi } from "@/utils/hooks/useApi";
import "./chat.scss";
import { Newsreader } from "next/font/google";
import ChatItem from "@/components/molecules/list-items/chat-item/ChatItem";
import { MessageStatus } from "@/types/enums";
import Breadcrumbs from "@/components/atoms/breadcrumbs/Breadcrumbs";

export default function ChatView() {
  const { isLoading, session } = useAuth({
    required: true,
    onError: (error) => {
      // console.error('Auth error:', error)
    },
  });

  const { callApi, loading, error } = useApi();
  const [chats, setChats] = useState<IChat[]>([]);

  const [selectedChat, setSelectedChat] = useState<IChat>();

  const searchParams = useSearchParams();
  const newSearchParams = new URLSearchParams(searchParams);
  const pinId = newSearchParams.get("pin");
  const receiver = newSearchParams.get("receiver");
  // console.log("pinId", pinId);
  // console.log("receiver", receiver);

  const receiverSelectedChat = useMemo(() => {
    return selectedChat?.participants.filter(
      (item: { user: IUser; role: "seeker" | "volunteer"; lastRead: string }) =>
        item.user._id === session?.user?._id
    )[0];
  }, [selectedChat, session]);

  useEffect(() => {
    const fetchChats = async () => {
      // const response = await callApi(`/api/chat`, {
      //   method: "GET",
      //   requiresAuth: true,
      // });
      const response: { success: boolean; data: IChat[] } = {
        success: true,
        data: [
          {
            _id: "67a34aa93a7930fee0f7eea4",
            pin: {
              _id: "67869f212d6ffd0f05d2400d",
              title: "Nala, my dog, dissapeared",
              type: {
                _id: "67867c019d959870ce6d52cc",
                title: "Missings",
                description: ".",
              },
              disasterId: "",
              description:
                "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.",
              user: {
                _id: "6786702b8b8ab612ad84312b",
                email: "test1@email.com",
                name: "Test 1",
                profilePicture: null,
              },
              coordinates: {
                lat: 39.463091,
                lng: -0.40602,
              },
              address: "C. de Cervantes, 24, Extramurs, 46007 València",
            },
            participants: [
              {
                user: {
                  _id: "6786702b8b8ab612ad84312b",
                  email: "test1@email.com",
                  name: "Test 1",
                  profilePicture: null,
                },
                role: "seeker",
                lastRead: "2025-02-05T14:10:03.535Z",
              },
              {
                user: {
                  _id: "67868c26d75d912271b357ef",
                  email: "carpinteroaranchag@gmail.com",
                  name: "Arancha Carpintero Guardiola",
                  profilePicture:
                    "https://lh3.googleusercontent.com/a/ACg8ocJ5BmyazGndlYgErjjIyw43lScTphqm__NvVA5uY9nZ6SID3qfAlQ=s96-c",
                },
                role: "volunteer",
                lastRead: "2025-02-04T14:10:03.535Z",
              },
            ],
            messages: [
              {
                _id: "67a3531e3a7930fee0f7eea5",
                chatId: "67a34aa93a7930fee0f7eea4",
                sender: "67869f212d6ffd0f05d2400d",
                createdAt: "2025-02-04T14:10:03.535Z",
                content: "This is a much longer message",
                status: MessageStatus.READ,
              },
            ],
            status: "active",
            createdAt: "2025-02-04T14:10:03.535Z",
            updatedAt: "2025-02-04T14:10:03.535Z",
          },
          {
            _id: "67a340a93a7930feepf7eea4",
            pin: {
              _id: "67869f212d6ffd0f05d2400d",
              title: "Nala, my dog, dissapeared",
              type: {
                _id: "67867c019d959870ce6d52cc",
                title: "Missings",
                description: ".",
              },
              disasterId: "",
              description:
                "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.",
              user: {
                _id: "6786702b8b8ab612ad84312b",
                email: "test1@email.com",
                name: "Test 1",
                profilePicture: null,
              },
              coordinates: {
                lat: 39.463091,
                lng: -0.40602,
              },
              address: "C. de Cervantes, 24, Extramurs, 46007 València",
            },
            participants: [
              {
                user: {
                  _id: "6786702b8b8ab612ad84312b",
                  email: "test1@email.com",
                  name: "Test 1",
                  profilePicture: null,
                },
                role: "seeker",
                lastRead: "2025-02-05T14:10:03.535Z",
              },
              {
                user: {
                  _id: "67868c26d75d912271b357ef",
                  email: "carpinteroaranchag@gmail.com",
                  name: "Arancha Carpintero Guardiola",
                  profilePicture:
                    "https://lh3.googleusercontent.com/a/ACg8ocJ5BmyazGndlYgErjjIyw43lScTphqm__NvVA5uY9nZ6SID3qfAlQ=s96-c",
                },
                role: "volunteer",
                lastRead: "2025-02-04T14:10:03.535Z",
              },
            ],
            messages: [
              {
                _id: "67a3531e3a7930fpe0f7eea5",
                chatId: "67a34aa93a7930fee0f7eea4",
                sender: "67869f212d6ffd0f05d2400d",
                createdAt: "2025-02-04T14:10:03.535Z",
                content: "This is a much longer message",
                status: MessageStatus.READ,
              },
            ],
            status: "active",
            createdAt: "2025-02-04T14:10:03.535Z",
            updatedAt: "2025-02-04T14:10:03.535Z",
          },
          {
            _id: "67a34ad93a7930fee0f7eea4",
            pin: {
              _id: "67869f212d6ffd0f05d2400d",
              title: "Nala, my dog, dissapeared",
              type: {
                _id: "67867c019d959870ce6d52cc",
                title: "Missings",
                description: ".",
              },
              disasterId: "",
              description:
                "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.",
              user: {
                _id: "6786702b8b8ab612ad84312b",
                email: "test1@email.com",
                name: "Test 1",
                profilePicture: null,
              },
              coordinates: {
                lat: 39.463091,
                lng: -0.40602,
              },
              address: "C. de Cervantes, 24, Extramurs, 46007 València",
            },
            participants: [
              {
                user: {
                  _id: "6786702b8b8ab612ad84312b",
                  email: "test1@email.com",
                  name: "Test 1",
                  profilePicture: null,
                },
                role: "seeker",
                lastRead: "2025-02-05T14:10:03.535Z",
              },
              {
                user: {
                  _id: "67868c26d75d912271b357ef",
                  email: "carpinteroaranchag@gmail.com",
                  name: "Arancha Carpintero Guardiola",
                  profilePicture:
                    "https://lh3.googleusercontent.com/a/ACg8ocJ5BmyazGndlYgErjjIyw43lScTphqm__NvVA5uY9nZ6SID3qfAlQ=s96-c",
                },
                role: "volunteer",
                lastRead: "2025-02-04T14:10:03.535Z",
              },
            ],
            messages: [
              {
                _id: "67a3531k3a7930fee0f7eea5",
                chatId: "67a34aa93a7930fee0f7eea4",
                sender: "67869f212d6ffd0f05d2400d",
                createdAt: "2025-02-04T14:10:03.535Z",
                content: "This is a much longer message",
                status: MessageStatus.READ,
              },
            ],
            status: "active",
            createdAt: "2025-02-04T14:10:03.535Z",
            updatedAt: "2025-02-04T14:10:03.535Z",
          },
        ],
      };
      console.log("response", response);
      if (response.success && response.data) {
        setChats(response.data);
      }
    };

    fetchChats();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return chats ? (
    <div className="chatView">
      <Breadcrumbs
        links={[
          {
            placeholder: "Chat",
            url: `/chat`,
          },
        ]}
        className="max-w-[800px]"
      />
      <div className="flex flex-col gap-4">
        <h1 className="text-4xl w-full text-left">Chats</h1>
        <p>
          In this page you will be able to see chats of people you have
          contacted or that have contacted you about a pin. If a user has
          deleted a pin you have used to contact them, the chat will appear
          below the ‘archived’ list.
        </p>
      </div>
      <div className="w-full flex flex-row justify-center items-start border border-solid border-green-primary h-[520px]">
        <div className="chatView-box-list w-1/3 overflow-y-auto">
          {chats.map((item: IChat, index: number) => (
            <ChatItem key={index} data={item} me={session?.user} />
          ))}
        </div>
        <div className="w-2/3 bg-[#FAF9F9] h-full">
          {/* SELECTED CHAT */}
          {!selectedChat ? (
            <p>Select a chat on the right side</p>
          ) : (
            <div>
              <div>{receiverSelectedChat?.user?.name}</div>
              
            </div>
          )}
        </div>
      </div>
    </div>
  ) : (
    <div>loading...</div>
  );
}
