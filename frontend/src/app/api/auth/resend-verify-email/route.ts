import GENERAL_VARIABLES from "@/general";
import actionLog from "@/utils/functions/actionLog";
import { NextResponse } from "next/server";

export async function GET(req: Request): Promise<NextResponse> {
  actionLog(
    "PROCESS",
    "resend-verify-email",
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
      actionLog(
        "INFO",
        "resend-verify-email",
        "GET",
        "Valid token, calling API..."
      );
      const res = await fetch(
        `${GENERAL_VARIABLES.apiUrl}/auth/resend-verify-email`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const response = await res.json();
      if (response.success) {
        actionLog(
          "SUCCESS",
          "resend-verify-email",
          "GET",
          "Data from API received correctly"
        );
      } else {
        actionLog(
          "ERROR",
          "resend-verify-email",
          "GET",
          "Something went wrong in the API"
        );
      }
      return NextResponse.json(response, { status: res.status });
    } else {
      actionLog(
        "ERROR",
        "resend-verify-email",
        "GET",
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
      "resend-verify-email",
      "GET",
      `Something went wrong when calling the API. ${error.message}`
    );
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}
