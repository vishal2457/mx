CREATE TABLE IF NOT EXISTS "organisation" (

);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "systemConfig" (
	"id" serial PRIMARY KEY NOT NULL,
	"logo" text NOT NULL,
	"panelName" text NOT NULL,
	"darkMode" boolean DEFAULT true
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "userBookmark" (
	"id" serial PRIMARY KEY NOT NULL,
	"link" text NOT NULL,
	"userID" integer NOT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "userBookmark" ADD CONSTRAINT "userBookmark_userID_user_id_fk" FOREIGN KEY ("userID") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "rolePermission" ADD CONSTRAINT "rolePermission_permissionID_permission_id_fk" FOREIGN KEY ("permissionID") REFERENCES "public"."permission"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "rolePermission" ADD CONSTRAINT "rolePermission_roleID_role_id_fk" FOREIGN KEY ("roleID") REFERENCES "public"."role"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "userRole" ADD CONSTRAINT "userRole_roleID_role_id_fk" FOREIGN KEY ("roleID") REFERENCES "public"."role"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "userRole" ADD CONSTRAINT "userRole_userID_user_id_fk" FOREIGN KEY ("userID") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
