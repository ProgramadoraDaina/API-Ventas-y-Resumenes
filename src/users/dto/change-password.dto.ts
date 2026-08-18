import { IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ChangePasswordDto {
  @IsString()
  @ApiProperty({
    example: 'admin123',
    description: 'Contraseña actual del usuario',
  })
  currentPassword!: string;

  @IsString()
  @MinLength(6)
  @ApiProperty({
    example: 'NuevaPassword123',
    description: 'Nueva contraseña del usuario',
  })
  newPassword!: string;
}
