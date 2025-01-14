import GENERAL_VARIABLES from "@/general";
import { NextResponse } from "next/server";

export async function GET(req: Request): Promise<NextResponse> {
  const url = new URL(req.url);
  const params = new URLSearchParams(url.search);

  const apiUrl = GENERAL_VARIABLES.apiUrl;

  try {
    const res = await fetch(
      `${apiUrl}/disasters${params.toString() ? "?" + params.toString() : ""}`,
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    );
    const response = await res.json();
    return NextResponse.json(response);
  } catch (error: any) {
    console.error(error);
    return NextResponse.json({ success: false, message: error.message });
  }
}
