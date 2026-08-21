import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

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
    get: jest.fn(),
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

    controller =
      module.get<AuthController>(
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
  it('debe refrescar tokens', async () => {
    const req = {
      user: {
        sub: '550e8400-e29b-41d4-a716-446655440000',
      },
      refreshToken: 'token',
    };

    mockAuthService.refresh.mockResolvedValue({
      access_token: 'nuevo-access',
      refresh_token: 'nuevo-refresh',
    });

    const result = await controller.refresh(
      { refreshToken: 'token' } as any,
      req as any,
    );

    expect(
      mockAuthService.refresh,
    ).toHaveBeenCalledWith(
      req.user.sub,
      req.refreshToken,
    );

    expect(result).toEqual({
      access_token: 'nuevo-access',
      refresh_token: 'nuevo-refresh',
    });
  });
  it('debe cerrar sesión', async () => {
    mockAuthService.logout.mockResolvedValue(
      undefined,
    );

    const userId =
      '550e8400-e29b-41d4-a716-446655440000';

    const req = {
      user: {
        id: userId,
      },
    };

    await controller.logout(req);

    expect(
      mockAuthService.logout,
    ).toHaveBeenCalledWith(userId);
  });
});