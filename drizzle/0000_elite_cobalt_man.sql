CREATE TYPE "public"."payment_method" AS ENUM('cash', 'debit_card', 'credit_card', 'transfer');--> statement-breakpoint
CREATE TABLE "sales" (
	"id" serial PRIMARY KEY NOT NULL,
	"total_amount" integer NOT NULL,
	"payment_method" "payment_method" NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
