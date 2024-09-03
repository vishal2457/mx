ALTER TABLE "memberPlan" DROP CONSTRAINT "memberPlan_planID_plan_id_fk";
--> statement-breakpoint
ALTER TABLE "memberWorkoutLog" DROP CONSTRAINT "memberWorkoutLog_workoutTemplateDetailID_workoutTemplateDetail_id_fk";
--> statement-breakpoint
ALTER TABLE "memberPlan" ADD COLUMN "planName" text NOT NULL;--> statement-breakpoint
ALTER TABLE "memberPlan" ADD COLUMN "amount" integer NOT NULL;--> statement-breakpoint
ALTER TABLE "memberPlan" ADD COLUMN "periodInMonths" integer NOT NULL;--> statement-breakpoint
ALTER TABLE "memberWorkoutLog" ADD COLUMN "day" "day" DEFAULT 'day1' NOT NULL;--> statement-breakpoint
ALTER TABLE "memberPlan" DROP COLUMN IF EXISTS "planID";