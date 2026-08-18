import { Controller, UseGuards, Get } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { ReportsService } from './reports.service';
import { Roles } from '../auth/decorators/roles.decorator';
import { UserRole } from '../users/enums/user-role.enum';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags, } from '@nestjs/swagger';

@ApiTags('Reports')
@ApiBearerAuth()
@Controller('reports')
@UseGuards(JwtAuthGuard, RolesGuard)
export class ReportsController {
  constructor(private readonly reportsService: ReportsService,) { }

  @Roles(UserRole.ADMIN, UserRole.EMPLOYEE)
  @Get('daily')
  @ApiOperation({
    summary: 'Obtener reporte diario de ventas',
  })
  @ApiResponse({
    status: 200,
    description: 'Reporte diario obtenido correctamente',
  })
  @ApiResponse({
    status: 401,
    description: 'No autorizado',
  })
  getDailyReport() {
    return this.reportsService.getDailyReport();
  }

  @Roles(UserRole.ADMIN)
  @Get('monthly')
  @ApiOperation({
    summary: 'Obtener reporte mensual de ventas',
  })
  @ApiResponse({
    status: 200,
    description: 'Reporte mensual obtenido correctamente',
  })
  @ApiResponse({
    status: 403,
    description: 'Acceso denegado',
  })
  getMonthlyReport() {
    return this.reportsService.getMonthlyReport();
  }

  @Roles(UserRole.ADMIN)
  @Get('dashboard')
  @ApiOperation({
    summary: 'Obtener métricas del dashboard',
  })
  @ApiResponse({
    status: 200,
    description: 'Dashboard obtenido correctamente',
  })
  @ApiResponse({
    status: 403,
    description: 'Acceso denegado',
  })
  getDashboard() {
    return this.reportsService.getDashboard();
  }
}