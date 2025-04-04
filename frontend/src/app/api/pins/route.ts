import GENERAL_VARIABLES from "@/general";
import actionLog from "@/utils/functions/actionLog";
import { NextResponse } from "next/server";

export async function GET(req: Request): Promise<NextResponse> {
  actionLog(
    "PROCESS",
    "pins",
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
      actionLog("INFO", "pins", "GET", "Valid token, calling API...");
      const url = new URL(req.url);
      const params = new URLSearchParams(url.search);
      if (params) {
        actionLog(
          "INFO",
          "pins",
          "GET",
          `Params to send: ${params.toString()}`
        );
      }
      const res = await fetch(
        `${GENERAL_VARIABLES.apiUrl}/pins${
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
        actionLog("SUCCESS", "pins", "GET", "Data from API received correctly");
      } else {
        actionLog("ERROR", "pins", "GET", "Something went wrong in the API");
      }
      return NextResponse.json(response, { status: res.status });
    } else {
      actionLog(
        "ERROR",
        "pins",
        "GET",
        "Invalid authorization header format. Expected: Bearer <token>"
      );
      return NextResponse.json({ success: false, message: "Unauthorized" });
    }
  } catch (error: any) {
    actionLog(
      "ERROR",
      "pins",
      "PUT",
      `Something went wrong when calling the API. ${error.message}`
    );
    return NextResponse.json({ success: false, message: error.message });
  }
}

export async function POST(req: Request): Promise<NextResponse> {
  actionLog(
    "PROCESS",
    "pins",
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
      actionLog("INFO", "pins", "POST", "Valid token, calling API...");
      const body = await req.json();
      actionLog("INFO", "pins", "POST", `Data to send: ${body}`);

      const res = await fetch(`${GENERAL_VARIABLES.apiUrl}/pins`, {
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
          "pins",
          "POST",
          "Data from API received correctly"
        );
      } else {
        actionLog("ERROR", "pins", "POST", "Something went wrong in the API");
      }
      return NextResponse.json(response, { status: res.status });
    } else {
      actionLog(
        "ERROR",
        "pins",
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
      "pins",
      "POST",
      `Something went wrong when calling the API. ${error.message}`
    );
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}

export async function PUT(req: Request): Promise<NextResponse> {
  actionLog(
    "PROCESS",
    "pins",
    "PUT",
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
      actionLog("INFO", "pins", "PUT", "Valid token, calling API...");
      const { _id, ...body } = await req.json();
      actionLog("INFO", "pins", "PUT", `Data to send: ${body}`);

      const res = await fetch(`${GENERAL_VARIABLES.apiUrl}/pins/${_id}`, {
        method: "PUT",
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });
      const response = await res.json();
      if (response.success) {
        actionLog("SUCCESS", "pins", "PUT", "Data from API received correctly");
      } else {
        actionLog("ERROR", "pins", "PUT", "Something went wrong in the API");
      }
      return NextResponse.json(response, { status: res.status });
    } else {
      actionLog(
        "ERROR",
        "pins",
        "PUT",
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
      "pins",
      "PUT",
      `Something went wrong when calling the API. ${error.message}`
    );
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}
