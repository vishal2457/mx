DROP TABLE "config";--> statement-breakpoint
DROP TABLE "customerOffer";--> statement-breakpoint
DROP TABLE "match";--> statement-breakpoint
DROP TABLE "offer";--> statement-breakpoint
ALTER TABLE "role" ADD COLUMN "active" boolean DEFAULT true;