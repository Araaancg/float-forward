// hooks/useApi.ts
import { useSession } from 'next-auth/react';
import { useState } from 'react';

interface ApiResponse<T> {
  success: boolean;
  data?: T;
  status?: number;
  error?: string;
}

interface ApiOptions {
  method: 'GET' | 'POST' | 'PUT' | 'DELETE';
  headers?: Record<string, string>;
  body?: any;
  requiresAuth?: boolean;
}

export function useApi() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const {data: session} = useSession()

  const callApi = async (
    endpoint: string,
    options: ApiOptions = {method: "GET"}
  ): Promise<any> => {
    const {
      method = 'GET',
      headers = {},
      body,
      requiresAuth = false
    } = options;

    try {
      setLoading(true);
      setError(null);

      const requestHeaders: Record<string, string> = {
        'Content-Type': 'application/json',
        ...headers
      };

      if (requiresAuth) {
        // Add your authentication header here
        // Example: requestHeaders['Authorization'] = `Bearer ${session?.accessToken}`;
        requestHeaders['Authorization'] = `Bearer ${session?.access.token}`;
      }

      const response = await fetch(endpoint, {
        method,
        headers: requestHeaders,
        body: body ? JSON.stringify(body) : undefined,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'An error occurred');
      }

      return {
        success: true,
        data: data.data,
        status: response.status
      };

    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An unexpected error occurred';
      setError(errorMessage);
      
      return {
        success: false,
        error: errorMessage,
        status: err instanceof Error ? 500 : undefined
      };

    } finally {
      setLoading(false);
    }
  };

  return {
    callApi,
    loading,
    error
  };
}