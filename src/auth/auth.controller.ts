import { Body, Req, Controller, Post, } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags, } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard, } from './guards/jwt-auth.guard';
import { Throttle } from '@nestjs/throttler';
import { RegisterDto } from './dto/register.dto';
import { RefreshTokenGuard } from './guards/refresh-token.guard';
import { RefreshTokenDto } from './dto/refresh-token.dto';
@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
  ) { }

  @Post('register')
  @ApiOperation({
    summary: 'Registrar usuario',
  })
  @ApiResponse({
    status: 201,
    description: 'Usuario registrado correctamente',
  })
  @ApiResponse({
    status: 400,
    description: 'Ya existe un usuario con ese email',
  })
  register(
    @Body() registerDto: RegisterDto,
  ) {
    return this.authService.register(
      registerDto,
    );
  }

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
  @UseGuards(RefreshTokenGuard)
  refresh(@Body() dto: RefreshTokenDto, @Req() req,) {
    return this.authService.refresh(
      req.user.sub,
      req.refreshToken,
    );
  }
}