ALTER TYPE "day" ADD VALUE 'day1';--> statement-breakpoint
ALTER TYPE "day" ADD VALUE 'day2';--> statement-breakpoint
ALTER TYPE "day" ADD VALUE 'day3';--> statement-breakpoint
ALTER TYPE "day" ADD VALUE 'day4';--> statement-breakpoint
ALTER TYPE "day" ADD VALUE 'day5';--> statement-breakpoint
ALTER TYPE "day" ADD VALUE 'day6';--> statement-breakpoint
ALTER TYPE "day" ADD VALUE 'day7';--> statement-breakpoint
ALTER TABLE "workoutTemplateDetail" ALTER COLUMN "day" SET DEFAULT 'day1';--> statement-breakpoint
ALTER TABLE "workoutTemplateDetail" ALTER COLUMN "day" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "bodyPart" ADD COLUMN "organisationID" integer NOT NULL;--> statement-breakpoint
ALTER TABLE "exercise" ADD COLUMN "organisationID" integer NOT NULL;--> statement-breakpoint
ALTER TABLE "workoutTemplateDetail" ADD COLUMN "dayName" text NOT NULL;--> statement-breakpoint
ALTER TABLE "workoutTemplate" ADD COLUMN "organisationID" integer NOT NULL;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "bodyPart" ADD CONSTRAINT "bodyPart_organisationID_organisation_id_fk" FOREIGN KEY ("organisationID") REFERENCES "public"."organisation"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "exercise" ADD CONSTRAINT "exercise_organisationID_organisation_id_fk" FOREIGN KEY ("organisationID") REFERENCES "public"."organisation"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "workoutTemplate" ADD CONSTRAINT "workoutTemplate_organisationID_organisation_id_fk" FOREIGN KEY ("organisationID") REFERENCES "public"."organisation"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
