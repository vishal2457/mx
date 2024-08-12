DO $$ BEGIN
 CREATE TYPE "public"."experience" AS ENUM('expert', 'intermediate', 'beginner');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
ALTER TYPE "level" ADD VALUE 'expert';--> statement-breakpoint
ALTER TYPE "level" ADD VALUE 'intermediate';--> statement-breakpoint
ALTER TYPE "level" ADD VALUE 'beginner';--> statement-breakpoint
ALTER TABLE "member" ADD COLUMN "experience" "experience" DEFAULT 'intermediate';--> statement-breakpoint
ALTER TABLE "exercise" ADD COLUMN "mechanic" text;--> statement-breakpoint
ALTER TABLE "exercise" ADD COLUMN "equipment" text;--> statement-breakpoint
ALTER TABLE "exercise" ADD COLUMN "category" text;--> statement-breakpoint
ALTER TABLE "exercise" ADD COLUMN "force" text;