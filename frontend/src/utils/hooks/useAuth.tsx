import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

interface UseAuthOptions {
  required?: boolean;
  redirectTo?: string;
  onError?: (error: any) => void;
  onSuccess?: () => void;
}

export function useAuth(options: UseAuthOptions = {}) {
  const {
    required = true,
    redirectTo = "/auth/login",
    onError,
    onSuccess,
  } = options;

  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (required && status === "unauthenticated") {
      router.push(redirectTo);
      onError?.("Not authenticated");
    }

    if (status === "authenticated") {
      if (!session.user.isVerified) {
        router.push("/");
        onError?.("Not verified");
      }
      // Check if the session has any errors (like token refresh errors)
      if (session.error) {
        router.push(redirectTo);
        onError?.(session.error);
        return;
      }
      onSuccess?.();
    }
  }, [status, session, required, redirectTo, router, onError, onSuccess]);

  return {
    session,
    status,
    sessionLoading: status === "loading" || status === "unauthenticated",
    isAuthenticated: status === "authenticated",
    isError: !!session?.error,
  };
}
