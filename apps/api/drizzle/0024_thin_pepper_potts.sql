CREATE TABLE IF NOT EXISTS "memberWorkoutLog" (
	"id" serial PRIMARY KEY NOT NULL,
	"memberID" integer NOT NULL,
	"workoutTemplateDetailID" integer NOT NULL,
	"sets" integer NOT NULL,
	"reps" text NOT NULL,
	"exerciseName" text NOT NULL,
	"completedTime" text NOT NULL,
	"intensity" "workoutIntensity" DEFAULT 'Moderate',
	"createdAt" timestamp DEFAULT now()
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "memberWorkoutLog" ADD CONSTRAINT "memberWorkoutLog_memberID_member_id_fk" FOREIGN KEY ("memberID") REFERENCES "public"."member"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "memberWorkoutLog" ADD CONSTRAINT "memberWorkoutLog_workoutTemplateDetailID_workoutTemplateDetail_id_fk" FOREIGN KEY ("workoutTemplateDetailID") REFERENCES "public"."workoutTemplateDetail"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
