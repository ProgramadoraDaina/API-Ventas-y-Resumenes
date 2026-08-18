import { Injectable } from '@nestjs/common';
import { db } from '../database/drizzle';
import { sales } from '../database/schema';
import { sql, and, gte, lt } from 'drizzle-orm';

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
                and(
                    gte(sales.createdAt, startOfDay),
                    lt(sales.createdAt, endOfDay),
                ),
            );
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
                and(
                    gte(sales.createdAt, startOfMonth),
                    lt(sales.createdAt, startOfNextMonth),
                ),
            )
            .groupBy(sql`DATE(${sales.createdAt})`)
            .orderBy(sql`DATE(${sales.createdAt})`);
    }
    async getDashboard() {
        const today = new Date();

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

        const [dailyStats] = await db
            .select({
                todaySales: sql<number>`COUNT(*)`,
                todayTotal: sql<number>`COALESCE(SUM(${sales.totalAmount}), 0)`,
            })
            .from(sales)
            .where(
                and(
                    gte(sales.createdAt, startOfDay),
                    lt(sales.createdAt, endOfDay),
                ),
            );

        const [monthlyStats] = await db
            .select({
                monthSales: sql<number>`COUNT(*)`,
                monthTotal: sql<number>`COALESCE(SUM(${sales.totalAmount}), 0)`,
            })
            .from(sales)
            .where(
                and(
                    gte(sales.createdAt, startOfMonth),
                    lt(sales.createdAt, startOfNextMonth),
                ),
            );

        return {
            todaySales: Number(dailyStats.todaySales),
            todayTotal: Number(dailyStats.todayTotal),

            monthSales: Number(monthlyStats.monthSales),
            monthTotal: Number(monthlyStats.monthTotal),
        };
    }
}