import { Test, TestingModule } from '@nestjs/testing';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

describe('AuthController', () => {
  let controller: AuthController;

  const mockAuthService = {
    login: jest.fn(),
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
      mustChangePassword: true,
    });

    const result = await controller.login(dto);

    expect(
      mockAuthService.login,
    ).toHaveBeenCalledWith(dto);

    expect(result).toEqual({
      access_token: 'token',
      mustChangePassword: true,
    });
  });
});