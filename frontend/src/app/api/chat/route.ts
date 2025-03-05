import GENERAL_VARIABLES from "@/general";
import { NextResponse } from "next/server";

export async function GET(req: Request): Promise<NextResponse> {
  const url = new URL(req.url);
  const params = new URLSearchParams(url.search);

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
      console.log("RESPONSE CHAT ROUTE.TS CLIENT", response);
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
  console.log("body", body);

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
      const res = await fetch(`${apiUrl}/chats`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(body),
      });
      const response = await res.json();
      console.log("Server side res", response);
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
