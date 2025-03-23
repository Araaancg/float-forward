import GENERAL_VARIABLES from "@/general";
import actionLog from "@/utils/functions/actionLog";
import { NextResponse } from "next/server";

export async function POST(req: Request): Promise<NextResponse> {
  actionLog(
    "PROCESS",
    "chat/read-messages",
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
      actionLog("INFO", "chat/read-messages", "POST", "Valid token, calling API...");
      const body = await req.json();
      actionLog("INFO", "chat/read-messages", "POST", `Data to send: ${body}`);

      const res = await fetch(`${GENERAL_VARIABLES.apiUrl}/chats/read-messages`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });
      const response = await res.json();
      if (response.success) {
        actionLog(
          "SUCCESS",
          "chat/read-messages",
          "POST",
          "Data from API received correctly"
        );
      } else {
        actionLog("ERROR", "chat/read-messages", "POST", "Something went wrong in the API");
      }
      return NextResponse.json(response, { status: res.status });
    } else {
      actionLog(
        "ERROR",
        "chat/read-messages",
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
      "chat/read-messages",
      "POST",
      `Something went wrong when calling the API. ${error.message}`
    );
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}
