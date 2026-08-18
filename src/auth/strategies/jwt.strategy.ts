import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy,) {
  constructor() {
    super({ /*llama al constructor de la clase padre*/
      jwtFromRequest:
        ExtractJwt.fromAuthHeaderAsBearerToken(), /*Buscá el token JWT dentro del header Authorization y
                                                  extraélo solamente si viene con el formato Bearer TOKEN */
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET!, /*le asigno la firma*/
    });
  }

  async validate(payload: any) {
    return {
      id: payload.sub,
      email: payload.email,
      role: payload.role,
    };
  }
}