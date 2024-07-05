ALTER TABLE "role" ADD COLUMN "description" text NOT NULL;--> statement-breakpoint
ALTER TABLE "rolePermission" DROP COLUMN IF EXISTS "menuID";--> statement-breakpoint
ALTER TABLE "role" DROP COLUMN IF EXISTS "active";--> statement-breakpoint
ALTER TABLE "role" DROP COLUMN IF EXISTS "createdAt";--> statement-breakpoint
ALTER TABLE "role" DROP COLUMN IF EXISTS "updatedAt";