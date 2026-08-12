import { Type } from 'class-transformer';
import { IsEnum, IsInt, Min } from 'class-validator';

import { PaymentMethod } from '../enums/payment-method.enum.js';

export class CreateSaleDto {
  @Type(() => Number) /*validaciones*/
  @IsInt()
  @Min(1)
  totalAmount!: number;

  @IsEnum(PaymentMethod)
  paymentMethod!: PaymentMethod;
}