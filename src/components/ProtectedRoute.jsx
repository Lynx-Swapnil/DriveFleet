"use client";

import { authClient } from "@/lib/auth-client";
import SignInRequired from "./SignInRequired";
import { useEffect, useState } from "react";

export function ProtectedRoute({ children, message = "Please sign in to continue." }) {
  const { data: session, isPending } = authClient.useSession();
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    // Wait for session to be checked
    if (!isPending) {
      setIsReady(true);
    }
  }, [isPending]);

  // Show loading state while checking session
  if (!isReady) {
    return (
      <main className="mx-auto max-w-5xl px-4 sm:px-6 py-10 transition-colors duration-300">
        <div className="flex items-center justify-center min-h-96">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-600"></div>
        </div>
      </main>
    );
  }

  // Show sign in required if not authenticated
  if (!session?.user) {
    return <SignInRequired message={message} />;
  }

  // Render children if authenticated
  return children;
}
