ALTER TYPE "gender" ADD VALUE 'Male';--> statement-breakpoint
ALTER TYPE "gender" ADD VALUE 'Female';--> statement-breakpoint
ALTER TABLE "member" DROP CONSTRAINT "member_planID_plan_id_fk";
--> statement-breakpoint
ALTER TABLE "member" ALTER COLUMN "gender" SET DEFAULT 'Female';--> statement-breakpoint
ALTER TABLE "memberPlan" ADD COLUMN "startDate" timestamp NOT NULL;--> statement-breakpoint
ALTER TABLE "memberPlan" ADD COLUMN "paid" boolean DEFAULT false;--> statement-breakpoint
ALTER TABLE "member" DROP COLUMN IF EXISTS "planID";