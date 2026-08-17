import { Injectable, UnauthorizedException, } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { LoginDto } from './dto/login.dto';


@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService,
              private readonly jwtService: JwtService,) {}

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
    const passwordMatch = await bcrypt.compare(
      loginDto.password,
      user.password,);

    if (!passwordMatch) {
      throw new UnauthorizedException(
        'Credenciales inválidas',
      );
    }

    const payload = {
      sub: user.id,
      email: user.email,
      role: user.role,
    };

    return {/*convierte al payload en un token jwt y lo retorna*/
      access_token: await this.jwtService.signAsync(payload),
      mustChangePassword: user.mustChangePassword,
    };
  }
}
