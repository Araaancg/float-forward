import GENERAL_VARIABLES from "@/general";
import { NextResponse } from "next/server";

export async function POST(req: Request): Promise<NextResponse> {
  const body = await req.json();
  console.log("body", body);
  try {
    const res = await fetch(
      `${GENERAL_VARIABLES.apiUrl}/auth/forgot-password`,
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      }
    );
    const response = await res.json();
    return NextResponse.json(response);
  } catch (error: any) {
    console.error(error);
    return NextResponse.json({ success: false, message: error.message });
  }
}
