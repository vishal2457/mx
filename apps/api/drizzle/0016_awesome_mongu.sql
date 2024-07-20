ALTER TABLE "member" ADD COLUMN "workoutTemplateID" integer NOT NULL;--> statement-breakpoint
ALTER TABLE "workoutTemplate" ADD COLUMN "active" boolean DEFAULT true;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "member" ADD CONSTRAINT "member_workoutTemplateID_workoutTemplate_id_fk" FOREIGN KEY ("workoutTemplateID") REFERENCES "public"."workoutTemplate"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
