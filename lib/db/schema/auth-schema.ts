import { sql } from "drizzle-orm";
import { uuid } from "drizzle-orm/pg-core";
import { pgTable, text, timestamp, boolean } from "drizzle-orm/pg-core";

export const user = pgTable("user", {
	id: uuid().default(sql`uuid_generate_v4()`).primaryKey().notNull(),
	name: text().notNull(),
	email: text().notNull().unique(),
	emailVerified: boolean().$defaultFn(() => false).notNull(),
	image: text(),
	createdAt: timestamp().$defaultFn(() => /* @__PURE__ */ new Date()).notNull(),
	updatedAt: timestamp().$defaultFn(() => /* @__PURE__ */ new Date()).notNull()
});

export const session = pgTable("session", {
	id: text('id').primaryKey(),
	expiresAt: timestamp('expires_at').notNull(),
	token: text('token').notNull().unique(),
	createdAt: timestamp('created_at').notNull(),
	updatedAt: timestamp('updated_at').notNull(),
	ipAddress: text('ip_address'),
	userAgent: text('user_agent'),
	userId: uuid().notNull().references(()=> user.id, { onDelete: 'cascade' })
});

export const account = pgTable("account", {
	id: text().primaryKey(),
	accountId: text().notNull(),
	providerId: text().notNull(),
	userId: uuid().notNull().references(()=> user.id, { onDelete: 'cascade' }),
	accessToken: text(),
	refreshToken: text(),
	idToken: text(),
	accessTokenExpiresAt: timestamp(),
	refreshTokenExpiresAt: timestamp(),
	scope: text(),
	password: text(),
	createdAt: timestamp().notNull(),
	updatedAt: timestamp().notNull()
});

export const verification = pgTable("verification", {
	id: text().primaryKey(),
	identifier: text().notNull(),
	value: text().notNull(),
	expiresAt: timestamp().notNull(),
	createdAt: timestamp().$defaultFn(() => /* @__PURE__ */ new Date()),
	updatedAt: timestamp().$defaultFn(() => /* @__PURE__ */ new Date())
});
