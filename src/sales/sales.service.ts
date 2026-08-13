import { Injectable } from '@nestjs/common';

import { db } from '../database/drizzle.js';
import { sales } from '../database/schema.js';
import { CreateSaleDto } from './dto/create-sale.dto.js';
import { eq } from 'drizzle-orm';
import { UpdateSaleDto } from './dto/update-sale.dto.js';

@Injectable()
export class SalesService {
    async create(createSaleDto: CreateSaleDto) {
        const [sale] = await db
            .insert(sales)
            .values({
                totalAmount: createSaleDto.totalAmount,
                paymentMethod: createSaleDto.paymentMethod,
            })
            .returning();

        return sale;
    }

    async findAll() {
        return db.select().from(sales);
    }

    async findOne(id: number) {
        const [sale] = await db
            .select()
            .from(sales)
            .where(eq(sales.id, id));

        return sale;
    }

    async update(id: number, updateSaleDto: UpdateSaleDto,) {
        const [sale] = await db
            .update(sales)
            .set(updateSaleDto)
            .where(eq(sales.id, id))
            .returning();

        return sale;
    }

    async remove(id: number) {
        const [sale] = await db
            .delete(sales)
            .where(eq(sales.id, id))
            .returning();

        return sale;
    }
}