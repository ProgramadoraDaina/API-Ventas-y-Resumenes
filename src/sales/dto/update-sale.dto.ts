import { PartialType } from '@nestjs/mapped-types';
import { CreateSaleDto } from './create-sale.dto.js';

export class UpdateSaleDto extends PartialType(CreateSaleDto) {}/*hereda todos los campos de
                                                                CreateSaleDto pero son opcionales*/