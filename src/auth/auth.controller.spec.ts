import { Test, TestingModule } from '@nestjs/testing';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

describe('AuthController', () => {
  let controller: AuthController;

  const mockAuthService = {
    login: jest.fn(),
    refresh: jest.fn(),
    logout: jest.fn(),
  };
  const mockJwtService = {
    verify: jest.fn(),
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
        controllers: [AuthController],
        providers: [
          {
            provide: AuthService,
            useValue: mockAuthService,
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

    controller = module.get<AuthController>(
      AuthController,
    );

    jest.clearAllMocks();
  });

  it('debe estar definido', () => {
    expect(controller).toBeDefined();
  });

  it('debe llamar al servicio login', async () => {
  const dto = {
    email: 'admin@test.com',
    password: '123456',
  };

  mockAuthService.login.mockResolvedValue({
    access_token: 'token',
    refresh_token: 'refresh-token',
    mustChangePassword: true,
  });

  const result = await controller.login(dto);

  expect(
    mockAuthService.login,
  ).toHaveBeenCalledWith(dto);

  expect(result).toEqual({
    access_token: 'token',
    refresh_token: 'refresh-token',
    mustChangePassword: true,
  });
});
  it('debe refrescar tokens', () => {
    mockConfigService.get.mockReturnValue(
      'refresh-secret',
    );

    mockJwtService.verify.mockReturnValue({
      sub: 1,
    });

    mockAuthService.refresh.mockResolvedValue({
      access_token: 'nuevo-access',
      refresh_token: 'nuevo-refresh',
    });

    return expect(
      controller.refresh({
        refreshToken: 'token',
      }),
    ).resolves.toEqual({
      access_token: 'nuevo-access',
      refresh_token: 'nuevo-refresh',
    });
  });
  it('debe cerrar sesión', async () => {
    mockAuthService.logout.mockResolvedValue(
      undefined,
    );

    const req = {
      user: {
        id: 1,
      },
    };

    await controller.logout(req);

    expect(
      mockAuthService.logout,
    ).toHaveBeenCalledWith(1);
  });
});