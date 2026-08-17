import { Module } from '@nestjs/common';
import { SalesModule } from './sales/sales.module.js';
import { ReportsModule } from './reports/reports.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { AdminSeedService } from './seed/admin.seed';

@Module({
  imports: [
    SalesModule,
    ReportsModule,
    UsersModule,
    AuthModule,
  ],
  providers: [AdminSeedService],
})
export class AppModule {}