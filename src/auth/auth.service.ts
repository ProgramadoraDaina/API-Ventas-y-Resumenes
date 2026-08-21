import * as bcrypt from 'bcrypt';
import { JwtService, JwtSignOptions, } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { LoginDto } from './dto/login.dto';
import { BadRequestException, ForbiddenException, Injectable, UnauthorizedException, } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { createHash } from 'node:crypto';
import { RegisterDto } from './dto/register.dto';
import { db } from '../database/drizzle';
import { users } from '../database/schema';

@Injectable()
export class AuthService {
  private readonly SALT_ROUNDS = 10;

  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,) { }

  async register(registerDto: RegisterDto) {
    
    const _existingUser =
      await this.usersService.findByEmail(
        registerDto.email,
      );

    if (_existingUser) {
      throw new BadRequestException(
        'Ya existe un usuario con ese email',
      );
    }

    const _hashedPassword = await bcrypt.hash(
      registerDto.password,
      10,
    );

    const [user] = await db
      .insert(users)
      .values({
        name: registerDto.name,
        email: registerDto.email,
        password: _hashedPassword,
        role: 'customer',
      })
      .returning();

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    };
  }

  async login(loginDto: LoginDto) {

    const user = await this.usersService.findByEmail(
      loginDto.email,
    );

    if (!user) {
      throw new UnauthorizedException(
        'Credenciales inválidas',
      );
    }

    /*verifica que la contraseña sea correcta comparando ambos resultados hasheados*/
    const _passwordMatch = await bcrypt.compare(
      loginDto.password,
      user.password,);
   
    if (!_passwordMatch) {
      throw new UnauthorizedException(
        'Credenciales inválidas',
      );
    }

    const tokens = await this.generarTokens(
      user.id,
      user.email,
      user.role,
    );

    return tokens;
  }
  private async generarTokens(
    userId: number,
    email: string,
    role: string,
  ) {
    const payload = {
      sub: userId,
      email,
      role,
    };

    const [access_token, refresh_token] =
      await Promise.all([
        this.jwtService.signAsync(payload, {
          secret:
            this.configService.get<string>(
              'JWT_SECRET',
            ),
          expiresIn: this.expiresIn(
            'JWT_EXPIRES_IN',
          ),
        }),

        this.jwtService.signAsync(payload, {
          secret:
            this.configService.get<string>(
              'JWT_REFRESH_SECRET',
            ),
          expiresIn: this.expiresIn(
            'JWT_REFRESH_EXPIRES_IN',
          ),
        }),
      ]);

    const hashedRefreshToken =
      await bcrypt.hash(
        this.resumir(refresh_token),
        this.SALT_ROUNDS,
      );

    await this.usersService.updateRefreshToken(
      userId,
      hashedRefreshToken,
    );

    return {
      access_token,
      refresh_token,
    };
  }
  private resumir(token: string): string {
    return createHash('sha256')
      .update(token)
      .digest('hex');
  }
  private expiresIn(
    key:
      | 'JWT_EXPIRES_IN'
      | 'JWT_REFRESH_EXPIRES_IN',
  ) {
    return this.configService.get<string>(
      key,
    ) as JwtSignOptions['expiresIn'];
  }
  async refresh(
    userId: number,
    refreshToken: string,
  ) {
    const user =
      await this.usersService.findByIdWithRefreshToken(
        userId,
      );

    if (!user?.hashedRefreshToken) {
      throw new ForbiddenException(
        'Acceso denegado',
      );
    }

    const coincide =
      await bcrypt.compare(
        this.resumir(refreshToken),
        user.hashedRefreshToken,
      );

    if (!coincide) {
      await this.usersService.updateRefreshToken(
        userId,
        null,
      );

      throw new ForbiddenException(
        'Acceso denegado',
      );
    }

    return this.generarTokens(
      user.id,
      user.email,
      user.role,
    );
  }
  async logout(userId: number) {
    await this.usersService.updateRefreshToken(
      userId,
      null,
    );
  }
}
