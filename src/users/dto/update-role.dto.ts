import { IsEnum } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { UserRole } from '../enums/user-role.enum';

export class UpdateRoleDto {
  @ApiProperty({
    enum: UserRole,
    example: UserRole.EMPLOYEE,
    description: 'Nuevo rol del usuario',
  })
  @IsEnum(UserRole)
  role!: UserRole;
}