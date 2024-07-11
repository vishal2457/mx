DO $$ BEGIN
 CREATE TYPE "public"."gender" AS ENUM('male', 'female');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "member" (
	"id" serial PRIMARY KEY NOT NULL,
	"organisationID" integer NOT NULL,
	"planID" integer NOT NULL,
	"name" text NOT NULL,
	"dob" text NOT NULL,
	"address" text NOT NULL,
	"mobile" text NOT NULL,
	"email" text NOT NULL,
	"height" text NOT NULL,
	"weight" text NOT NULL,
	"emergencyContact" text NOT NULL,
	"gender" "gender" DEFAULT 'female',
	"userID" integer NOT NULL,
	"joinDate" timestamp NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "plan" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"amount" integer NOT NULL,
	"periodInMonths" integer NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp
);
--> statement-breakpoint
ALTER TABLE "organisation" ADD COLUMN "id" serial NOT NULL;--> statement-breakpoint
ALTER TABLE "organisation" ADD COLUMN "name" text NOT NULL;--> statement-breakpoint
ALTER TABLE "organisation" ADD COLUMN "email" text NOT NULL;--> statement-breakpoint
ALTER TABLE "organisation" ADD COLUMN "emailVerified" boolean DEFAULT true;--> statement-breakpoint
ALTER TABLE "organisation" ADD COLUMN "active" boolean DEFAULT true;--> statement-breakpoint
ALTER TABLE "organisation" ADD COLUMN "mobile" text;--> statement-breakpoint
ALTER TABLE "organisation" ADD COLUMN "createdAt" timestamp DEFAULT now() NOT NULL;--> statement-breakpoint
ALTER TABLE "organisation" ADD COLUMN "updatedAt" timestamp;--> statement-breakpoint
ALTER TABLE "role" ADD COLUMN "organisationID" integer NOT NULL;--> statement-breakpoint
ALTER TABLE "user" ADD COLUMN "organisationID" integer NOT NULL;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "member" ADD CONSTRAINT "member_organisationID_organisation_id_fk" FOREIGN KEY ("organisationID") REFERENCES "public"."organisation"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "member" ADD CONSTRAINT "member_planID_plan_id_fk" FOREIGN KEY ("planID") REFERENCES "public"."plan"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "role" ADD CONSTRAINT "role_organisationID_organisation_id_fk" FOREIGN KEY ("organisationID") REFERENCES "public"."organisation"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "user" ADD CONSTRAINT "user_organisationID_organisation_id_fk" FOREIGN KEY ("organisationID") REFERENCES "public"."organisation"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "orgEmailIdx" ON "organisation" USING btree ("email");