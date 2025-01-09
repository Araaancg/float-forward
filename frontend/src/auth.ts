import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import GENERAL_VARIABLES from "./general";
import TokenManager from "./storage/tokenManager";

declare module "next-auth" {
  interface Session {
    error?: string;
    success?: boolean;
    accessToken?: string;
    refreshToken?: string;
  }
}

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID!,
      clientSecret: process.env.GOOGLE_SECRET!,
    }),
    Credentials({
      id: "credentials",
      name: "Credentials",
      credentials: {
        email: { type: "email" },
        password: { type: "password" },
        name: { type: "text" }, // Optional for registration
        confirmPassword: { type: "password" }, // Optional for registration
        isRegistering: { type: "boolean" }, // To differentiate between login and register
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Email and password required");
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

          if (!data.success) {
            throw new Error(data.message || "Authentication failed");
          }

          // Store tokens in the TokenManager
          TokenManager.setTokens(data.access.token, data.refresh.token);

          // Return the user object and tokens
          return {
            _id: data.user._id,
            email: data.user.email,
            name: data.user.fullName,
            profilePicture: data.user.profileImage,
            accessToken: data.access.token,
            refreshToken: data.refresh.token,
          };
        } catch (error: any) {
          throw new Error(error.message || "Authentication failed");
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, account, trigger }: any) {
      if (trigger === "signIn") {
        if (account?.provider === "credentials") {
          // For credentials login/register, use the tokens from authorize
          return {
            ...token,
            accessToken: user.accessToken,
            refreshToken: user.refreshToken,
            error: null,
            success: true,
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

            // Store tokens in the TokenManager
            TokenManager.setTokens(data.access.token, data.refresh.token);

            return {
              ...token,
              accessToken: data.access.token,
              refreshToken: data.refresh.token,
              error: data.success ? null : "Authentication failed",
              success: data.success,
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
      return token;
    },

    async session({ session, token }: any) {
      return {
        ...session,
        error: token.error,
        success: token.success,
        accessToken: token.accessToken,
        refreshToken: token.refreshToken,
      };
    },
  },
};

export const { auth, handlers, signIn, signOut } = NextAuth(authOptions);
