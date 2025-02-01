import { integer, pgEnum, pgTable, text } from "drizzle-orm/pg-core";

export const userEnum = pgEnum("userType", ["farmer", "buyer"]);
export const usersTable = pgTable("users", {
  id: integer().generatedAlwaysAsIdentity(),
  name: text().notNull(),

  email: text().notNull().unique().primaryKey(),
  number: text().notNull(),
  location: text().notNull(),
  userType: userEnum().notNull(),
});
