import { Injectable, NotFoundException, ForbiddenException, } from '@nestjs/common';
import { AuthUser } from '../auth/interfaces/auth-user.interface.js';
import { db } from '../database/drizzle';
import { sales } from '../database/schema';
import { CreateSaleDto } from './dto/create-sale.dto.js';
import { eq, gte, lte, and, SQL, asc,desc, } from 'drizzle-orm';
import { UpdateSaleDto } from './dto/update-sale.dto';
import { QuerySaleDto } from './dto/query-sale.dto';
import { UserRole } from '../users/enums/user-role.enum';

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

    async findAll(querySaleDto: QuerySaleDto, user: AuthUser,) {
        if (user.role === UserRole.EMPLOYEE &&
            (querySaleDto.startDate || querySaleDto.endDate)) {
            throw new ForbiddenException(
                'No puedes consultar ventas históricas',
            );
        }

        const page = querySaleDto.page ?? 1;/*si no recibe page usa 1*/
        const limit = querySaleDto.limit ?? 10;

        const orderByClause =
            querySaleDto.sort === 'asc'
                ? asc(sales.createdAt)
                : desc(sales.createdAt);

        const conditions: SQL[] = [];

        if (user.role === UserRole.EMPLOYEE) {
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

            conditions.push(
                gte(sales.createdAt, startOfDay),
            );

            conditions.push(
                lte(sales.createdAt, endOfDay),
            );
        }
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
                .orderBy(orderByClause)
                .limit(limit)
                .offset((page - 1) * limit);
        }
        return db       /*retorna las primeras ventas*/
            .select()
            .from(sales)
            .orderBy(orderByClause)
            .limit(limit)
            .offset((page - 1) * limit);/*saltea la cantidad de ventas necesaria para llegar a la
                                                pagina deseada*/
    }

    async findOne(id: number, user: AuthUser,) {
        const [sale] = await db
            .select()
            .from(sales)
            .where(eq(sales.id, id));

        if (!sale) {
            throw new NotFoundException(
                `Sale with id ${id} not found`,
            );
        }
        this.validateEmployeeAccess(
            sale.createdAt,
            user,
            'No puedes consultar ventas de días anteriores',
        );
        return sale;
    }

    async update(id: number, updateSaleDto: UpdateSaleDto, user: AuthUser,) {
        await this.findOne(id, user);

        const [sale] = await db
            .update(sales)
            .set(updateSaleDto)
            .where(eq(sales.id, id))
            .returning();

        return sale;
    }

    async remove(id: number, user: AuthUser,) {
        await this.findOne(id, user);

        const [sale] = await db
            .delete(sales)
            .where(eq(sales.id, id))
            .returning();

        return sale;
    }
    private validateEmployeeAccess(
        saleDate: Date,
        user: AuthUser,
        message: string,
    ) {
        if (user.role !== UserRole.EMPLOYEE) {
            return;
        }

        const today = new Date();

        const sameDay =
            saleDate.getDate() === today.getDate() &&
            saleDate.getMonth() === today.getMonth() &&
            saleDate.getFullYear() === today.getFullYear();

        if (!sameDay) {
            throw new ForbiddenException(message);
        }
    }
}