import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';

jest.mock('bcrypt', () => ({
    hash: jest.fn(),
    compare: jest.fn(),
}));

describe('UsersService', () => {
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule =
      await Test.createTestingModule({
        providers: [UsersService],
      }).compile();

    service = module.get<UsersService>(
      UsersService,
    );
  });

  it('debe estar definido', () => {
    expect(service).toBeDefined();
  });

  it('debe devolver un usuario por email', async () => {
    const user = {
      id: 1,
      email: 'juan@test.com',
    };

    jest
      .spyOn(
        require('../database/drizzle').db,
        'select',
      )
      .mockReturnValue({
        from: () => ({
          where: async () => [user],
        }),
      } as any);

    const result =
      await service.findByEmail(
        'juan@test.com',
      );

    expect(result).toEqual(user);
  });

  it('debe devolver undefined si el usuario no existe', async () => {
    jest
      .spyOn(
        require('../database/drizzle').db,
        'select',
      )
      .mockReturnValue({
        from: () => ({
          where: async () => [],
        }),
      } as any);

    const result =
      await service.findByEmail(
        'noexiste@test.com',
      );

    expect(result).toBeUndefined();
  });
});
