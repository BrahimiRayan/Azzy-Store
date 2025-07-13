ALTER TABLE "shops" DROP CONSTRAINT "shops_idConf_shop_conf_id_fk";
--> statement-breakpoint
ALTER TABLE "products" ADD COLUMN "description" text DEFAULT '';--> statement-breakpoint
ALTER TABLE "shop_conf" ADD COLUMN "idShop" uuid NOT NULL;--> statement-breakpoint
ALTER TABLE "shop_conf" ADD CONSTRAINT "shop_conf_idShop_shops_id_fk" FOREIGN KEY ("idShop") REFERENCES "public"."shops"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "shops" DROP COLUMN "idConf";