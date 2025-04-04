import GENERAL_VARIABLES from "@/general";
import actionLog from "@/utils/functions/actionLog";
import { NextResponse } from "next/server";

export async function GET(req: Request): Promise<NextResponse> {
    actionLog(
      "PROCESS",
      "users",
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
        actionLog("INFO", "users", "GET", "Valid token, calling API...");
        const url = new URL(req.url);
        const params = new URLSearchParams(url.search);
        if (params) {
          actionLog(
            "INFO",
            "users",
            "GET",
            `Params to send: ${params.toString()}`
          );
        }
        const res = await fetch(
          `${GENERAL_VARIABLES.apiUrl}/users${
            params.toString() ? "?" + params.toString() : ""
          }`,
          {
            method: "GET",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const response = await res.json();
        if (response.success) {
          actionLog("SUCCESS", "users", "GET", "Data from API received correctly");
        } else {
          actionLog("ERROR", "users", "GET", "Something went wrong in the API");
        }
        return NextResponse.json(response, { status: res.status });
      } else {
        actionLog(
          "ERROR",
          "users",
          "GET",
          "Invalid authorization header format. Expected: Bearer <token>"
        );
        return NextResponse.json({ success: false, message: "Unauthorized" });
      }
    } catch (error: any) {
      actionLog(
        "ERROR",
        "users",
        "PUT",
        `Something went wrong when calling the API. ${error.message}`
      );
      return NextResponse.json({ success: false, message: error.message });
    }
  }