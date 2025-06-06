// write schemas then run `npx drizzle-kit generate` to generate migrations
// and then run `npx drizzle-kit migrate` to apply migrations
// to the database
import { sql } from "drizzle-orm";
import { pgTable, uuid, varchar, timestamp, pgEnum, boolean, date, json, real, integer } from "drizzle-orm/pg-core";
import type { shopConfT } from "~/types/GeneraleT";

export const UserTypeEnum = pgEnum("UserType", ["Admin", "Employee"]);
export const NoteTypeEnum = pgEnum("NoteType", ["Personal", "Work"]);
export const ProductsTypeEnum = pgEnum("Category", [
  "Alimentaire",
  "Electronique",
  "Vêtement",
  "Meuble",
  "Accessoire",
  "Beauté",
  "Sport",
  "Livre",
  "Autre"
]);



export const usersTable = pgTable("users", {
  id: uuid().default(sql`uuid_generate_v4()`).primaryKey().notNull(),
  name: varchar({ length: 255 }).notNull(),
  createdAt: timestamp().defaultNow().notNull(),
  email: varchar({ length: 255 }).notNull().unique(),
  phoneNumber: varchar({ length: 20 }).notNull(),
  type: UserTypeEnum("Employee").notNull().default("Employee"),

  worksfor: uuid().notNull().references(() => shopTable.id, { onDelete: "cascade" }),
});


export const shopTable = pgTable("shop", {
  id: uuid().default(sql`uuid_generate_v4()`).primaryKey().notNull(),
  isPaid: boolean().notNull().default(false),
})

export const userNotesTable = pgTable("user_notes", {
  id: uuid().default(sql`uuid_generate_v4()`).primaryKey().notNull(),
  date: date().defaultNow().notNull(),
  title: varchar({ length: 255 }).notNull(),
  body: varchar({ length: 1000 }).notNull(),
  type: NoteTypeEnum("Personal").notNull().default("Personal"),

  userId: uuid().notNull().references(() => usersTable.id, { onDelete: "cascade" }),
});


const defaultShopConfig: shopConfT = {
  name: 'generic shop',
  description: '',
  Products: [],
  livraison: false,
  cardType: "B",
  bg: '',
  textColor: '',
  fb_url: '',
  ig_url: '',
  phone: '',
  email: '',
  address: '',
  xcor: 0,
  ycor: 0,
}

export const Online_shop = pgTable("online_shop", {
  id: uuid().default(sql`uuid_generate_v4()`).primaryKey().notNull(),
  shop_config: json().default(defaultShopConfig).notNull(),// JSON stringified object for shop configuration
  products: uuid().array().default([]), // JSON stringified array of products

});


export const ProductsTable = pgTable("Products", {
  id: uuid().default(sql`uuid_generate_v4()`).primaryKey().notNull(),
  img: varchar({ length: 255 }),
  categorie : ProductsTypeEnum("Alimentaire").notNull().default("Autre"),
  pua: real().default(0).notNull(), // prix unitaire d'achat
  puv: real().default(0).notNull(), // prix unitaire de vente
  qte_totale: integer().default(0).notNull(), // quantité totale en stock

  store : uuid().notNull().references(() => Online_shop.id, { onDelete: "cascade" }), // reference to the online shop
});



