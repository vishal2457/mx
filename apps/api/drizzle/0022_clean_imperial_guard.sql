DO $$ BEGIN
 CREATE TYPE "public"."workouteGoal" AS ENUM('Muscle Gain', 'Stay fit', 'Weight Loss');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
ALTER TYPE "goal" ADD VALUE 'Muscle gain';--> statement-breakpoint
ALTER TABLE "enquiry" ALTER COLUMN "email" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "member" ALTER COLUMN "mobile" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "member" ALTER COLUMN "emergencyContact" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "member" ALTER COLUMN "workoutTemplateID" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "enquiry" ADD COLUMN "organisationID" integer NOT NULL;--> statement-breakpoint
ALTER TABLE "enquiry" ADD COLUMN "periodInM" integer DEFAULT 6 NOT NULL;--> statement-breakpoint
ALTER TABLE "member" ADD COLUMN "quickAdd" boolean DEFAULT false;--> statement-breakpoint
ALTER TABLE "member" ADD COLUMN "active" boolean DEFAULT true;--> statement-breakpoint
ALTER TABLE "organisation" ADD COLUMN "logo" text DEFAULT '' NOT NULL;--> statement-breakpoint
ALTER TABLE "organisation" ADD COLUMN "panelName" text DEFAULT 'Admin' NOT NULL;--> statement-breakpoint
ALTER TABLE "organisation" ADD COLUMN "darkMode" boolean DEFAULT true;--> statement-breakpoint
ALTER TABLE "organisation" ADD COLUMN "theme" text DEFAULT 'default';--> statement-breakpoint
ALTER TABLE "workoutTemplateDetail" ADD COLUMN "approxCalorieBurn" integer NOT NULL;--> statement-breakpoint
ALTER TABLE "workoutTemplate" ADD COLUMN "workoutGoal" "workouteGoal" DEFAULT 'Stay fit';--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "enquiry" ADD CONSTRAINT "enquiry_organisationID_organisation_id_fk" FOREIGN KEY ("organisationID") REFERENCES "public"."organisation"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
ALTER TABLE "workoutTemplate" DROP COLUMN IF EXISTS "approxCalorieBurn";