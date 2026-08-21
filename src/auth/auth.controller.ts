import { Body, Req, Controller, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags, } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard, } from './guards/jwt-auth.guard';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { RefreshTokenDto } from './dto/refresh-token.dto';
import { Throttle } from '@nestjs/throttler';
@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,) { }

  @Post('login')
  @Throttle({
    default: {
      limit: 5,
      ttl: 60000,
    },
  })
  @ApiResponse({
    status: 429,
    description: 'Demasiadas solicitudes. Intente nuevamente más tarde.',
  })
  @ApiOperation({
    summary: 'Iniciar sesión',
  })
  @ApiResponse({
    status: 200,
    description: 'Inicio de sesión exitoso',
  })
  @ApiResponse({
    status: 401,
    description: 'Credenciales inválidas',
  })
  login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  @ApiBearerAuth()
  @Post('logout')
  @UseGuards(JwtAuthGuard)
  logout(@Req() req) {
    return this.authService.logout(
      req.user.id,
    );
  }

  @Post('refresh')
  @Throttle({
    default: {
      limit: 20,
      ttl: 60000,
    },
  })
  @ApiOperation({
    summary: 'Renovar access token',
  })
  @ApiResponse({
    status: 200,
    description: 'Tokens renovados correctamente',
  })
  @ApiResponse({
    status: 403,
    description: 'Refresh token inválido',
  })
  refresh(
    @Body() dto: RefreshTokenDto,) {
    const payload = this.jwtService.verify(
      dto.refreshToken,
      {
        secret:
          this.configService.get<string>(
            'JWT_REFRESH_SECRET',
          ),
      },
    );

    return this.authService.refresh(
      payload.sub,
      dto.refreshToken,
    );
  }
}