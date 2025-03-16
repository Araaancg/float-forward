// hooks/useApi.ts
import { useState } from "react";
import actionLog from "../functions/actionLog";

interface ApiOptions {
  method: "GET" | "POST" | "PUT" | "DELETE";
  headers?: Record<string, string>;
  body?: any;
  requiresAuth?: boolean;
}

export function useApi(session?: any) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // const { data: session } = useSession();

  const callApi = async (
    endpoint: string,
    options: ApiOptions = { method: "GET" }
  ): Promise<any> => {
    const {
      method = "GET",
      headers = {},
      body,
      requiresAuth = false,
    } = options;

    try {
      setLoading(true);
      setError(null);

      const requestHeaders: Record<string, string> = {
        "Content-Type": "application/json",
        ...headers,
      };

      if (requiresAuth) {
        // console.log("\n\n\nREQUIRES AUTHENTICATION", session?.access.token);
        // console.log(session);
        requestHeaders["Authorization"] = `Bearer ${session?.access.token}`;
      }

      const response = await fetch(endpoint, {
        method,
        headers: requestHeaders,
        body: body ? JSON.stringify(body) : undefined,
      });

      const data = await response.json();

      if (!response.ok) {
        actionLog("error", `ApiCall not ok: ${data.message}`);
        throw new Error(data.message || "An error occurred");
      }

      return {
        success: true,
        data: data.data,
        status: response.status,
      };
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "An unexpected error occurred";
      setError(errorMessage);

      return {
        success: false,
        message: errorMessage,
        status: err instanceof Error ? 500 : undefined,
      };
    } finally {
      setLoading(false);
    }
  };

  return {
    callApi,
    loading,
    error,
  };
}
