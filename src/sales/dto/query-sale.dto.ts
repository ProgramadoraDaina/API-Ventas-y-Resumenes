import { Type } from 'class-transformer';
import { IsDateString, IsEnum, IsInt, IsOptional, Min, IsIn,} from 'class-validator';

import { ApiPropertyOptional } from '@nestjs/swagger';

import { PaymentMethod } from '../enums/payment-method.enum';

export class QuerySaleDto {
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @ApiPropertyOptional({
    example: 1,
    description: 'Número de página',
  })
  page?: number;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @ApiPropertyOptional({
    example: 10,
    description: 'Cantidad de registros por página',
  })
  limit?: number;

  @IsOptional()
  @IsEnum(PaymentMethod)
  @ApiPropertyOptional({
    enum: PaymentMethod,
    example: 'cash',
    description: 'Filtrar por método de pago',
  })
  paymentMethod?: PaymentMethod;

  @IsOptional()
  @IsDateString()
  @ApiPropertyOptional({
    example: '2026-08-01',
    description: 'Fecha inicial del filtro',
  })
  startDate?: string;

  @IsOptional()
  @IsDateString()
  @ApiPropertyOptional({
    example: '2026-08-31',
    description: 'Fecha final del filtro',
  })
  endDate?: string;

  @IsOptional()
  @IsIn(['asc', 'desc'])
  @ApiPropertyOptional({
    enum: ['asc', 'desc'],
    example: 'desc',
    description: 'Ordenamiento por fecha de creación',
  })
  sort?: 'asc' | 'desc';
}
