import { pgTable, text, timestamp, boolean, uuid } from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";

/* ===================== USER ===================== */
export const user = pgTable("user", {
  id: text("id").primaryKey().notNull(), // ✅ text
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  emailVerified: boolean("emailVerified").default(false).notNull(),
  image: text("image"),
  shopId: uuid("shop_id"), // ✅ OK (your domain)
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().notNull(),
});

/* ===================== SESSION ===================== */
export const session = pgTable("session", {
  id: text("id").primaryKey().notNull(), // already correct
  expiresAt: timestamp("expires_at").notNull(),
  token: text("token").notNull().unique(),
  createdAt: timestamp("created_at").notNull(),
  updatedAt: timestamp("updated_at").notNull(),
  ipAddress: text("ip_address"),
  userAgent: text("user_agent"),
  userId: text("userId") // ✅ must match user.id
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
});

/* ===================== ACCOUNT ===================== */
export const account = pgTable("account", {
  id: text("id").primaryKey().notNull(), // ✅ text
  accountId: text("accountId").notNull(),
  providerId: text("providerId").notNull(),
  userId: text("userId")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  accessToken: text("accessToken"),
  refreshToken: text("refreshToken"),
  idToken: text("idToken"),
  accessTokenExpiresAt: timestamp("accessTokenExpiresAt"),
  refreshTokenExpiresAt: timestamp("refreshTokenExpiresAt"),
  scope: text("scope"),
  password: text("password"),
  createdAt: timestamp("createdAt").notNull(),
  updatedAt: timestamp("updatedAt").notNull(),
});

/* ===================== VERIFICATION ===================== */
export const verification = pgTable("verification", {
  id: text("id").primaryKey().notNull(), 
  identifier: text("identifier").notNull(),
  value: text("value").notNull(),
  expiresAt: timestamp("expiresAt").notNull(),
  createdAt: timestamp("createdAt").defaultNow(),
  updatedAt: timestamp("updatedAt").defaultNow(),
});