// hooks/useData.ts
import { useState, useRef } from "react";
import { useApi } from "./useApi";

export function useData<T>(
  endpoint: string,
  options: {
    method?: "GET" | "POST" | "PUT" | "DELETE";
    headers?: Record<string, string>;
    body?: any;
    requiresAuth?: boolean;
    dependencies?: any[];
  },
  session?: any
) {
  const { callApi } = useApi(session);
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Store the previous session value
  const prevSessionRef = useRef(session);
  
  // Store the fetch function in a ref to avoid recreation on each render
  const fetchRef = useRef<(() => Promise<void>) | null>(null);
  
  // Create fetch function if it doesn't exist or if session has changed
  if (!fetchRef.current || prevSessionRef.current !== session) {
    prevSessionRef.current = session;
    
    fetchRef.current = async () => {
      // Skip fetch if auth is required but session is not available
      if (options.requiresAuth && !session) {
        setLoading(true);
        return;
      }
      
      try {
        setLoading(true);

        const response = await callApi(endpoint, {
          method: options.method || "GET",
          headers: options.headers,
          body: options.body,
          requiresAuth: options.requiresAuth,
        });
        if (response.success) {
          setData(response.data);
          setError(null);
        } else {
          setError(response.message || "Failed to fetch data");
          setData(null);
        }
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "An unexpected error occurred"
        );
        setData(null);
      } finally {
        setLoading(false);
      }
    };
    
    // Execute the fetch function immediately when it's created
    // This happens on initial render or when session changes
    fetchRef.current();
  }

  // Return the result and a refetch function
  return { 
    data, 
    loading, 
    error,
    refetch: fetchRef.current  // Allow manual refetching
  };
}