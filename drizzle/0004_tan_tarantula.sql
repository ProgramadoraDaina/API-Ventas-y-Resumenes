CREATE INDEX "sales_created_at_idx" ON "sales" USING btree ("created_at");--> statement-breakpoint
CREATE INDEX "sales_payment_method_idx" ON "sales" USING btree ("payment_method");--> statement-breakpoint
CREATE INDEX "sales_payment_created_idx" ON "sales" USING btree ("payment_method","created_at");