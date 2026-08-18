import { Test, TestingModule } from '@nestjs/testing';
import { UserRole } from './enums/user-role.enum';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

describe('UsersController', () => {
  let controller: UsersController;

  const mockUsersService = {
    create: jest.fn(),
    changePassword: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule =
      await Test.createTestingModule({
        controllers: [UsersController],
        providers: [
          {
            provide: UsersService,
            useValue: mockUsersService,
          },
        ],
      }).compile();

    controller = module.get<UsersController>(
      UsersController,
    );

    jest.clearAllMocks();
  });

  it('debe estar definido', () => {
    expect(controller).toBeDefined();
  });

  it('debe crear un usuario', async () => {
    const dto = {
      name: 'Juan Pérez',
      email: 'juan@test.com',
      role: UserRole.EMPLOYEE,
    };

    const expectedResult = {
      id: 1,
      ...dto,
      temporaryPassword: 'juan123',
    };

    mockUsersService.create.mockResolvedValue(
      expectedResult,
    );

    const result = await controller.create(dto);

    expect(
      mockUsersService.create,
    ).toHaveBeenCalledWith(dto);

    expect(result).toEqual(expectedResult);
  });

  it('debe obtener el perfil del usuario autenticado', () => {
    const req = {
      user: {
        id: 1,
        email: 'juan@test.com',
        role: UserRole.EMPLOYEE
      },
    };

    const result = controller.getProfile(req);

    expect(result).toEqual(req.user);
  });

  it('debe cambiar la contraseña', async () => {
    const req = {
      user: {
        id: 1,
      },
    };

    const dto = {
      currentPassword: 'admin123',
      newPassword: 'Nueva123',
    };

    const expectedResult = {
      message: 'Contraseña actualizada correctamente',
    };

    mockUsersService.changePassword.mockResolvedValue(
      expectedResult,
    );

    const result = await controller.changePassword(
      req,
      dto,
    );

    expect(
      mockUsersService.changePassword,
    ).toHaveBeenCalledWith(
      1,
      dto.currentPassword,
      dto.newPassword,
    );

    expect(result).toEqual(expectedResult);
  });
});