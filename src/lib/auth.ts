import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { jwt } from "better-auth/plugins";

const mongoUri =
  process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/event-hive";

const client = new MongoClient(mongoUri);
const db = client.db("event-hive");

// Prefer the public client URL when available (set on Vercel as NEXT_PUBLIC_APP_URL),
// otherwise fall back to BETTER_AUTH_URL or localhost.
const baseURL =
  process.env.NEXT_PUBLIC_APP_URL ||
  process.env.BETTER_AUTH_URL ||
  "http://localhost:3000";

export const auth = betterAuth({
  baseURL: baseURL,
  basePath: "/api/auth",
  database: mongodbAdapter(db, {
    // Optional: if you don't provide a client, database transactions won't be enabled.
    client,
  }),
  emailAndPassword: {
    enabled: true,
  },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    },
  },
  // Allow runtime-provided Vercel URL and NEXT_PUBLIC_APP_URL in trusted origins.
  trustedOrigins: [
    baseURL,
    "http://localhost:3000",
    "http://localhost:3001",
    process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
    process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : undefined,
  ].filter(Boolean) as string[],
  session: {
    expiresIn: 60 * 60 * 24 * 7, // 7 days
    maxAge: 60 * 24 * 30, // update session age every 24 hours
    cookieCache: {
      enabled: true,
    },
  },
  plugins: [jwt()],
});
