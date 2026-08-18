import { PartialType } from '@nestjs/swagger';
import { CreateSaleDto } from './create-sale.dto';

export class UpdateSaleDto extends PartialType(CreateSaleDto) {}/*hereda todos los campos de
                                                                CreateSaleDto pero son opcionales*/