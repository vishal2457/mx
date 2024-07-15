ALTER TABLE "member" ALTER COLUMN "height" SET DATA TYPE integer;--> statement-breakpoint
ALTER TABLE "member" ALTER COLUMN "weight" SET DATA TYPE integer;--> statement-breakpoint
ALTER TABLE "member" ALTER COLUMN "joinDate" SET DATA TYPE varchar;--> statement-breakpoint
ALTER TABLE "user" ALTER COLUMN "name" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "member" ADD COLUMN "age" integer NOT NULL;--> statement-breakpoint
ALTER TABLE "member" ADD COLUMN "profilePic" text;--> statement-breakpoint
ALTER TABLE "member" DROP COLUMN IF EXISTS "dob";