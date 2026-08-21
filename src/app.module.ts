import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SalesModule } from './sales/sales.module';
import { ReportsModule } from './reports/reports.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    SalesModule,
    ReportsModule,
    UsersModule,
    AuthModule,
  ],
})
export class AppModule {}
