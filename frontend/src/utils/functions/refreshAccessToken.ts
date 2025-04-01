import GENERAL_VARIABLES from "@/general";
import { IToken } from "@/types/interfaces";
import { JWT } from "next-auth/jwt";

export default async function refreshAccessToken(token: JWT) {
  try {
    const response = await fetch(`${GENERAL_VARIABLES.apiUrl}/auth/refresh`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        refreshToken: (token.refresh as IToken).token,
      }),
    });

    const data = await response.json();

    // console.log("RefreshToken data", data);

    if (!data.success) {
      return {
        ...token,
        error: "RefreshAccessTokenError",
      };
    }
    return {
      ...token,
      accessToken: data.access.token,
      refreshToken: data.refresh.token, // Update refresh token if your API provides a new one
      error: null,
    };
  } catch (error) {
    // console.log(error)
    return {
      ...token,
      error: "RefreshAccessTokenError",
    };
  }
}
