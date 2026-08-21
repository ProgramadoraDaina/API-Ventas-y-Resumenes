import { Test, TestingModule } from '@nestjs/testing';
import { UserRole } from './enums/user-role.enum';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

describe('UsersController', () => {
  let controller: UsersController;

  const mockUsersService = {};

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

  });