import { Type } from 'class-transformer';
import { IsEnum, IsInt, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { PaymentMethod } from '../enums/payment-method.enum';

export class CreateSaleDto {
  @Type(() => Number) /*validaciones*/
  @IsInt()
  @Min(1)
  @ApiProperty({
    example: 15000,
    description: 'Monto total de la venta',
  })
  totalAmount!: number;

  @IsEnum(PaymentMethod)
  @ApiProperty({
    enum: PaymentMethod,
    example: PaymentMethod.CASH,
    description: 'Método de pago utilizado',
  })
  paymentMethod!: PaymentMethod;
}