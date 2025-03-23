import GENERAL_VARIABLES from "@/general";
import { pusherServer } from "@/pusher";
import actionLog from "@/utils/functions/actionLog";
import { NextResponse } from "next/server";

export async function GET(req: Request): Promise<NextResponse> {
  actionLog(
    "PROCESS",
    "chat",
    "GET",
    "Request received, verifying tokens before sending it to API..."
  );
  try {
    const authorizationHeader = req.headers.get("Authorization");
    let token;
    if (authorizationHeader) {
      const tokenParts = authorizationHeader.split(" ");
      if (tokenParts.length === 2 && tokenParts[0] === "Bearer") {
        token = tokenParts[1];
      }
    }
    if (token) {
      actionLog("INFO", "chat", "GET", "Valid token, calling API...");
      const url = new URL(req.url);
      const params = new URLSearchParams(url.search);
      if (params) {
        actionLog(
          "INFO",
          "chat",
          "GET",
          `Params to send: ${params.toString()}`
        );
      }
      const res = await fetch(
        `${GENERAL_VARIABLES.apiUrl}/chats${
          params.toString() ? "?" + params.toString() : ""
        }`,
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const response = await res.json();
      if (response.success) {
        actionLog("SUCCESS", "chat", "GET", "Data from API received correctly");
      } else {
        actionLog("ERROR", "chat", "GET", "Something went wrong in the API");
      }
      return NextResponse.json(response);
    } else {
      actionLog(
        "ERROR",
        "chat",
        "GET",
        "Invalid authorization header format. Expected: Bearer <token>"
      );
      return NextResponse.json({ success: false, message: "Unauthorized" });
    }
  } catch (error: any) {
    console.error(error);
    return NextResponse.json({ success: false, message: error.message });
  }
}

export async function POST(req: Request): Promise<NextResponse> {
  actionLog(
    "PROCESS",
    "chat",
    "POST",
    "Request received, verifying tokens before sending it to API..."
  );

  try {
    const authorizationHeader = req.headers.get("Authorization");
    let token;
    if (authorizationHeader) {
      const tokenParts = authorizationHeader.split(" ");
      if (tokenParts.length === 2 && tokenParts[0] === "Bearer") {
        token = tokenParts[1];
      }
    }

    if (token) {
      actionLog("INFO", "chat", "POST", "Valid token, calling API...");
      const body = await req.json();
      actionLog("INFO", "chat", "POST", `Data to send: ${body}`);

      const res = await fetch(`${GENERAL_VARIABLES.apiUrl}/chats`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body,
      });
      const response = await res.json();
      console.log("chat response", response);
      if (response.success) {
        actionLog(
          "SUCCESS",
          "chat",
          "POST",
          "Data from API received correctly"
        );
        const channel = `chat__${JSON.parse(body).chatId}`;
        actionLog(
          "PROCESS",
          "chat",
          "POST",
          `Pusher: Triggering channel: ${channel}`
        );
        await pusherServer.trigger(
          channel,
          "new_message",
          response.data.messages.slice(-1)[0]
        );
        const receiver = JSON.parse(body).receiver;
        await pusherServer.trigger(
          `user__${receiver}__unread_messages`,
          "unread_message",
          response.data
        );
      } else {
        actionLog("ERROR", "chat", "POST", "Something went wrong in the API");
      }
      return NextResponse.json(response, { status: res.status });
    } else {
      actionLog(
        "ERROR",
        "chat",
        "POST",
        "Invalid authorization header format. Expected: Bearer <token>"
      );
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 }
      );
    }
  } catch (error: any) {
    actionLog(
      "ERROR",
      "chat",
      "POST",
      `Something went wrong when calling the API. ${error.message}`
    );
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}
