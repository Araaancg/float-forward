import GENERAL_VARIABLES from "@/general";
import { NextResponse } from "next/server";

export async function POST(req: Request): Promise<NextResponse> {
  const apiUrl = GENERAL_VARIABLES.apiUrl;
  const body = await req.json();
  body.check = true

  try {
    const res = await fetch(`${apiUrl}/auth/register`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    const response = await res.json();
    return NextResponse.json(response, { status: res.status });
  } catch (e) {
    return NextResponse.json(
      {
        error: `There was an error getting a response from backend/auth/login: ${e}`,
      },
      { status: 500 }
    );
  }
}
