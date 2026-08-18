import {
  IsEmail,
  IsEnum,
  IsString,
} from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';

import { UserRole } from '../enums/user-role.enum';

export class CreateUserDto {
  @IsString()
  @ApiProperty({
    example: 'Juan Pérez',
    description: 'Nombre del usuario',
  })
  name!: string;

  @IsEmail()
  @ApiProperty({
    example: 'juan@restaurant.com',
    description: 'Correo electrónico del usuario',
  })
  email!: string;

  @IsEnum(UserRole)
  @ApiProperty({
    enum: UserRole,
    example: UserRole.EMPLOYEE,
    description: 'Rol asignado al usuario',
  })
  role!: UserRole;
}