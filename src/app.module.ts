import { Module } from '@nestjs/common';

import { SalesModule } from './sales/sales.module.js';
import { ReportsModule } from './reports/reports.module';

@Module({
  imports: [SalesModule, ReportsModule],
})
export class AppModule {}