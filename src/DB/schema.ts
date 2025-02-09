import {
  boolean,
  date,
  doublePrecision,
  integer,
  pgEnum,
  pgTable,
  text,
} from "drizzle-orm/pg-core";

export const userEnum = pgEnum("userType", ["farmer", "buyer"]);
export const usersTable = pgTable("users", {
  id: integer().generatedAlwaysAsIdentity(),
  name: text().notNull(),
  email: text().notNull().unique().primaryKey(),
  number: text().notNull(),
  location: text().notNull(),
  userType: userEnum().notNull(),
  onboarded: boolean().default(false),
});

export const productsTable = pgTable("products", {
  productId: integer().generatedAlwaysAsIdentity().primaryKey(),
  farmerId: text("farmerId").references(() => usersTable.email),
  buyerId: text("buyerId").references(() => usersTable.email),
  quantity: doublePrecision(),
  productName: text(),
  price: doublePrecision(),
  deliveryDate: date({ mode: "string" }),
  farmerTerms: text(),
  buyerTerms: text(),
  farmerAccepted: boolean().default(false),
  BuyerAccepted: boolean().default(false),
});
