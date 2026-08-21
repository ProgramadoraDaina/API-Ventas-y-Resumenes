import { ForbiddenException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { RefreshTokenGuard } from './refresh-token.guard';

type TestRequest = {
  body: {
    refreshToken?: string;
  };
  user?: unknown;
  refreshToken?: string;
};

describe('RefreshTokenGuard', () => {
  let guard: RefreshTokenGuard;

  const mockJwtService = {
    verify: jest.fn(),
  };

  const mockConfigService = {
    get: jest.fn().mockReturnValue(
      'refresh-secret',
    ),
  };

  beforeEach(() => {
    guard = new RefreshTokenGuard(
      mockJwtService as unknown as JwtService,
      mockConfigService as unknown as ConfigService,
    );

    jest.clearAllMocks();
  });

  it('debe estar definido', () => {
    expect(guard).toBeDefined();
  });

  it('debe lanzar excepción si no recibe refresh token', () => {
    const request: TestRequest = {
      body: {},
    };

    const context = {
      switchToHttp: () => ({
        getRequest: () => request,
      }),
    };

    expect(() =>
      guard.canActivate(
        context as never,
      ),
    ).toThrow(
      new ForbiddenException(
        'Refresh token requerido',
      ),
    );
  });

  it('debe aceptar un refresh token válido', () => {
    const payload = {
      sub: '550e8400-e29b-41d4-a716-446655440000',
      email: 'admin@test.com',
      role: 'admin',
    };

    mockJwtService.verify.mockReturnValue(
      payload,
    );

    const request: TestRequest = {
      body: {
        refreshToken: 'token-valido',
      },
    };

    const context = {
      switchToHttp: () => ({
        getRequest: () => request,
      }),
    };

    const result =
      guard.canActivate(
        context as never,
      );

    expect(result).toBe(true);

    expect(
      mockJwtService.verify,
    ).toHaveBeenCalledWith(
      'token-valido',
      {
        secret: 'refresh-secret',
      },
    );

    expect(request.user).toEqual(
      payload,
    );

    expect(request.refreshToken).toBe(
      'token-valido',
    );
  });

  it('debe lanzar excepción si el token es inválido', () => {
    mockJwtService.verify.mockImplementation(
      () => {
        throw new Error();
      },
    );

    const request: TestRequest = {
      body: {
        refreshToken:
          'token-invalido',
      },
    };

    const context = {
      switchToHttp: () => ({
        getRequest: () => request,
      }),
    };

    expect(() =>
      guard.canActivate(
        context as never,
      ),
    ).toThrow(
      new ForbiddenException(
        'Refresh token inválido o expirado',
      ),
    );
  });
});