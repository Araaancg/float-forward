import GENERAL_VARIABLES from "@/general";
import { NextResponse } from "next/server";

export async function GET(req: Request): Promise<NextResponse> {
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
