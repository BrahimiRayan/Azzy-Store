// write schemas then run `npx drizzle-kit generate` to generate migrations
// and then run `npx drizzle-kit migrate` to apply migrations
// to the database
import { sql } from "drizzle-orm";
import { pgTable, uuid, varchar, pgEnum, boolean, date, json, real, integer, text } from "drizzle-orm/pg-core";
import { user } from "./auth-schema";
export * from "./auth-schema"




export const SubTypeEnum = pgEnum("SubType", ["Free", "Premium"]);
export const NoteTypeEnum = pgEnum("NoteType", ["Important", "Reminder"]);
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
export const TransactionTypeEnum = pgEnum("TransactionType", ["A", "V"]);
export const CardTypeEnum = pgEnum("CardType", ["A", "B", "C", "D"]);

// Define the schema for the database tables

// export const ownersTable = pgTable("owners", {
//   id: uuid().default(sql`uuid_generate_v4()`).primaryKey().notNull(),
//   name: varchar({ length: 255 }).notNull(),
//   createdAt: timestamp().defaultNow().notNull(),
//   email: varchar({ length: 255 }).notNull().unique(),
//   password: varchar({ length: 255 }), //TODO: When it comes to production, use a hashed password and not nullable
//   phoneNumber: varchar({ length: 20 }).notNull(),
// });

export const shopsTable = pgTable("shops", {
  id: uuid().default(sql`uuid_generate_v4()`).primaryKey().notNull(),
  isOnline : boolean().default(false).notNull(),
  subcreptionType : SubTypeEnum().default("Free").notNull(),
  idOwner: uuid().notNull().references(() => user.id, { onDelete: "cascade" }),
  // shop configuration
  idConf: uuid().references(() => shopConfTable.id, { onDelete: "cascade" }),
});


export const employeesTable = pgTable("employees", {
  id: uuid().default(sql`uuid_generate_v4()`).primaryKey().notNull(),
  name: varchar({ length: 255 }).notNull(),
  email: varchar({ length: 255 }).notNull().unique(),
  password: varchar({ length: 255 }), //TODO: When it comes to production, use a hashed password and not nullable
  idShop: uuid().notNull().references(() => shopsTable.id, { onDelete: "cascade" }),
  idOwner: uuid().notNull().references(() => user.id, { onDelete: "cascade" }),
});

export const notesTable = pgTable("notes", {
  id: uuid().default(sql`uuid_generate_v4()`).primaryKey().notNull(),
  date: date().defaultNow().notNull(),
  title: varchar({ length: 255 }).notNull(),
  content: text().notNull(),
  type: NoteTypeEnum().default("Important").notNull(),
  idShop: uuid().notNull().references(() => shopsTable.id, { onDelete: "cascade" }),
  idEmployee: uuid().references(() => employeesTable.id, { onDelete: "cascade" }),
  idOwner: uuid().references(() => user.id, { onDelete: "cascade" }),
});

export const productsTable = pgTable("products", {
  id: uuid().default(sql`uuid_generate_v4()`).primaryKey().notNull(),
  name: varchar({ length: 255 }).notNull(),
  image: varchar({ length: 255 }).notNull().default("/no-image.png"),
  type: ProductsTypeEnum().default("Autre").notNull(),
  pua : real().notNull(),
  puv: real().notNull(),
  qte: integer().notNull(),
  idShop: uuid().notNull().references(() => shopsTable.id, { onDelete: "cascade" }),
});

export const ordersTable = pgTable("orders", {
  id: uuid().default(sql`uuid_generate_v4()`).primaryKey().notNull(),
  date: date().defaultNow().notNull(),
  forniseur: varchar({ length: 255 }).default("Unknown"),
  remarque : text().default(""),
  idShop: uuid().notNull().references(() => shopsTable.id, { onDelete: "cascade" }),
});

export const orderProductsTable = pgTable("order_products", {
  idOrder: uuid().notNull().references(() => ordersTable.id, { onDelete: "cascade" }),
  idProduct: uuid().notNull().references(() => productsTable.id, { onDelete: "cascade" }),
  qte: integer().notNull(),
}, (table) => ({
  pk: sql`PRIMARY KEY (${table.idOrder}, ${table.idProduct})` 
}));

export const transactionsTable = pgTable("transactions", {
  id: uuid().default(sql`uuid_generate_v4()`).primaryKey().notNull(),
  date: date().defaultNow().notNull(),
  qte: real().notNull(),
  type: TransactionTypeEnum().notNull(),
  pua_t : real().notNull(),
  puv_t: real().notNull(),
  idProduct: uuid().notNull().references(() => productsTable.id, { onDelete: "cascade" }),
  idShop: uuid().notNull().references(() => shopsTable.id, { onDelete: "cascade" }),
});

export const shopConfTable = pgTable("shop_conf", {
  id: uuid().default(sql`uuid_generate_v4()`).primaryKey().notNull(),
  name: varchar({ length: 255 }).notNull(),
  description: text().notNull(),
  products: uuid().array().notNull().default([]),
  Livrison: boolean().default(false).notNull(),
  cardtype: CardTypeEnum().default("A").notNull(),
  textcolor: varchar({ length: 10 }).default("#000000").notNull(),
  bgColor: varchar({ length: 10 }).default("#ffffff").notNull(),
  fb_url: varchar({ length: 255 }).default(""),
  ig_url: varchar({ length: 255 }).default(""),
  phoneNumber: varchar({ length: 20 }).notNull(),
  email: varchar({ length: 255 }).notNull(),
  address: varchar({ length: 255 }),
  isMap: boolean().default(false).notNull(),
  xcor: real().default(0).notNull(),
  ycor: real().default(0).notNull(),
});