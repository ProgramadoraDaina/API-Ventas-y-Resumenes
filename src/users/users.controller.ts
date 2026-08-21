import { Body, Controller, Get, Patch } from '@nestjs/common';
import { UsersService } from './users.service';
import { UseGuards, Request } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { ApiBearerAuth, ApiOperation, ApiResponse, } from '@nestjs/swagger';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { UserRole } from './enums/user-role.enum';
import { UpdateRoleDto } from './dto/update-role.dto';
import { Param, ParseIntPipe } from '@nestjs/common';


@Controller('users')
export class UsersController {
constructor(private readonly usersService: UsersService,) {}

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get('profile')
  @ApiOperation({
    summary: 'Obtener perfil del usuario autenticado',
  })
  @ApiResponse({
    status: 200,
    description: 'Perfil obtenido correctamente',
  })
  @ApiResponse({
    status: 401,
    description: 'No autorizado',
  })
  getProfile(@Request() req) {
    return req.user;
  }


@ApiBearerAuth()
@Roles(UserRole.ADMIN)
@UseGuards(JwtAuthGuard, RolesGuard)
@Patch(':id/role')
@ApiOperation({
  summary: 'Actualizar rol de un usuario',
})
@ApiResponse({
  status: 200,
  description: 'Rol actualizado correctamente',
})
@ApiResponse({
  status: 400,
  description: 'No se puede modificar el rol de otro administrador',
})
@ApiResponse({
  status: 404,
  description: 'Usuario no encontrado',
})
@ApiResponse({
  status: 403,
  description: 'Acceso denegado',
})
updateRole(
  @Param('id', ParseIntPipe) id: number,
  @Body() updateRoleDto: UpdateRoleDto,
) {
  return this.usersService.updateRole(
    id,
    updateRoleDto.role,
  );
}
}