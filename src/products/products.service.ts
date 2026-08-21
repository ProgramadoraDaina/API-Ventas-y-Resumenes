import { Injectable } from '@nestjs/common';
import { db } from '../database/drizzle';
import { CreateProductDto } from './dto/create-product.dto';
import { products } from '../database/schema';
import { eq } from 'drizzle-orm';
import { NotFoundException } from '@nestjs/common';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductsService {
  async create(createProductDto: CreateProductDto) {
    const [product] = await db
      .insert(products)
      .values(createProductDto)
      .returning();

    return product;
  }
  async findAll() {
    return db.select().from(products);
  }
  async findOne(id: string) {
    const [product] = await db
      .select()
      .from(products)
      .where(eq(products.id, id));

    if (!product) {
      throw new NotFoundException(`Producto con id ${id} no encontrado`);
    }

    return product;
  }
  async update(id: string, updateProductDto: UpdateProductDto) {
    await this.findOne(id);

    const [product] = await db
      .update(products)
      .set(updateProductDto)
      .where(eq(products.id, id))
      .returning();

    return product;
  }
  async remove(id: string) {
    await this.findOne(id);

    const [product] = await db
      .delete(products)
      .where(eq(products.id, id))
      .returning();

    return product;
  }
}
