DO $$ BEGIN
 CREATE TYPE "public"."permission" AS ENUM('view', 'create', 'update');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DROP TABLE "permission";--> statement-breakpoint
ALTER TABLE "memberWorkoutLog" ALTER COLUMN "completedTime" SET DATA TYPE integer;--> statement-breakpoint
ALTER TABLE "rolePermission" ALTER COLUMN "permission" SET DATA TYPE permission;--> statement-breakpoint
ALTER TABLE "memberWorkoutLog" ADD COLUMN "approxCalorieBurn" integer;