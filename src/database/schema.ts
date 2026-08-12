import { integer, pgEnum, pgTable, serial, timestamp, } from 'drizzle-orm/pg-core';

export const paymentMethodEnum = pgEnum('payment_method',
    [
        'cash',
        'debit_card',
        'credit_card',
        'transfer',
    ],
);/*validamos en 2 niveles (NestJS y PostgreSQL), eso se llama defensa en profundidad*/

export const sales = pgTable('sales', {/*tabla ventas*/
    id: serial('id').primaryKey(),

    totalAmount: integer('total_amount')
        .notNull(),

    paymentMethod: paymentMethodEnum('payment_method',)
        .notNull(),

    createdAt: timestamp('created_at')
        .defaultNow()
        .notNull(),
});