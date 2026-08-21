import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from './strategies/jwt.strategy';
import { UsersModule } from '../users/users.module';
import { RefreshTokenGuard } from './guards/refresh-token.guard';
@Module({
  imports: [UsersModule,
            JwtModule.register({}),],
  controllers: [AuthController],
  providers: [AuthService,
              JwtStrategy,
              RefreshTokenGuard,],
})
export class AuthModule {}