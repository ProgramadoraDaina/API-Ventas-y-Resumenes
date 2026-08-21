import { integer, pgEnum, pgTable, serial, timestamp, varchar, index, text, uuid } from 'drizzle-orm/pg-core';

export const paymentMethodEnum = pgEnum('payment_method',
  [
    'cash',
    'debit_card',
    'credit_card',
    'transfer',
  ],
);/*validamos en 2 niveles (NestJS y PostgreSQL), eso se llama defensa en profundidad*/

export const userRoleEnum = pgEnum('user_role', [
  'admin',
  'employee',
  'customer',
])

export const products = pgTable('products', {
  id: uuid('id')
    .defaultRandom()
    .primaryKey(),

  name: varchar('name', {
    length: 100,
  }).notNull(),

  price: integer('price').notNull(),

  stock: integer('stock')
    .notNull(),

  createdAt: timestamp('created_at')
    .defaultNow()
    .notNull(),
});

export const sales = pgTable(
  'sales',
  {
    id: uuid('id')
      .defaultRandom()
      .primaryKey(),

    productId: uuid('product_id')
      .references(() => products.id)
      .notNull(),

    quantity: integer('quantity')
      .notNull(),

    totalAmount: integer('total_amount').notNull(),

    paymentMethod: paymentMethodEnum(
      'payment_method',
    ).notNull(),

    createdAt: timestamp('created_at')
      .defaultNow()
      .notNull(),

    createdBy: uuid('created_by')
      .references(() => users.id)
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

    createdByIdx: index(
      'sales_created_by_idx',
    ).on(table.createdBy),

    productIdIdx: index(
      'sales_product_id_idx',
    ).on(table.productId),
  })
);

export const users = pgTable('users', {/**tabla usuarios*/
  id: uuid('id')
    .defaultRandom()
    .primaryKey(),

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
    .default('customer')
    .notNull(),

  hashedRefreshToken: text('hashed_refresh_token'),
});
