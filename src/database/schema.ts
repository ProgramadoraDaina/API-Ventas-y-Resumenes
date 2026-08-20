import { integer, pgEnum, pgTable, serial, timestamp, varchar, boolean, index } from 'drizzle-orm/pg-core';

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
},
  (table) => ({
    createdAtIdx: index(
      'sales_created_at_idx',
    ).on(table.createdAt),

    paymentMethodIdx: index(
      'sales_payment_method_idx',
    ).on(table.paymentMethod),

    paymentCreatedIdx: index(
      'sales_payment_created_idx',
    ).on(
      table.paymentMethod,
      table.createdAt,
    ),
  }),
);

export const userRoleEnum = pgEnum('user_role', [
  'admin',
  'employee'
])

export const users = pgTable('users', { /**tabla usuarios*/
  id: serial('id').primaryKey(),

  name: varchar('name', {
    length: 100,
  }).notNull(),

  email: varchar('email', {
    length: 255,
  })
    .unique()
    .notNull(),

  password: varchar('password', {
    length: 255,
  }).notNull(),

  role: userRoleEnum('role')
    .default('employee')
    .notNull(),

  mustChangePassword: boolean('must_change_password')
    .default(true)
    .notNull(),
});