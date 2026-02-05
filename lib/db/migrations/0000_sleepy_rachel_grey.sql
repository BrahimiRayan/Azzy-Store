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
	"idOwner" text NOT NULL,
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
	"idOwner" text
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
CREATE TABLE "products" (
	"id" uuid PRIMARY KEY DEFAULT uuid_generate_v4() NOT NULL,
	"name" varchar(255) NOT NULL,
	"description" text DEFAULT '',
	"image" varchar(255) DEFAULT '/no-image.png' NOT NULL,
	"imageId" varchar(255) DEFAULT '',
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
	"ycor" real DEFAULT 0 NOT NULL,
	"idShop" uuid NOT NULL
);
--> statement-breakpoint
CREATE TABLE "shops" (
	"id" uuid PRIMARY KEY DEFAULT uuid_generate_v4() NOT NULL,
	"isOnline" boolean DEFAULT false NOT NULL,
	"subcreptionType" "SubType" DEFAULT 'Free' NOT NULL,
	"idOwner" text NOT NULL
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
CREATE TABLE "account" (
	"id" text PRIMARY KEY NOT NULL,
	"accountId" text NOT NULL,
	"providerId" text NOT NULL,
	"userId" text NOT NULL,
	"accessToken" text,
	"refreshToken" text,
	"idToken" text,
	"accessTokenExpiresAt" timestamp,
	"refreshTokenExpiresAt" timestamp,
	"scope" text,
	"password" text,
	"createdAt" timestamp NOT NULL,
	"updatedAt" timestamp NOT NULL
);
--> statement-breakpoint
CREATE TABLE "session" (
	"id" text PRIMARY KEY NOT NULL,
	"expires_at" timestamp NOT NULL,
	"token" text NOT NULL,
	"created_at" timestamp NOT NULL,
	"updated_at" timestamp NOT NULL,
	"ip_address" text,
	"user_agent" text,
	"userId" text NOT NULL,
	CONSTRAINT "session_token_unique" UNIQUE("token")
);
--> statement-breakpoint
CREATE TABLE "user" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"email" text NOT NULL,
	"emailVerified" boolean DEFAULT false NOT NULL,
	"image" text,
	"shop_id" uuid,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "user_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE "verification" (
	"id" text PRIMARY KEY NOT NULL,
	"identifier" text NOT NULL,
	"value" text NOT NULL,
	"expiresAt" timestamp NOT NULL,
	"createdAt" timestamp DEFAULT now(),
	"updatedAt" timestamp DEFAULT now()
);
--> statement-breakpoint
ALTER TABLE "employees" ADD CONSTRAINT "employees_idShop_shops_id_fk" FOREIGN KEY ("idShop") REFERENCES "public"."shops"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "employees" ADD CONSTRAINT "employees_idOwner_user_id_fk" FOREIGN KEY ("idOwner") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "notes" ADD CONSTRAINT "notes_idShop_shops_id_fk" FOREIGN KEY ("idShop") REFERENCES "public"."shops"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "notes" ADD CONSTRAINT "notes_idEmployee_employees_id_fk" FOREIGN KEY ("idEmployee") REFERENCES "public"."employees"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "notes" ADD CONSTRAINT "notes_idOwner_user_id_fk" FOREIGN KEY ("idOwner") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "order_products" ADD CONSTRAINT "order_products_idOrder_orders_id_fk" FOREIGN KEY ("idOrder") REFERENCES "public"."orders"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "order_products" ADD CONSTRAINT "order_products_idProduct_products_id_fk" FOREIGN KEY ("idProduct") REFERENCES "public"."products"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "orders" ADD CONSTRAINT "orders_idShop_shops_id_fk" FOREIGN KEY ("idShop") REFERENCES "public"."shops"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "products" ADD CONSTRAINT "products_idShop_shops_id_fk" FOREIGN KEY ("idShop") REFERENCES "public"."shops"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "shop_conf" ADD CONSTRAINT "shop_conf_idShop_shops_id_fk" FOREIGN KEY ("idShop") REFERENCES "public"."shops"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "shops" ADD CONSTRAINT "shops_idOwner_user_id_fk" FOREIGN KEY ("idOwner") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "transactions" ADD CONSTRAINT "transactions_idProduct_products_id_fk" FOREIGN KEY ("idProduct") REFERENCES "public"."products"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "transactions" ADD CONSTRAINT "transactions_idShop_shops_id_fk" FOREIGN KEY ("idShop") REFERENCES "public"."shops"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "account" ADD CONSTRAINT "account_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "session" ADD CONSTRAINT "session_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;