import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import GENERAL_VARIABLES from "./general";
import { JWT } from "next-auth/jwt";
import { IUser } from "./types/structures";
import refreshAccessToken from "./utils/functions/refreshAccessToken";
import { IToken } from "./types/interfaces";
import actionLog from "./utils/functions/actionLog";

declare module "next-auth" {
  interface Session {
    access: IToken;
    refresh: IToken;
    success: boolean;
    error: string | null;
    user: {
      _id: string;
      name: string;
      email: string;
      profilePicture: string;
    };
  }
}

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.AUTH_GOOGLE_ID!,
      clientSecret: process.env.AUTH_GOOGLE_SECRET!,
    }),
    CredentialsProvider({
      id: "credentials",
      name: "Credentials",
      credentials: {
        email: { type: "email" },
        password: { type: "password" },
        name: { type: "text" },
        confirmPassword: { type: "password" },
        isRegistering: { type: "boolean" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          actionLog("ERROR", "Email and password required");
          throw new Error(
            JSON.stringify({
              status: 400,
              message: "Email and password required",
            })
          );
        }

        try {
          const endpoint = credentials.isRegistering ? "register" : "login";
          const payload = credentials.isRegistering
            ? {
                email: credentials.email,
                password: credentials.password,
                confirmPassword: credentials.confirmPassword,
                name: credentials.name,
                provider: "credentials",
              }
            : {
                email: credentials.email,
                password: credentials.password,
                provider: "credentials",
              };

          const response = await fetch(
            `${GENERAL_VARIABLES.apiUrl}/auth/${endpoint}`,
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(payload),
            }
          );

          const data = await response.json();
          // console.log("authorize data", data)

          if (!data.success) {
            throw new Error(data.message || "Authentication failed");
          }

          // Return user data and tokens
          return {
            user: data.user,
            id: data.user._id,
            email: data.user.email,
            name: data.user.name,
            profilePicture: data.user.profilePicture,
            access: data.access,
            refresh: data.refresh,
          };
        } catch (error) {
          if (error instanceof Error) {
            throw new Error(error.message);
          }
          throw new Error("Authentication failed");
        }
      },
    }),
  ],
  // pages: {
  //   signIn: '/auth/signin',
  //   error: '/auth/error',
  // },
  callbacks: {
    async jwt({
      token,
      user,
      account,
      trigger,
    }: {
      token: JWT;
      user?: any;
      account?: any;
      trigger?: "signIn" | "signUp" | "update";
    }) {
      // Initial sign in
      if (trigger === "signIn" && user) {
        if (account?.provider === "credentials") {
          actionLog("SIGN IN", "Loggin in with credentials...");
          return {
            ...token,
            access: user.access,
            refresh: user.refresh,
            user: user.user,
            success: true,
            error: null,
          };
        } else if (account?.provider === "google") {
          try {
            const response = await fetch(
              `${GENERAL_VARIABLES.apiUrl}/auth/login`,
              {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                  email: token.email,
                  name: token.name,
                  picture: token.picture,
                  provider: "google",
                  token: account.id_token,
                }),
              }
            );

            const data = await response.json();

            if (!data.success) {
              return {
                ...token,
                error: "Authentication failed",
                success: false,
              };
            }

            return {
              ...token,
              access: data.access,
              refresh: data.refresh,
              user: data.user,
              success: true,
              error: null,
            };
          } catch (error) {
            return {
              ...token,
              error: "Authentication failed",
              success: false,
            };
          }
        }
      }

      // Return previous token if the access token has not expired
      if (new Date((token.access as IToken)?.expires) > new Date()) {
        return token;
      }

      // Access token has expired, refresh it
      return refreshAccessToken(token);
    },

    async session({ session, token }: { session: any; token: JWT }) {
      return {
        access: token.access as IToken,
        refresh: token.refresh as IToken,
        expires: (token.access as IToken).expires,
        success: token.success ?? false,
        error: token.error ?? null,
        user: {
          _id: (token.user as IUser)._id,
          name: (token.user as IUser).name,
          email: (token.user as IUser).email,
          profilePicture: (token.user as IUser).profilePicture,
        },
      };
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};

export const { auth, handlers, signIn, signOut } = NextAuth(authOptions);
