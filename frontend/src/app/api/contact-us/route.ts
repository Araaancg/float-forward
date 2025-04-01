import GENERAL_VARIABLES from "@/general";
import actionLog from "@/utils/functions/actionLog";
import { NextResponse } from "next/server";

export async function POST(req: Request): Promise<NextResponse> {
  actionLog(
    "PROCESS",
    "contact",
    "POST",
    "Request received, calling the backend..."
  );

  const body = await req.json();
  actionLog("INFO", "pins", "POST", `Data to send: ${body}`);

  const res = await fetch(`${GENERAL_VARIABLES.apiUrl}/contact-us`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
  const response = await res.json();
  if (response.success) {
    actionLog("SUCCESS", "pins", "POST", "Data from API received correctly");
  } else {
    actionLog("ERROR", "pins", "POST", "Something went wrong in the API");
  }
  return NextResponse.json(response, { status: res.status });
}
