DO $$ BEGIN
 CREATE TYPE "public"."goal" AS ENUM('Weight gain', 'Weight Loss', 'Stay fit');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "public"."status" AS ENUM('Open', 'Closed');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "enquiry" (
	"id" serial PRIMARY KEY NOT NULL,
	"customerName" text NOT NULL,
	"mobile" varchar(10) NOT NULL,
	"email" text NOT NULL,
	"goal" "goal" DEFAULT 'Stay fit',
	"status" "status" DEFAULT 'Open',
	"userID" integer,
	"terms" text,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp
);
--> statement-breakpoint
ALTER TABLE "systemConfig" ADD COLUMN "theme" text DEFAULT 'default';--> statement-breakpoint
ALTER TABLE "systemConfig" ADD COLUMN "organisationID" integer NOT NULL;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "enquiry" ADD CONSTRAINT "enquiry_userID_user_id_fk" FOREIGN KEY ("userID") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "systemConfig" ADD CONSTRAINT "systemConfig_organisationID_organisation_id_fk" FOREIGN KEY ("organisationID") REFERENCES "public"."organisation"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
