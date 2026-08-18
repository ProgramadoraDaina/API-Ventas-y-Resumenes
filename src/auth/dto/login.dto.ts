import { IsEmail, MinLength, } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @IsEmail()
  @ApiProperty({
    example: 'admin@restaurant.com',
    description: 'Correo electrónico del usuario',
  })
  email!: string;

  @MinLength(6)
  @ApiProperty({
    example: 'admin123',
    description: 'Contraseña del usuario',
  })
  password!: string;
}