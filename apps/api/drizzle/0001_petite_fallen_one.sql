ALTER TYPE "gameSlug" ADD VALUE 'basketball';--> statement-breakpoint
ALTER TYPE "gameSlug" ADD VALUE 'kabaddi';--> statement-breakpoint
ALTER TABLE "match" ADD COLUMN "active" boolean DEFAULT true;