import GENERAL_VARIABLES from "@/general";
import actionLog from "@/utils/functions/actionLog";
import { NextResponse } from "next/server";

export async function GET(req: Request): Promise<NextResponse> {
  actionLog("PROCESS", "disasters", "GET", "Calling backend...");
  try {
    const url = new URL(req.url);
    const params = new URLSearchParams(url.search);
    if (params) {
      actionLog("INFO", "disasters", "GET", `Params to send: ${params.toString()}`);
    }
    const res = await fetch(
      `${GENERAL_VARIABLES.apiUrl}/disasters${params.toString() ? "?" + params.toString() : ""}`,
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    );
    const response = await res.json();
    if (response.success) {
      actionLog(
        "SUCCESS",
        "disasters",
        "GET",
        "Data from API received correctly"
      );
    } else {
      actionLog("ERROR", "disasters", "GET", "Something went wrong in the API");
    }
    return NextResponse.json(response, { status: res.status });
  } catch (error: any) {
    actionLog(
      "ERROR",
      "disasters",
      "GET",
      `Something went wrong when calling the API. ${error.message}`
    );
    return NextResponse.json({ success: false, message: error.message });
  }
}
