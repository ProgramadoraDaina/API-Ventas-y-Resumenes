import { Injectable, NotFoundException, ForbiddenException, } from '@nestjs/common';
import { AuthUser } from '../auth/interfaces/auth-user.interface';
import { db } from '../database/drizzle';
import { sales, products } from '../database/schema';
import { CreateSaleDto } from './dto/create-sale.dto';
import { eq, gte, lt, and, SQL, asc, desc, } from 'drizzle-orm';
import { UpdateSaleDto } from './dto/update-sale.dto';
import { QuerySaleDto } from './dto/query-sale.dto';
import { UserRole } from '../users/enums/user-role.enum';

@Injectable()
export class SalesService {
    async create(
        createSaleDto: CreateSaleDto,
        user: AuthUser,
    ) {
        const [product] = await db
            .select()
            .from(products)
            .where(
                eq(
                    products.id,
                    createSaleDto.productId,
                ),
            );

        if (!product) {
            throw new NotFoundException(
                'Producto no encontrado',
            );
        }

        if (
            product.stock <
            createSaleDto.quantity
        ) {
            throw new ForbiddenException(
                'Stock insuficiente',
            );
        }

        const totalAmount =
            Number(product.price) *
            createSaleDto.quantity;

        const [sale] = await db
            .insert(sales)
            .values({
                productId: createSaleDto.productId,
                quantity: createSaleDto.quantity,
                totalAmount,
                paymentMethod:
                    createSaleDto.paymentMethod,
                createdBy: user.id,
            })
            .returning();

        await db
            .update(products)
            .set({
                stock:
                    product.stock -
                    createSaleDto.quantity,
            })
            .where(eq(products.id, product.id));

        return sale;
    }

    async findAll(querySaleDto: QuerySaleDto, user: AuthUser,) {
        if (user.role === UserRole.EMPLOYEE &&
            (querySaleDto.startDate || querySaleDto.endDate)) {
            throw new ForbiddenException(
                'No puedes consultar ventas históricas',
            );
        }

        const _page = querySaleDto.page ?? 1;/*si no recibe page usa 1*/
        const _limit = querySaleDto.limit ?? 10;

        const _orderByClause =
            querySaleDto.sort === 'asc'
                ? asc(sales.createdAt)
                : desc(sales.createdAt);

        const _conditions: SQL[] = [];

        if (user.role === UserRole.EMPLOYEE) {
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

            _conditions.push(
                gte(sales.createdAt, _startOfDay),
            );

            _conditions.push(
                lt(sales.createdAt, _endOfDay)
            );
            _conditions.push(
                eq(sales.createdBy, user.id),
            );
        }
        if (querySaleDto.paymentMethod) {/*si recibe un metodo de pago, filtra las que tenga ese metodo de pago*/
            _conditions.push(eq(
                sales.paymentMethod,
                querySaleDto.paymentMethod,
            ),
            );
        }

        if (querySaleDto.startDate) {/*si recibe una fecha de inicio filtra las ventas que si son mayor  
                                       o igual a la fecha*/
            _conditions.push(gte(
                sales.createdAt,
                new Date(querySaleDto.startDate),
            ),
            );
        }

        if (querySaleDto.endDate) {/*si recibe una fecha de fin filtra por las ventas previas o iguales*/
            _conditions.push(lt(
                sales.createdAt,
                new Date(querySaleDto.endDate),
            ),
            );
        }
        if (_conditions.length > 0) { /*si existen filtros, aplica todas las condiciones*/
            return db
                .select()
                .from(sales)
                .where(and(..._conditions))
                .orderBy(_orderByClause)
                .limit(_limit)
                .offset((_page - 1) * _limit);
        }
        return db       /*retorna las primeras ventas*/
            .select()
            .from(sales)
            .orderBy(_orderByClause)
            .limit(_limit)
            .offset((_page - 1) * _limit);/*saltea la cantidad de ventas necesaria para llegar a la
                                                pagina deseada*/
    }

    async findOne(id: string, user: AuthUser,) {
        const [sale] = await db
            .select()
            .from(sales)
            .where(eq(sales.id, id));

        if (!sale) {
            throw new NotFoundException(
                `Venta con id ${id} no encontrada`,
            );
        }
        this.validateEmployeeAccess(
            sale.createdAt,
            sale.createdBy,
            user,
            'No puedes consultar ventas de días anteriores',
        );
        return sale;
    }

    async update(id: string, updateSaleDto: UpdateSaleDto, user: AuthUser,) {
        await this.findOne(id, user);

        const [sale] = await db
            .update(sales)
            .set(updateSaleDto)
            .where(eq(sales.id, id))
            .returning();

        return sale;
    }

    async remove(id: string, user: AuthUser,) {
        await this.findOne(id, user);

        const [sale] = await db
            .delete(sales)
            .where(eq(sales.id, id))
            .returning();

        return sale;
    }
    private validateEmployeeAccess(
        saleDate: Date,
        saleCreatedBy: string,
        user: AuthUser,
        message: string,) {
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

        if (saleCreatedBy !== user.id) {
            throw new ForbiddenException(
                'Esta venta no te pertenece',
            );
        }
    }
}