import { Body, Controller, Get, Post, Patch, Delete, Param, ParseIntPipe, Query } from '@nestjs/common';
import { AuthUser } from '../auth/interfaces/auth-user.interface.js';
import { CreateSaleDto } from './dto/create-sale.dto.js';
import { SalesService } from './sales.service.js';
import { UpdateSaleDto } from './dto/update-sale.dto.js';
import { QuerySaleDto } from './dto/query-sale.dto.js';
import { UseGuards, Request } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { ApiBearerAuth } from '@nestjs/swagger';
import { ApiQuery, ApiTags, ApiOperation, ApiResponse, } from '@nestjs/swagger';

@ApiTags('Sales')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('sales')
export class SalesController {
    constructor(private readonly salesService: SalesService,) { }

    @Post()
    @ApiOperation({
        summary: 'Crear una venta',
    })
    @ApiResponse({
        status: 201,
        description: 'Venta creada correctamente',
    })
    create(
        @Body() createSaleDto: CreateSaleDto,) {
        return this.salesService.create(createSaleDto);
    }

    @Get()
    @ApiOperation({
        summary: 'Obtener ventas con filtros, paginación y ordenamiento',
    })
    @ApiResponse({
        status: 200,
        description: 'Listado de ventas obtenido correctamente',
    })
    findAll(@Query() querySaleDto: QuerySaleDto,
        @Request() req: { user: AuthUser },) {
        return this.salesService.findAll(
            querySaleDto,
            req.user,
        );
    }

    @Get(':id')
    @ApiOperation({
        summary: 'Obtener una venta por ID',
    })
    @ApiResponse({
        status: 200,
        description: 'Venta encontrada',
    })
    @ApiResponse({
        status: 404,
        description: 'Venta no encontrada',
    })
    findOne(@Param('id', ParseIntPipe) id: number,
        @Request() req: { user: AuthUser },) {
        return this.salesService.findOne(
            id,
            req.user,
        );
    }

    @Patch(':id')
    @ApiOperation({
        summary: 'Actualizar una venta',
    })
    @ApiResponse({
        status: 200,
        description: 'Venta actualizada correctamente',
    })
    @ApiResponse({
        status: 404,
        description: 'Venta no encontrada',
    })
    update(@Param('id', ParseIntPipe) id: number, @Body() updateSaleDto: UpdateSaleDto,
        @Request() req: { user: AuthUser },) {
        return this.salesService.update(id, updateSaleDto, req.user);
    }

    @Delete(':id')
@ApiOperation({
  summary: 'Eliminar una venta',
})
@ApiResponse({
  status: 200,
  description: 'Venta eliminada correctamente',
})
@ApiResponse({
  status: 404,
  description: 'Venta no encontrada',
})
remove(@Param('id', ParseIntPipe) id: number,
        @Request() req: { user: AuthUser },) {
        return this.salesService.remove(id, req.user);
    }
}