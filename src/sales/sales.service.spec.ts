import { Test, TestingModule } from '@nestjs/testing';
import { SalesService } from './sales.service';
import { NotFoundException } from '@nestjs/common';
import { db } from '../database/drizzle';
import { UserRole } from '../users/enums/user-role.enum';
import { PaymentMethod } from './enums/payment-method.enum';

jest.mock('../database/drizzle', () => ({
  db: {
    select: jest.fn(),
    insert: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  },
}));

describe('SalesService', () => {
  let service: SalesService;

  beforeEach(async () => {
    jest.clearAllMocks();

    const module: TestingModule = await Test.createTestingModule({
      providers: [SalesService],
    }).compile();

    service = module.get<SalesService>(SalesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('debería crear una instancia de SalesService', () => {
    expect(service).toBeInstanceOf(SalesService);
  });

 it('debería crear una venta', async () => {
  const createSaleDto = {
    totalAmount: 2500,
    paymentMethod: PaymentMethod.CASH,
  };

  const saleMock = {
    id: 1,
    totalAmount: 2500,
    paymentMethod: PaymentMethod.CASH,
    createdAt: new Date(),
  };

  (db.insert as jest.Mock).mockReturnValue({
    values: () => ({
      returning: async () => [saleMock],
    }),
  });

  const result = await service.create(createSaleDto);

  expect(result).toEqual(saleMock);
});
 it('debería devolver todas las ventas', async () => {
  const salesMock = [
    {
      id: 1,
      totalAmount: 1000,
      paymentMethod: PaymentMethod.CASH,
      createdAt: new Date(),
    },
    {
      id: 2,
      totalAmount: 2000,
      paymentMethod: PaymentMethod.CREDIT_CARD,
      createdAt: new Date(),
    },
  ];

  (db.select as jest.Mock).mockReturnValue({
    from: () => ({
      orderBy: () => ({
        limit: () => ({
          offset: async () => salesMock,
        }),
      }),
    }),
  });

  const user = {
    id: 1,
    role: UserRole.ADMIN,
    email: 'admin@test.com',
  };

  const result = await service.findAll({}, user);

  expect(result).toEqual(salesMock);
});
  it('debería devolver una venta existente', async () => {
    const saleMock = {
      id: 1,
      totalAmount: 1500,
      paymentMethod: PaymentMethod.CASH,
      createdAt: new Date(),
    };

    (db.select as jest.Mock).mockReturnValue({
      from: () => ({
        where: async () => [saleMock],
      }),
    });

    const user = {
      id: 1,
      role: UserRole.ADMIN,
      email: 'admin@test.com',
    };

    const result = await service.findOne(1, user);

    expect(result).toEqual(saleMock);
  });
  it('debería lanzar NotFoundException si no existe', async () => {
    (db.select as jest.Mock).mockReturnValue({
      from: () => ({
        where: async () => [],
      }),
    });

    const user = {
      id: 1,
      role: UserRole.ADMIN,
      email: 'admin@test.com',
    };

    await expect(
      service.findOne(999, user),
    ).rejects.toThrow(NotFoundException);
  });

  it('debería actualizar una venta', async () => {
  const existingSale = {
    id: 1,
    totalAmount: 1000,
    paymentMethod: PaymentMethod.CASH,
    createdAt: new Date(),
  };

  const updatedSale = {
    id: 1,
    totalAmount: 2000,
    paymentMethod: PaymentMethod.CREDIT_CARD,
    createdAt: existingSale.createdAt,
  };

  (db.select as jest.Mock).mockReturnValue({
    from: () => ({
      where: async () => [existingSale],
    }),
  });

  (db.update as jest.Mock).mockReturnValue({
    set: () => ({
      where: () => ({
        returning: async () => [updatedSale],
      }),
    }),
  });

  const user = {
    id: 1,
    role: UserRole.ADMIN,
    email: 'admin@test.com',
  };

  const result = await service.update(
    1,
    {
      totalAmount: 2000,
      paymentMethod: PaymentMethod.CREDIT_CARD,
    },
    user,
  );

  expect(result).toEqual(updatedSale);
});
  it('debería eliminar una venta', async () => {
  const saleMock = {
    id: 1,
    totalAmount: 1000,
    paymentMethod: PaymentMethod.CASH,
    createdAt: new Date(),
  };

  (db.select as jest.Mock).mockReturnValue({
    from: () => ({
      where: async () => [saleMock],
    }),
  });

  (db.delete as jest.Mock).mockReturnValue({
    where: () => ({
      returning: async () => [saleMock],
    }),
  });

  const user = {
    id: 1,
    role: UserRole.ADMIN,
    email: 'admin@test.com',
  };

  const result = await service.remove(1, user);

  expect(result).toEqual(saleMock);
});
});