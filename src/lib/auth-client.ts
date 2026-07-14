import { createAuthClient } from "better-auth/react";

// Get the base URL - use environment variable or current origin
const getBaseURL = () => {
  // First, try to use environment variable
  if (process.env.NEXT_PUBLIC_APP_URL) {
    return process.env.NEXT_PUBLIC_APP_URL;
  }

  // Client-side: use the current origin
  if (typeof window !== "undefined") {
    return window.location.origin;
  }

  // Server-side or build time fallback
  return "http://localhost:3000";
};

export const authClient = createAuthClient({
  baseURL: getBaseURL(),
  basePath: "/api/auth",
  credentials: "include", // Important: include credentials for cookie-based auth
});
