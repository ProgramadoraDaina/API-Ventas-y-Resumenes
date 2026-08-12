import { Body, Controller, Post,} from '@nestjs/common';

import { CreateSaleDto } from './dto/create-sale.dto.js';
import { SalesService } from './sales.service.js';

@Controller('sales')
export class SalesController {
  constructor(
    private readonly salesService: SalesService,) {}

  @Post()
  create(
    @Body() createSaleDto: CreateSaleDto,) {
    return this.salesService.create(
      createSaleDto,
    );
  }
}