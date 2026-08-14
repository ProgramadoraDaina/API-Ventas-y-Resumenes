import { Module } from '@nestjs/common';

import { SalesModule } from './sales/sales.module.js';
import { ReportsModule } from './reports/reports.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [SalesModule, ReportsModule, UsersModule],
})
export class AppModule {}