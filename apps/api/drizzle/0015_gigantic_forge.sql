DO $$ BEGIN
 CREATE TYPE "public"."level" AS ENUM('Advance', 'Intermediate', 'Begineer');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "public"."target" AS ENUM('Over Weight', 'Normal', 'Under Weight', 'Obese');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "public"."workoutIntensity" AS ENUM('Fast', 'Moderate', 'Slow');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "memberWeightHistory" (
	"id" serial PRIMARY KEY NOT NULL,
	"memberID" integer NOT NULL,
	"weight" integer NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "bodyPart" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"description" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "exerciseBody" (
	"id" serial PRIMARY KEY NOT NULL,
	"exerciseID" integer NOT NULL,
	"bodyPartID" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "exercise" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"description" text NOT NULL,
	"level" "level" NOT NULL,
	"referenceURL" text
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "workoutTemplateDetail" (
	"id" serial PRIMARY KEY NOT NULL,
	"wokroutTemplateID" integer NOT NULL,
	"exerciseID" integer NOT NULL,
	"set" integer NOT NULL,
	"reps" text,
	"timeInS" text,
	"restBwRepsInS" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "workoutTemplate" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"description" text NOT NULL,
	"target" "target" DEFAULT 'Normal',
	"intensity" "workoutIntensity" DEFAULT 'Moderate',
	"approxCalorieBurn" integer NOT NULL,
	"approxTimeToCompleteInM" integer DEFAULT 45
);
--> statement-breakpoint
DROP TABLE "memberMetricHistory";--> statement-breakpoint
ALTER TABLE "memberPlan" ALTER COLUMN "paid" SET DEFAULT true;--> statement-breakpoint
ALTER TABLE "member" ADD COLUMN "passcode" varchar(255) NOT NULL;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "memberWeightHistory" ADD CONSTRAINT "memberWeightHistory_memberID_member_id_fk" FOREIGN KEY ("memberID") REFERENCES "public"."member"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "exerciseBody" ADD CONSTRAINT "exerciseBody_exerciseID_exercise_id_fk" FOREIGN KEY ("exerciseID") REFERENCES "public"."exercise"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "exerciseBody" ADD CONSTRAINT "exerciseBody_bodyPartID_bodyPart_id_fk" FOREIGN KEY ("bodyPartID") REFERENCES "public"."bodyPart"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "workoutTemplateDetail" ADD CONSTRAINT "workoutTemplateDetail_wokroutTemplateID_workoutTemplate_id_fk" FOREIGN KEY ("wokroutTemplateID") REFERENCES "public"."workoutTemplate"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "workoutTemplateDetail" ADD CONSTRAINT "workoutTemplateDetail_exerciseID_exercise_id_fk" FOREIGN KEY ("exerciseID") REFERENCES "public"."exercise"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
