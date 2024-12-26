import dotenv from "dotenv";
import { NextApiResponse } from "next";
import { NextResponse } from "next/server";

dotenv.config();

export async function POST(req: any, res: NextApiResponse): Promise<any> {
  const body = await req.json();
  try {
    const res = await fetch(`${process.env.API_URL_DEV}/api/v1/auth/login`, {
        method: "POST",
        body: JSON.stringify(body),
      });
    const response = await res.json();
    return NextResponse.json({ sucess: true, status: 200 });
  } catch (e) {
    console.error("Error Nodemailer:", e);
    return NextResponse.json({ e, status: 500 });
  }
}
