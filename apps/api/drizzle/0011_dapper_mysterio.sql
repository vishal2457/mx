CREATE TABLE IF NOT EXISTS "memberAttendance" (
	"id" serial PRIMARY KEY NOT NULL,
	"memberID" integer NOT NULL,
	"dateAndTime" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "memberPlan" (
	"id" serial PRIMARY KEY NOT NULL,
	"memberID" integer NOT NULL,
	"planID" integer NOT NULL,
	"endDate" timestamp NOT NULL,
	"createdAt" timestamp DEFAULT now(),
	"updatedAt" timestamp
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "memberAttendance" ADD CONSTRAINT "memberAttendance_memberID_member_id_fk" FOREIGN KEY ("memberID") REFERENCES "public"."member"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "memberPlan" ADD CONSTRAINT "memberPlan_memberID_member_id_fk" FOREIGN KEY ("memberID") REFERENCES "public"."member"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "memberPlan" ADD CONSTRAINT "memberPlan_planID_plan_id_fk" FOREIGN KEY ("planID") REFERENCES "public"."plan"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
