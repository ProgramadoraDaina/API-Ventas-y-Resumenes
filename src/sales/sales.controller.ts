import { Body, Controller, Get, Post, Patch, Delete, Param, ParseIntPipe, } from '@nestjs/common';

import { CreateSaleDto } from './dto/create-sale.dto.js';
import { SalesService } from './sales.service.js';
import { eq } from 'drizzle-orm';
import { UpdateSaleDto } from './dto/update-sale.dto.js';

@Controller('sales')
export class SalesController {
    constructor(private readonly salesService: SalesService,) { }

    @Post()
    create(
        @Body() createSaleDto: CreateSaleDto,) {
        return this.salesService.create(createSaleDto,);
    }

    @Get()
    findAll() {
        return this.salesService.findAll();
    }

    @Get(':id')
    findOne(@Param('id', ParseIntPipe) id: number) {
        return this.salesService.findOne(id);
    }

    @Patch(':id')
    update(@Param('id', ParseIntPipe) id: number, @Body() updateSaleDto: UpdateSaleDto,) {
        return this.salesService.update(id, updateSaleDto,);
    }

    @Delete(':id')
    remove(@Param('id', ParseIntPipe) id: number,) {
        return this.salesService.remove(id);
    }
}