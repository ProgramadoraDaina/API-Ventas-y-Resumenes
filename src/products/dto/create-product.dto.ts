import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNumber, IsString, Length, Min } from 'class-validator';

export class CreateProductDto {
  @ApiProperty({
    example: 'Lomo Saltado',
    description: 'Nombre del producto',
  })
  @IsString()
  @Length(2, 100)
  name!: string;

  @ApiProperty({
    example: 15000,
    description: 'Precio del producto',
  })
  @IsNumber()
  @Min(0)
  price!: number;

  @ApiProperty({
    example: 50,
    description: 'Stock disponible',
  })
  @IsInt()
  @Min(0)
  stock!: number;
}
