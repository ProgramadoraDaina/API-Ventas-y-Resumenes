import { Test, TestingModule } from '@nestjs/testing';
import { UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';

jest.mock('bcrypt', () => ({
  compare: jest.fn(),
}));

describe('AuthService', () => {
  let service: AuthService;

  const mockUsersService = {
    findByEmail: jest.fn(),
  };

  const mockJwtService = {
    signAsync: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule =
      await Test.createTestingModule({
        providers: [
          AuthService,
          {
            provide: UsersService,
            useValue: mockUsersService,
          },
          {
            provide: JwtService,
            useValue: mockJwtService,
          },
        ],
      }).compile();

    service = module.get<AuthService>(
      AuthService,
    );

    jest.clearAllMocks();
  });

  it('debe estar definido', () => {
    expect(service).toBeDefined();
  });
    it('debe iniciar sesión correctamente', async () => {
    const user = {
      id: 1,
      email: 'juan@test.com',
      password: 'hashedPassword',
      role: 'employee',
      mustChangePassword: true,
    };

    mockUsersService.findByEmail.mockResolvedValue(user);

    (bcrypt.compare as jest.Mock)
      .mockResolvedValue(true);

    mockJwtService.signAsync.mockResolvedValue(
      'jwt-token',
    );

    const result = await service.login({
      email: 'juan@test.com',
      password: '123456',
    });

    expect(result).toEqual({
      access_token: 'jwt-token',
      mustChangePassword: true,
    });
  });
    it('debe lanzar excepción si el usuario no existe', async () => {
    mockUsersService.findByEmail.mockResolvedValue(
      undefined,
    );

    await expect(
      service.login({
        email: 'noexiste@test.com',
        password: '123456',
      }),
    ).rejects.toThrow(
      UnauthorizedException,
    );
  });
    it('debe lanzar excepción si la contraseña es incorrecta', async () => {
    const user = {
      id: 1,
      email: 'juan@test.com',
      password: 'hashedPassword',
      role: 'employee',
      mustChangePassword: true,
    };

    mockUsersService.findByEmail.mockResolvedValue(user);

    (bcrypt.compare as jest.Mock)
      .mockResolvedValue(false);

    await expect(
      service.login({
        email: 'juan@test.com',
        password: 'incorrecta',
      }),
    ).rejects.toThrow(
      UnauthorizedException,
    );
  });
});
