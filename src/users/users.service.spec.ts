import { Test, TestingModule } from '@nestjs/testing';
import { BadRequestException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { UserRole } from './enums/user-role.enum';
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
    it('debe crear un usuario correctamente', async () => {
        jest
            .spyOn(service, 'findByEmail')
            .mockResolvedValue(
                undefined as unknown as Awaited<
                    ReturnType<UsersService['findByEmail']>
                >,
            );

        (bcrypt.hash as jest.Mock)
            .mockResolvedValue('hashedPassword');

        const mockUser = {
            id: 1,
            name: 'Juan',
            email: 'juan@test.com',
            role: UserRole.EMPLOYEE,
        };

        jest
            .spyOn(require('../database/drizzle').db, 'insert')
            .mockReturnValue({
                values: () => ({
                    returning: async () => [mockUser],
                }),
            } as any);

        const result = await service.create({
            name: 'Juan',
            email: 'juan@test.com',
            role: UserRole.EMPLOYEE,
        });

        expect(result).toEqual({
            id: 1,
            name: 'Juan',
            email: 'juan@test.com',
            role: UserRole.EMPLOYEE,
            temporaryPassword: 'juan123',
        });
    });
    it('debe lanzar excepción si el email ya existe', async () => {
        jest
            .spyOn(service, 'findByEmail')
            .mockResolvedValue({
                id: 1,
                email: 'juan@test.com',
            } as any);

        await expect(
            service.create({
                name: 'Juan',
                email: 'juan@test.com',
                role: UserRole.EMPLOYEE,
            }),
        ).rejects.toThrow(
            BadRequestException,
        );
    });
    it('debe devolver un usuario por email', async () => {
        const user = {
            id: 1,
            email: 'juan@test.com',
        };

        jest
            .spyOn(require('../database/drizzle').db, 'select')
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
    it('debe cambiar la contraseña correctamente', async () => {
  const user = {
    id: 1,
    password: 'hashedPassword',
  };

  jest
    .spyOn(require('../database/drizzle').db, 'select')
    .mockReturnValue({
      from: () => ({
        where: async () => [user],
      }),
    } as any);

  (bcrypt.compare as jest.Mock)
    .mockResolvedValue(true);

  (bcrypt.hash as jest.Mock)
    .mockResolvedValue('newHashedPassword');

  jest
    .spyOn(require('../database/drizzle').db, 'update')
    .mockReturnValue({
      set: () => ({
        where: async () => {},
      }),
    } as any);

  const result = await service.changePassword(
    1,
    'passwordActual',
    'passwordNueva',
  );

  expect(result).toEqual({
    message: 'Contraseña actualizada correctamente',
  });
});
it('debe lanzar excepción si la contraseña actual es incorrecta', async () => {
  const user = {
    id: 1,
    password: 'hashedPassword',
  };

  jest
    .spyOn(require('../database/drizzle').db, 'select')
    .mockReturnValue({
      from: () => ({
        where: async () => [user],
      }),
    } as any);

  (bcrypt.compare as jest.Mock)
    .mockResolvedValue(false);

  await expect(
    service.changePassword(
      1,
      'passwordIncorrecta',
      'passwordNueva',
    ),
  ).rejects.toThrow(
    BadRequestException,
  );
});
it('debe devolver undefined si el usuario no existe', async () => {
  jest
    .spyOn(require('../database/drizzle').db, 'select')
    .mockReturnValue({
      from: () => ({
        where: async () => [],
      }),
    } as any);

  const result = await service.findByEmail(
    'noexiste@test.com',
  );

  expect(result).toBeUndefined();
});
});