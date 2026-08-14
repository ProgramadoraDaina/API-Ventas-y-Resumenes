import { Injectable, NotFoundException } from '@nestjs/common';

import { db } from '../database/drizzle.js';
import { sales } from '../database/schema.js';
import { CreateSaleDto } from './dto/create-sale.dto.js';
import { eq, gte, lte, and, SQL } from 'drizzle-orm';
import { UpdateSaleDto } from './dto/update-sale.dto.js';
import { QuerySaleDto } from './dto/query-sale.dto.js';

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
    async findAll(querySaleDto: QuerySaleDto) {
        const page = querySaleDto.page ?? 1;/*si no recibe page usa 1*/
        const limit = querySaleDto.limit ?? 10;

        const conditions: SQL[] = [];

        if (querySaleDto.paymentMethod) {/*si recibe un metodo de pago, filtra las que tenga ese metodo de pago*/
            conditions.push(eq(
                    sales.paymentMethod,
                    querySaleDto.paymentMethod,
                ),
            );
        }

        if (querySaleDto.startDate) {/*si recibe una fecha de inicio filtra las ventas que si son mayor  
                                       o igual a la fecha*/
            conditions.push(gte(
                    sales.createdAt,
                    new Date(querySaleDto.startDate),
                ),
            );
        }

        if (querySaleDto.endDate) {/*si recibe una fecha de fin filtra por las ventas previas o iguales*/
            conditions.push(lte(
                    sales.createdAt,
                    new Date(querySaleDto.endDate),
                ),
            );
        }
        if (conditions.length > 0) { /*si existen filtros, aplica todas las condiciones*/
            return db
                .select()
                .from(sales)
                .where(and(...conditions))
                .limit(limit)
                .offset((page - 1) * limit);
        }
        return db       /*retorna las primeras ventas*/
            .select()
            .from(sales)
            .limit(limit)
            .offset((page - 1) * limit);/*saltea la cantidad de ventas necesaria para llegar a la
                                        pagina deseada*/
    }

    async findOne(id: number) {
        const [sale] = await db
            .select()
            .from(sales)
            .where(eq(sales.id, id));

        if (!sale) {
            throw new NotFoundException(
                `Sale with id ${id} not found`,
            );
        }

        return sale;
    }

    async update(id: number, updateSaleDto: UpdateSaleDto,) {
        await this.findOne(id);

        const [sale] = await db
            .update(sales)
            .set(updateSaleDto)
            .where(eq(sales.id, id))
            .returning();

        return sale;
    }

    async remove(id: number) {
        await this.findOne(id);

        const [sale] = await db
            .delete(sales)
            .where(eq(sales.id, id))
            .returning();

        return sale;
    }
}