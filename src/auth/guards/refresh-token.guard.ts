import { CanActivate, ExecutionContext, ForbiddenException, Injectable,} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class RefreshTokenGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  canActivate(context: ExecutionContext): boolean {
    const request =
      context.switchToHttp().getRequest();

    const refreshToken =
      request.body?.refreshToken;

    if (!refreshToken) {
      throw new ForbiddenException(
        'Refresh token requerido',
      );
    }

    try {
      const payload = this.jwtService.verify(
        refreshToken,
        {
          secret:
            this.configService.get<string>(
              'JWT_REFRESH_SECRET',
            ),
        },
      );

      request.user = payload;
      request.refreshToken = refreshToken;

      return true;
    } catch {
      throw new ForbiddenException(
        'Refresh token inválido o expirado',
      );
    }
  }
}