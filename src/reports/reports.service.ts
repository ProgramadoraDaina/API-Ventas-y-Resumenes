import { Injectable } from '@nestjs/common';
import { db } from '../database/drizzle.js';
import { sales } from '../database/schema.js';
import { gte, lt, sql } from 'drizzle-orm';

@Injectable()
export class ReportsService {
    async getDailyReport() {
        const today = new Date();/*obtiene la fecha y hora actual*/

        const startOfDay = new Date(
            today.getFullYear(),
            today.getMonth(),
            today.getDate(),
        );

        const endOfDay = new Date(
            today.getFullYear(),
            today.getMonth(),
            today.getDate() + 1,
        );

        return db
            .select()
            .from(sales)
            .where(
                sql`${sales.createdAt} >= ${startOfDay} AND ${sales.createdAt} < ${endOfDay}`,);
    }
    async getMonthlyReport() {
        const today = new Date();

        const startOfMonth = new Date(
            today.getFullYear(),
            today.getMonth(),
            1,
        );

        const startOfNextMonth = new Date(
            today.getFullYear(),
            today.getMonth() + 1,
            1,
        );

        return db
            .select({
                date: sql<string>`DATE(${sales.createdAt})`,
                totalAmount: sql<number>`SUM(${sales.totalAmount})`,
            })
            .from(sales)
            .where(
                sql`${sales.createdAt} >= ${startOfMonth}
          AND ${sales.createdAt} < ${startOfNextMonth}`,
            )
            .groupBy(sql`DATE(${sales.createdAt})`)
            .orderBy(sql`DATE(${sales.createdAt})`);
    }
}