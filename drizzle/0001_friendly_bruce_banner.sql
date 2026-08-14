CREATE TYPE "public"."user_role" AS ENUM('admin', 'manager', 'employee');--> statement-breakpoint
CREATE TABLE "users" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(100) NOT NULL,
	"email" varchar(255) NOT NULL,
	"password" varchar(255) NOT NULL,
	"role" "user_role" DEFAULT 'employee' NOT NULL,
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
