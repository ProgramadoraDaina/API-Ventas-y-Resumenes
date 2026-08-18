import { Controller, UseGuards, Get } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard.js';
import { RolesGuard } from '../auth/guards/roles.guard.js';
import { ReportsService } from './reports.service.js';
import { Roles } from '../auth/decorators/roles.decorator.js';
import { UserRole } from '../users/enums/user-role.enum.js';

@Controller('reports')
@UseGuards(JwtAuthGuard, RolesGuard)
export class ReportsController {
  constructor(private readonly reportsService: ReportsService,) {}

  @Roles(UserRole.ADMIN, UserRole.EMPLOYEE,)
  @Get('daily')
  getDailyReport() {
    return this.reportsService.getDailyReport();
  }

  @Roles(UserRole.ADMIN)
  @Get('monthly')
  getMonthlyReport() {
    return this.reportsService.getMonthlyReport();
  }
}