ALTER TYPE "public"."user_role" ADD VALUE 'customer';--> statement-breakpoint
ALTER TABLE "users" ALTER COLUMN "role" SET DEFAULT 'customer';--> statement-breakpoint
ALTER TABLE "users" DROP COLUMN "must_change_password";