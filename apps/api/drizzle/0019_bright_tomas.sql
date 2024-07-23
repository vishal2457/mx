DO $$ BEGIN
 CREATE TYPE "public"."day" AS ENUM('1', '2', '3', '4', '5', '6', '7');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
ALTER TABLE "member" ALTER COLUMN "age" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "member" ALTER COLUMN "address" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "member" ALTER COLUMN "height" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "member" ALTER COLUMN "weight" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "workoutTemplateDetail" ADD COLUMN "timeInM" text;--> statement-breakpoint
ALTER TABLE "workoutTemplateDetail" ADD COLUMN "day" "day" DEFAULT '1';--> statement-breakpoint
ALTER TABLE "workoutTemplateDetail" DROP COLUMN IF EXISTS "timeInS";