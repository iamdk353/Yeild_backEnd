import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";
import "dotenv/config";
const sql = neon(process.env.DB_URL!);
export const db = drizzle({ client: sql });
