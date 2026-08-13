import { Controller, Get } from '@nestjs/common';
import { ReportsService } from './reports.service.js';

@Controller('reports')
export class ReportsController {
  constructor(
    private readonly reportsService: ReportsService,
  ) {}

  @Get('daily')
  getDailyReport() {
    return this.reportsService.getDailyReport();
  }

  @Get('monthly')
  getMonthlyReport() {
    return this.reportsService.getMonthlyReport();
  }
}