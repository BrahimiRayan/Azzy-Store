ALTER TABLE "account" ALTER COLUMN "id" SET DATA TYPE uuid USING id::uuid;--> statement-breakpoint
ALTER TABLE "account" ALTER COLUMN "id" SET DEFAULT uuid_generate_v4();--> statement-breakpoint
ALTER TABLE "session" ALTER COLUMN "id" SET DATA TYPE uuid USING id::uuid;;--> statement-breakpoint
ALTER TABLE "session" ALTER COLUMN "id" SET DEFAULT uuid_generate_v4();--> statement-breakpoint
ALTER TABLE "verification" ALTER COLUMN "id" SET DATA TYPE uuid USING id::uuid;;--> statement-breakpoint
ALTER TABLE "verification" ALTER COLUMN "id" SET DEFAULT uuid_generate_v4();