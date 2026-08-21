import {
  IsEmail,
  IsString,
  MinLength,
} from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';

export class RegisterDto {
  @IsString()
  @MinLength(2)
  @ApiProperty({
    example: 'Juan Pérez',
    description: 'Nombre del usuario',
  })
  name!: string;

  @IsEmail()
  @ApiProperty({
    example: 'juan@gmail.com',
    description: 'Correo electrónico del usuario',
  })
  email!: string;

  @IsString()
  @MinLength(8)
  @ApiProperty({
    example: 'MiPassword123',
    description: 'Contraseña del usuario',
  })
  password!: string;
}