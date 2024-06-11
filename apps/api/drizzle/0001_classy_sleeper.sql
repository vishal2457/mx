ALTER TYPE "period" ADD VALUE '1';--> statement-breakpoint
ALTER TYPE "period" ADD VALUE '15';--> statement-breakpoint
ALTER TYPE "period" ADD VALUE '30';--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "customerOffer" (
	"id" serial PRIMARY KEY NOT NULL,
	"customerID" integer NOT NULL,
	"offerID" integer NOT NULL,
	"orderID" text NOT NULL,
	"paymentID" text NOT NULL,
	"active" boolean DEFAULT true,
	"createdAt" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "permission" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "rolePermission" (
	"id" serial PRIMARY KEY NOT NULL,
	"menuID" integer NOT NULL,
	"permissionID" integer NOT NULL,
	"roleID" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "userRole" (
	"id" serial PRIMARY KEY NOT NULL,
	"roleID" integer NOT NULL,
	"userID" integer NOT NULL
);
--> statement-breakpoint
DROP INDEX IF EXISTS "rmailIdx";--> statement-breakpoint
ALTER TABLE "user" ALTER COLUMN "active" SET DEFAULT true;--> statement-breakpoint
ALTER TABLE "customer" ADD COLUMN "removeAds" boolean DEFAULT false;--> statement-breakpoint
ALTER TABLE "offer" ADD COLUMN "fakeAmount" integer NOT NULL;--> statement-breakpoint
ALTER TABLE "offer" ADD COLUMN "createdAt" timestamp DEFAULT now() NOT NULL;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "customerOffer" ADD CONSTRAINT "customerOffer_customerID_customer_id_fk" FOREIGN KEY ("customerID") REFERENCES "public"."customer"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "customerOffer" ADD CONSTRAINT "customerOffer_offerID_offer_id_fk" FOREIGN KEY ("offerID") REFERENCES "public"."offer"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "roleIdx" ON "rolePermission" ("roleID");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "permissionIdx" ON "rolePermission" ("permissionID");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "gameSlugIdx" ON "match" ("gameSlug");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "emailIdx" ON "user" ("email");--> statement-breakpoint
ALTER TABLE "customer" ADD CONSTRAINT "customer_deviceID_unique" UNIQUE("deviceID");
