import { Injectable } from '@nestjs/common';
import { db } from '../database/drizzle';
import { sales } from '../database/schema';
import { sql, and, gte, lt } from 'drizzle-orm';

@Injectable()
export class ReportsService {
    async getDailyReport() {
        const _today = new Date();/*obtiene la fecha y hora actual*/

        const _startOfDay = new Date(
            _today.getFullYear(),
            _today.getMonth(),
            _today.getDate(),
        );

        const _endOfDay = new Date(
            _today.getFullYear(),
            _today.getMonth(),
            _today.getDate() + 1,
        );

        return db
            .select()
            .from(sales)
            .where(
                and(
                    gte(sales.createdAt, _startOfDay),
                    lt(sales.createdAt, _endOfDay),
                ),
            );
    }
    async getMonthlyReport() {
        const _today = new Date();

        const _startOfMonth = new Date(
            _today.getFullYear(),
            _today.getMonth(),
            1,
        );

        const _startOfNextMonth = new Date(
            _today.getFullYear(),
            _today.getMonth() + 1,
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
                    gte(sales.createdAt, _startOfMonth),
                    lt(sales.createdAt, _startOfNextMonth),
                ),
            )
            .groupBy(sql`DATE(${sales.createdAt})`)
            .orderBy(sql`DATE(${sales.createdAt})`);
    }
    async getDashboard() {
        const _today = new Date();

        const _startOfDay = new Date(
            _today.getFullYear(),
            _today.getMonth(),
            _today.getDate(),
        );

        const _endOfDay = new Date(
            _today.getFullYear(),
            _today.getMonth(),
            _today.getDate() + 1,
        );

        const _startOfMonth = new Date(
            _today.getFullYear(),
            _today.getMonth(),
            1,
        );

        const _startOfNextMonth = new Date(
            _today.getFullYear(),
            _today.getMonth() + 1,
            1,
        );

        const [_dailyStats] = await db
            .select({
                todaySales: sql<number>`COUNT(*)`,
                todayTotal: sql<number>`COALESCE(SUM(${sales.totalAmount}), 0)`,
            })
            .from(sales)
            .where(
                and(
                    gte(sales.createdAt, _startOfDay),
                    lt(sales.createdAt, _endOfDay),
                ),
            );

        const [_monthlyStats] = await db
            .select({
                monthSales: sql<number>`COUNT(*)`,
                monthTotal: sql<number>`COALESCE(SUM(${sales.totalAmount}), 0)`,
            })
            .from(sales)
            .where(
                and(
                    gte(sales.createdAt, _startOfMonth),
                    lt(sales.createdAt, _startOfNextMonth),
                ),
            );

        return {
            todaySales: Number(_dailyStats.todaySales),
            todayTotal: Number(_dailyStats.todayTotal),

            monthSales: Number(_monthlyStats.monthSales),
            monthTotal: Number(_monthlyStats.monthTotal),
        };
    }
}