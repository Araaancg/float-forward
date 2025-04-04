import GENERAL_VARIABLES from "@/general";
import actionLog from "@/utils/functions/actionLog";
import { NextResponse } from "next/server";

export async function POST(req: Request): Promise<NextResponse> {
  actionLog("PROCESS", "custom-register", "POST", "Calling backend...");
  const body = await req.json();
  actionLog("INFO", "custom-register", "POST", `Data to send: ${body}`);
  try {
    const res = await fetch(`${GENERAL_VARIABLES.apiUrl}/auth/register`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    const response = await res.json();
    if (response.success) {
      actionLog(
        "SUCCESS",
        "custom-register",
        "POST",
        "Data from API received correctly"
      );
    } else {
      actionLog(
        "ERROR",
        "custom-register",
        "POST",
        "Something went wrong in the API"
      );
    }
    return NextResponse.json(response, { status: res.status });
  } catch (error: any) {
    actionLog(
      "ERROR",
      "custom-register",
      "POST",
      `Something went wrong when calling the API. ${error.message}`
    );
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}
