// import GENERAL_VARIABLES from "@/general";
// import { NextResponse } from "next/server";

// export async function POST(req: Request): Promise<NextResponse> {
//   console.log("ENTER ROUTING SERVER SIDE")
//   const body = await req.json();
//   console.log("body", body)
//   try {
//     if (body.refreshToken) {
//       const res = await fetch(`${GENERAL_VARIABLES.apiUrl}/auth/refresh`, {
//         method: "POST",
//         headers: {
//           Accept: "application/json",
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(body)
//       });
//       const response = await res.json();
//       return NextResponse.json(response);
//     } else {
//       console.warn("No valid token found. Access denied.");
//       return NextResponse.json({ success: false, message: "Unauthorized" });
//     }
//   } catch (error: any) {
//     console.error(error);
//     return NextResponse.json({ success: false, message: error.message });
//   }
// }
