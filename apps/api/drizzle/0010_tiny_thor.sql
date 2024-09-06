ALTER TABLE "plan" ADD COLUMN "organisationID" integer;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "plan" ADD CONSTRAINT "plan_organisationID_organisation_id_fk" FOREIGN KEY ("organisationID") REFERENCES "public"."organisation"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
