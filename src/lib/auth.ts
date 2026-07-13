import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "better-auth/adapters/mongodb";

const mongoUri =
  process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/event-hive";

const client = new MongoClient(mongoUri);
const db = client.db("event-hive");

export const auth = betterAuth({
  database: mongodbAdapter(db, {
    // Optional: if you don't provide a client, database transactions won't be enabled.
    client,
  }),
  emailAndPassword: {
    enabled: true,
  },
});
