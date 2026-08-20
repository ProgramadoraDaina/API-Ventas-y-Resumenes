import 'dotenv/config';
import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,

  max: 20,  /*Máximo de conexiones simultáneas*/
  idleTimeoutMillis: 20000,   /*Cierra conexiones inactivas después de 20 segundos*/
  connectionTimeoutMillis: 10000, /*Tiempo de espera para conectarse*/
});

export const db = drizzle(pool);/*crea instancia drizzle*/