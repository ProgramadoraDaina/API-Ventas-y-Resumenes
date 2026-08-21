CREATE TABLE "products" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar(100) NOT NULL,
	"price" numeric(10, 2) NOT NULL,
	"stock" integer NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "sales" ALTER COLUMN "total_amount" SET DATA TYPE numeric(10, 2);--> statement-breakpoint
ALTER TABLE "sales" ADD COLUMN "product_id" uuid NOT NULL;--> statement-breakpoint
ALTER TABLE "sales" ADD COLUMN "quantity" integer NOT NULL;--> statement-breakpoint
ALTER TABLE "sales" ADD CONSTRAINT "sales_product_id_products_id_fk" FOREIGN KEY ("product_id") REFERENCES "public"."products"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "sales_product_id_idx" ON "sales" USING btree ("product_id");