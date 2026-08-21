import { Test, TestingModule } from '@nestjs/testing';

import { SalesController } from './sales.controller';
import { SalesService } from './sales.service';

import { PaymentMethod } from './enums/payment-method.enum';

describe('SalesController', () => {
  let controller: SalesController;

  const mockSalesService = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule =
      await Test.createTestingModule({
        controllers: [SalesController],
        providers: [
          {
            provide: SalesService,
            useValue: mockSalesService,
          },
        ],
      }).compile();

    controller =
      module.get<SalesController>(
        SalesController,
      );

    jest.clearAllMocks();
  });

  it('debe estar definido', () => {
    expect(controller).toBeDefined();
  });

  it('debe crear una venta', async () => {
    const dto = {
      totalAmount: 15000,
      paymentMethod: PaymentMethod.CASH,
    };

    const req = {
      user: {
        id: 1,
        role: 'admin',
      },
    };

    const expectedSale = {
      id: 1,
      ...dto,
    };

    mockSalesService.create.mockResolvedValue(
      expectedSale,
    );

    const result = await controller.create(
      dto,
      req as any,
    );

    expect(
      mockSalesService.create,
    ).toHaveBeenCalledWith(
      dto,
      req.user,
    );

    expect(result).toEqual(expectedSale);
  });

  it('debe obtener todas las ventas', async () => {
    const queryDto = {};

    const req = {
      user: {
        id: 1,
        role: 'admin',
      },
    };

    const sales = [
      {
        id: 1,
        totalAmount: 1000,
      },
    ];

    mockSalesService.findAll.mockResolvedValue(
      sales,
    );

    const result = await controller.findAll(
      queryDto,
      req as any,
    );

    expect(
      mockSalesService.findAll,
    ).toHaveBeenCalledWith(
      queryDto,
      req.user,
    );

    expect(result).toEqual(sales);
  });

  it('debe obtener una venta por id', async () => {
    const req = {
      user: {
        id: 1,
        role: 'admin',
      },
    };

    const sale = {
      id: 1,
      totalAmount: 15000,
    };

    mockSalesService.findOne.mockResolvedValue(
      sale,
    );

    const result = await controller.findOne(
      1,
      req as any,
    );

    expect(
      mockSalesService.findOne,
    ).toHaveBeenCalledWith(
      1,
      req.user,
    );

    expect(result).toEqual(sale);
  });

  it('debe actualizar una venta', async () => {
    const req = {
      user: {
        id: 1,
        role: 'admin',
      },
    };

    const dto = {
      totalAmount: 25000,
    };

    const updatedSale = {
      id: 1,
      totalAmount: 25000,
    };

    mockSalesService.update.mockResolvedValue(
      updatedSale,
    );

    const result = await controller.update(
      1,
      dto,
      req as any,
    );

    expect(
      mockSalesService.update,
    ).toHaveBeenCalledWith(
      1,
      dto,
      req.user,
    );

    expect(result).toEqual(updatedSale);
  });

  it('debe eliminar una venta', async () => {
    const req = {
      user: {
        id: 1,
        role: 'admin',
      },
    };

    const deletedSale = {
      id: 1,
      totalAmount: 15000,
    };

    mockSalesService.remove.mockResolvedValue(
      deletedSale,
    );

    const result = await controller.remove(
      1,
      req as any,
    );

    expect(
      mockSalesService.remove,
    ).toHaveBeenCalledWith(
      1,
      req.user,
    );

    expect(result).toEqual(deletedSale);
  });
});