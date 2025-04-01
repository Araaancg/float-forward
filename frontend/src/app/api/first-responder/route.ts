import GENERAL_VARIABLES from "@/general";
import actionLog from "@/utils/functions/actionLog";
import { NextResponse } from "next/server";

export async function POST(req: Request): Promise<NextResponse> {
  actionLog(
    "PROCESS",
    "first-responder",
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
      actionLog("INFO", "first-responder", "POST", "Valid token, calling API...");
      
      // For FormData requests, we need to handle them differently than JSON
      const formData = await req.formData();
      actionLog("INFO", "first-responder", "POST", "FormData received");

      // Create a new FormData to forward to the API
      const apiFormData = new FormData();
      
      // Copy all fields from the request formData to our new formData
      for (const [key, value] of formData.entries()) {
        apiFormData.append(key, value);
      }

      // Make the API call with the FormData
      const res = await fetch(`${GENERAL_VARIABLES.apiUrl}/applications`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
          // Don't set Content-Type when sending FormData, the browser will set it with the correct boundary
        },
        body: apiFormData,
      });
      
      const response = await res.json();
      if (response.success) {
        actionLog(
          "SUCCESS",
          "first-responder",
          "POST",
          "Data from API received correctly"
        );
      } else {
        actionLog("ERROR", "first-responder", "POST", "Something went wrong in the API");
      }
      return NextResponse.json(response, { status: res.status });
    } else {
      actionLog(
        "ERROR",
        "first-responder",
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
      "first-responder",
      "POST",
      `Something went wrong when calling the API. ${error.message}`
    );
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}