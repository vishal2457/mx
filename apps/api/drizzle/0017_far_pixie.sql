ALTER TYPE "level" ADD VALUE 'Advanced';--> statement-breakpoint
ALTER TYPE "level" ADD VALUE 'Beginner';--> statement-breakpoint
ALTER TABLE "workoutTemplateDetail" DROP CONSTRAINT "workoutTemplateDetail_wokroutTemplateID_workoutTemplate_id_fk";
--> statement-breakpoint
ALTER TABLE "bodyPart" ALTER COLUMN "description" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "workoutTemplateDetail" ADD COLUMN "workoutTemplateID" integer NOT NULL;--> statement-breakpoint
ALTER TABLE "workoutTemplateDetail" ADD COLUMN "additionInstruction" text;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "workoutTemplateDetail" ADD CONSTRAINT "workoutTemplateDetail_workoutTemplateID_workoutTemplate_id_fk" FOREIGN KEY ("workoutTemplateID") REFERENCES "public"."workoutTemplate"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
ALTER TABLE "workoutTemplateDetail" DROP COLUMN IF EXISTS "wokroutTemplateID";