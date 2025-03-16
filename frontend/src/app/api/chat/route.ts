import GENERAL_VARIABLES from "@/general";
import { pusherServer } from "@/pusher";
import { NextResponse } from "next/server";

export async function GET(req: Request): Promise<NextResponse> {
  const url = new URL(req.url);
  const params = new URLSearchParams(url.search);
  console.log("REQUESTING RESPONSE CHATs")
  const apiUrl = GENERAL_VARIABLES.apiUrl;

  try {
    const authorizationHeader = req.headers.get("Authorization");
    let token;
    if (authorizationHeader) {
      const tokenParts = authorizationHeader.split(" ");
      if (tokenParts.length === 2 && tokenParts[0] === "Bearer") {
        token = tokenParts[1];
      } else {
        console.warn(
          "Invalid authorization header format. Expected: Bearer <token>"
        );
      }
    }
    if (token) {
      const res = await fetch(
        `${apiUrl}/chats${params.toString() ? "?" + params.toString() : ""}`,
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const response = await res.json();
      return NextResponse.json(response);
    } else {
      console.warn("No valid token found. Access denied.");
      return NextResponse.json({ success: false, message: "Unauthorized" });
    }
  } catch (error: any) {
    console.error(error);
    return NextResponse.json({ success: false, message: error.message });
  }
}

export async function POST(req: Request): Promise<NextResponse> {
  const apiUrl = GENERAL_VARIABLES.apiUrl;
  const body = await req.json();

  try {
    const authorizationHeader = req.headers.get("Authorization");
    let token;
    if (authorizationHeader) {
      const tokenParts = authorizationHeader.split(" ");
      if (tokenParts.length === 2 && tokenParts[0] === "Bearer") {
        token = tokenParts[1];
      } else {
        console.warn(
          "Invalid authorization header format. Expected: Bearer <token>"
        );
      }
    }

    if (token) {
      console.log("posting chats...");
      const res = await fetch(`${apiUrl}/chats`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body,
      });
      const response = await res.json();
      console.log("response", response);

      // Post messages:
      const channel = `chat__${JSON.parse(body).chatId}`;
      console.log("Triggering channel: ", channel);
      await pusherServer.trigger(
        channel,
        "new_message",
        response.data.messages.slice(-1)[0]
      );
      const receiver = JSON.parse(body).receiver
      await pusherServer.trigger(
        `user__${receiver}__unread_messages`,
        'unread_message', response.data
      );
      return NextResponse.json(response, { status: res.status });
    } else {
      return NextResponse.json(
        { error: "Unauthorized: Token could not be access in server side" },
        { status: 401 }
      );
    }
  } catch (error: any) {
    console.error(error);
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}
