import { Test, TestingModule } from '@nestjs/testing';
import { UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { ConfigService } from '@nestjs/config';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';

jest.mock('bcrypt', () => ({
  compare: jest.fn(),
  hash: jest.fn(),
}));

describe('AuthService', () => {
  let service: AuthService;

  const mockUsersService = {
  findByEmail: jest.fn(),
  updateRefreshToken: jest.fn(),
  findByIdWithRefreshToken: jest.fn(),
};

const mockJwtService = {
  signAsync: jest.fn(),
};

const mockConfigService = {
  get: jest.fn((key: string) => {
    switch (key) {
      case 'JWT_SECRET':
        return 'access-secret';

      case 'JWT_REFRESH_SECRET':
        return 'refresh-secret';

      case 'JWT_EXPIRES_IN':
        return '15m';

      case 'JWT_REFRESH_EXPIRES_IN':
        return '7d';

      default:
        return undefined;
    }
  }),
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
          {
            provide: ConfigService,
            useValue: mockConfigService,
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

  (bcrypt.hash as jest.Mock)
    .mockResolvedValue('hashed-refresh');

  mockJwtService.signAsync
    .mockResolvedValueOnce('access-token')
    .mockResolvedValueOnce('refresh-token');

  const result = await service.login({
  email: 'juan@test.com',
  password: '123456',
});

expect(
  mockJwtService.signAsync,
).toHaveBeenCalledTimes(2);

expect(
  mockUsersService.updateRefreshToken,
).toHaveBeenCalledWith(
  1,
  'hashed-refresh',
);

expect(result).toEqual({
  access_token: 'access-token',
  refresh_token: 'refresh-token',
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

