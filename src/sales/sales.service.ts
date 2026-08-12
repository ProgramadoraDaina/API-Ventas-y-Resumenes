import { Injectable } from '@nestjs/common';

import { db } from '../database/drizzle.js';
import { sales } from '../database/schema.js';

import { CreateSaleDto } from './dto/create-sale.dto.js';

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
}