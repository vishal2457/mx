ALTER TABLE "rolePermission" DROP CONSTRAINT "rolePermission_permissionID_permission_id_fk";
--> statement-breakpoint
DROP INDEX IF EXISTS "permissionIdx";--> statement-breakpoint
ALTER TABLE "member" ALTER COLUMN "gender" SET DEFAULT 'Male';--> statement-breakpoint
ALTER TABLE "rolePermission" ADD COLUMN "permission" text NOT NULL;--> statement-breakpoint
ALTER TABLE "rolePermission" ADD COLUMN "menuName" text NOT NULL;--> statement-breakpoint
ALTER TABLE "rolePermission" DROP COLUMN IF EXISTS "permissionID";