CREATE TYPE "public"."CardType" AS ENUM('A', 'B', 'C', 'D');--> statement-breakpoint
CREATE TYPE "public"."NoteType" AS ENUM('Important', 'Reminder');--> statement-breakpoint
CREATE TYPE "public"."Category" AS ENUM('Alimentaire', 'Electronique', 'Vêtement', 'Meuble', 'Accessoire', 'Beauté', 'Sport', 'Livre', 'Autre');--> statement-breakpoint
CREATE TYPE "public"."SubType" AS ENUM('Free', 'Premium');--> statement-breakpoint
CREATE TYPE "public"."TransactionType" AS ENUM('A', 'V');--> statement-breakpoint
CREATE TABLE "employees" (
	"id" uuid PRIMARY KEY DEFAULT uuid_generate_v4() NOT NULL,
	"name" varchar(255) NOT NULL,
	"email" varchar(255) NOT NULL,
	"password" varchar(255),
	"idShop" uuid NOT NULL,
	"idOwner" uuid NOT NULL,
	CONSTRAINT "employees_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE "notes" (
	"id" uuid PRIMARY KEY DEFAULT uuid_generate_v4() NOT NULL,
	"date" date DEFAULT now() NOT NULL,
	"title" varchar(255) NOT NULL,
	"content" text NOT NULL,
	"type" "NoteType" DEFAULT 'Important' NOT NULL,
	"idShop" uuid NOT NULL,
	"idEmployee" uuid,
	"idOwner" uuid
);
--> statement-breakpoint
CREATE TABLE "order_products" (
	"idOrder" uuid NOT NULL,
	"idProduct" uuid NOT NULL,
	"qte" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE "orders" (
	"id" uuid PRIMARY KEY DEFAULT uuid_generate_v4() NOT NULL,
	"date" date DEFAULT now() NOT NULL,
	"forniseur" varchar(255) DEFAULT 'Unknown',
	"remarque" text DEFAULT '',
	"idShop" uuid NOT NULL
);
--> statement-breakpoint
CREATE TABLE "owners" (
	"id" uuid PRIMARY KEY DEFAULT uuid_generate_v4() NOT NULL,
	"name" varchar(255) NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"email" varchar(255) NOT NULL,
	"password" varchar(255),
	"phoneNumber" varchar(20) NOT NULL,
	CONSTRAINT "owners_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE "products" (
	"id" uuid PRIMARY KEY DEFAULT uuid_generate_v4() NOT NULL,
	"name" varchar(255) NOT NULL,
	"image" varchar(255) DEFAULT '/no-image.png' NOT NULL,
	"type" "Category" DEFAULT 'Autre' NOT NULL,
	"pua" real NOT NULL,
	"puv" real NOT NULL,
	"qte" integer NOT NULL,
	"idShop" uuid NOT NULL
);
--> statement-breakpoint
CREATE TABLE "shop_conf" (
	"id" uuid PRIMARY KEY DEFAULT uuid_generate_v4() NOT NULL,
	"name" varchar(255) NOT NULL,
	"description" text NOT NULL,
	"products" uuid[] DEFAULT '{}' NOT NULL,
	"Livrison" boolean DEFAULT false NOT NULL,
	"cardtype" "CardType" DEFAULT 'A' NOT NULL,
	"textcolor" varchar(10) DEFAULT '#000000' NOT NULL,
	"bgColor" varchar(10) DEFAULT '#ffffff' NOT NULL,
	"fb_url" varchar(255) DEFAULT '',
	"ig_url" varchar(255) DEFAULT '',
	"phoneNumber" varchar(20) NOT NULL,
	"email" varchar(255) NOT NULL,
	"address" varchar(255),
	"isMap" boolean DEFAULT false NOT NULL,
	"xcor" real DEFAULT 0 NOT NULL,
	"ycor" real DEFAULT 0 NOT NULL
);
--> statement-breakpoint
CREATE TABLE "shops" (
	"id" uuid PRIMARY KEY DEFAULT uuid_generate_v4() NOT NULL,
	"isOnline" boolean DEFAULT false NOT NULL,
	"subcreptionType" "SubType" DEFAULT 'Free' NOT NULL,
	"idOwner" uuid NOT NULL,
	"idConf" uuid NOT NULL
);
--> statement-breakpoint
CREATE TABLE "transactions" (
	"id" uuid PRIMARY KEY DEFAULT uuid_generate_v4() NOT NULL,
	"date" date DEFAULT now() NOT NULL,
	"qte" real NOT NULL,
	"type" "TransactionType" NOT NULL,
	"pua_t" real NOT NULL,
	"puv_t" real NOT NULL,
	"idProduct" uuid NOT NULL,
	"idShop" uuid NOT NULL
);
--> statement-breakpoint
ALTER TABLE "employees" ADD CONSTRAINT "employees_idShop_shops_id_fk" FOREIGN KEY ("idShop") REFERENCES "public"."shops"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "employees" ADD CONSTRAINT "employees_idOwner_owners_id_fk" FOREIGN KEY ("idOwner") REFERENCES "public"."owners"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "notes" ADD CONSTRAINT "notes_idShop_shops_id_fk" FOREIGN KEY ("idShop") REFERENCES "public"."shops"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "notes" ADD CONSTRAINT "notes_idEmployee_employees_id_fk" FOREIGN KEY ("idEmployee") REFERENCES "public"."employees"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "notes" ADD CONSTRAINT "notes_idOwner_owners_id_fk" FOREIGN KEY ("idOwner") REFERENCES "public"."owners"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "order_products" ADD CONSTRAINT "order_products_idOrder_orders_id_fk" FOREIGN KEY ("idOrder") REFERENCES "public"."orders"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "order_products" ADD CONSTRAINT "order_products_idProduct_products_id_fk" FOREIGN KEY ("idProduct") REFERENCES "public"."products"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "orders" ADD CONSTRAINT "orders_idShop_shops_id_fk" FOREIGN KEY ("idShop") REFERENCES "public"."shops"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "products" ADD CONSTRAINT "products_idShop_shops_id_fk" FOREIGN KEY ("idShop") REFERENCES "public"."shops"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "shops" ADD CONSTRAINT "shops_idOwner_owners_id_fk" FOREIGN KEY ("idOwner") REFERENCES "public"."owners"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "shops" ADD CONSTRAINT "shops_idConf_shop_conf_id_fk" FOREIGN KEY ("idConf") REFERENCES "public"."shop_conf"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "transactions" ADD CONSTRAINT "transactions_idProduct_products_id_fk" FOREIGN KEY ("idProduct") REFERENCES "public"."products"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "transactions" ADD CONSTRAINT "transactions_idShop_shops_id_fk" FOREIGN KEY ("idShop") REFERENCES "public"."shops"("id") ON DELETE cascade ON UPDATE no action;