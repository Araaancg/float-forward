import { useState } from "react";

interface ApiOptions {
  method: "GET" | "POST" | "PUT" | "DELETE";
  headers?: Record<string, string>;
  body?: any;
  requiresAuth?: boolean;
}

export function useApi(session?: any) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

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
        ...headers,
      };
      
      // Only add Content-Type for JSON requests, not for FormData
      if (!(body instanceof FormData)) {
        requestHeaders["Content-Type"] = "application/json";
      }

      if (requiresAuth) {
        requestHeaders["Authorization"] = `Bearer ${session?.access.token}`;
      }

      const requestOptions: RequestInit = {
        method,
        headers: requestHeaders,
        // If body is FormData, send it directly; otherwise stringify it
        body: body instanceof FormData ? body : body ? JSON.stringify(body) : undefined,
      };

      const response = await fetch(endpoint, requestOptions);
      const data = await response.json();

      if (!response.ok) {
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