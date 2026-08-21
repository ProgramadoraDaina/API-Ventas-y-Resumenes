import { Test, TestingModule } from '@nestjs/testing';
import { ProductsService } from './products.service';
import { NotFoundException } from '@nestjs/common';
import { db } from '../database/drizzle';

jest.mock('../database/drizzle', () => ({
  db: {
    select: jest.fn(),
    insert: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  },
}));

describe('ProductsService', () => {
  let service: ProductsService;

  beforeEach(async () => {
    jest.clearAllMocks();

    const module: TestingModule = await Test.createTestingModule({
      providers: [ProductsService],
    }).compile();

    service = module.get<ProductsService>(ProductsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('debería devolver todos los productos', async () => {
    const productsMock = [
      { id: '1', name: 'Lomo Saltado', price: 1250, stock: 5 },
      { id: '2', name: 'Ensalada', price: 800, stock: 10 },
    ];

    (db.select as jest.Mock).mockReturnValue({
      from: async () => productsMock,
    });

    const result = await service.findAll();
    expect(result).toEqual(productsMock);
  });

  it('debería crear un producto', async () => {
    const productMock = { id: '1', name: 'Lomo Saltado', price: 1250, stock: 5 };
    const dto = { name: 'Lomo Saltado', price: 1250, stock: 5 };

    (db.insert as jest.Mock).mockReturnValue({
      values: () => ({
        returning: async () => [productMock],
      }),
    });

    const result = await service.create(dto);
    expect(result).toEqual(productMock);
  });

  it('debería devolver un producto existente', async () => {
    const productMock = { id: '1', name: 'Lomo Saltado', price: 1250, stock: 5 };

    (db.select as jest.Mock).mockReturnValue({
      from: () => ({
        where: async () => [productMock],
      }),
    });

    const result = await service.findOne('1');
    expect(result).toEqual(productMock);
  });

  it('debería lanzar NotFoundException si no existe', async () => {
    (db.select as jest.Mock).mockReturnValue({
      from: () => ({
        where: async () => [],
      }),
    });

    await expect(service.findOne('999')).rejects.toThrow(NotFoundException);
  });

  it('debería actualizar un producto', async () => {
    const existing = { id: '1', name: 'Lomo Saltado', price: 1250, stock: 5 };
    const updated = { id: '1', name: 'Lomo Saltado', price: 1300, stock: 4 };

    (db.select as jest.Mock).mockReturnValue({
      from: () => ({
        where: async () => [existing],
      }),
    });

    (db.update as jest.Mock).mockReturnValue({
      set: () => ({
        where: () => ({
          returning: async () => [updated],
        }),
      }),
    });

    const result = await service.update('1', { price: 1300, stock: 4 });
    expect(result).toEqual(updated);
  });

  it('debería eliminar un producto', async () => {
    const productMock = { id: '1', name: 'Lomo Saltado', price: 1250, stock: 5 };

    (db.select as jest.Mock).mockReturnValue({
      from: () => ({
        where: async () => [productMock],
      }),
    });

    (db.delete as jest.Mock).mockReturnValue({
      where: () => ({
        returning: async () => [productMock],
      }),
    });

    const result = await service.remove('1');
    expect(result).toEqual(productMock);
  });
});