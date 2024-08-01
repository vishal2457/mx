CREATE TABLE IF NOT EXISTS "enquiryStatusHistory" (
	"id" serial PRIMARY KEY NOT NULL,
	"status" "status" NOT NULL,
	"userID" integer NOT NULL,
	"enquiryID" integer NOT NULL,
	"createdAt" timestamp DEFAULT now()
);
--> statement-breakpoint
ALTER TABLE "enquiry" ALTER COLUMN "status" SET NOT NULL;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "enquiryStatusHistory" ADD CONSTRAINT "enquiryStatusHistory_userID_user_id_fk" FOREIGN KEY ("userID") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "enquiryStatusHistory" ADD CONSTRAINT "enquiryStatusHistory_enquiryID_enquiry_id_fk" FOREIGN KEY ("enquiryID") REFERENCES "public"."enquiry"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
