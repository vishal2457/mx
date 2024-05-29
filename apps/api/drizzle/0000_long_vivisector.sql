DO $$ BEGIN
 CREATE TYPE "public"."gameSlug" AS ENUM('cricket', 'football');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "public"."status" AS ENUM('completed', 'in-progress', 'waiting', 'done');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "public"."period" AS ENUM('month', 'year');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "customerFcm" (
	"id" serial PRIMARY KEY NOT NULL,
	"customerID" integer NOT NULL,
	"token" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "customer" (
	"id" serial PRIMARY KEY NOT NULL,
	"deviceID" text NOT NULL,
	"device" text DEFAULT 'ios'
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "match" (
	"id" serial PRIMARY KEY NOT NULL,
	"gameSlug" text DEFAULT 'cricket',
	"teamOne" text NOT NULL,
	"teamOneLogo" text NOT NULL,
	"teamTwo" text NOT NULL,
	"teamTwoLogo" text NOT NULL,
	"teamTwoSlug" text NOT NULL,
	"teamOneSlug" text NOT NULL,
	"teamOnePlayers" text NOT NULL,
	"teamTwoPlayers" text NOT NULL,
	"venue" text NOT NULL,
	"league" text NOT NULL,
	"h2hTeam" text NOT NULL,
	"h2hTeamImage" text NOT NULL,
	"premiumTeamImage" text NOT NULL,
	"startDate" text NOT NULL,
	"startTime" text NOT NULL,
	"description" text NOT NULL,
	"format" text NOT NULL,
	"status" "status" DEFAULT 'waiting'
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "menu" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"icon" text NOT NULL,
	"link" text NOT NULL,
	"active" boolean DEFAULT true,
	"parent" integer
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "notifications" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" text NOT NULL,
	"body" text NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "offer" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"amount" integer NOT NULL,
	"period" "period" DEFAULT 'month'
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "role" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "user" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text,
	"email" text NOT NULL,
	"password" text NOT NULL,
	"active" boolean DEFAULT false,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "customerFcm" ADD CONSTRAINT "customerFcm_customerID_customer_id_fk" FOREIGN KEY ("customerID") REFERENCES "public"."customer"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "rmailIdx" ON "user" ("email");