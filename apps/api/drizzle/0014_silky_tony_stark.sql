CREATE TABLE IF NOT EXISTS "memberMetricHistory" (
	"id" serial PRIMARY KEY NOT NULL,
	"memberID" integer NOT NULL,
	"weight" integer NOT NULL,
	"age" integer NOT NULL,
	"height" integer NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "memberMetricHistory" ADD CONSTRAINT "memberMetricHistory_memberID_member_id_fk" FOREIGN KEY ("memberID") REFERENCES "public"."member"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
