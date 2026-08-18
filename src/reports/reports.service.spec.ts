import { Test, TestingModule } from '@nestjs/testing';
import { ReportsService } from './reports.service';

describe('ReportsService', () => {
  let service: ReportsService;

  beforeEach(async () => {
    const module: TestingModule =
      await Test.createTestingModule({
        providers: [ReportsService],
      }).compile();

    service = module.get<ReportsService>(
      ReportsService,
    );
  });

  it('debe estar definido', () => {
    expect(service).toBeDefined();
  });
  it('debe obtener el reporte diario', async () => {
  const mockSales = [
    {
      id: 1,
      totalAmount: 1000,
    },
    {
      id: 2,
      totalAmount: 2000,
    },
  ];

  jest
    .spyOn(
      require('../database/drizzle').db,
      'select',
    )
    .mockReturnValue({
      from: () => ({
        where: async () => mockSales,
      }),
    } as any);

  const result =
    await service.getDailyReport();

  expect(result).toEqual(mockSales);
});
it('debe obtener el reporte mensual', async () => {
  const report = [
    {
      date: '2026-08-01',
      totalAmount: 5000,
    },
  ];

  jest
    .spyOn(
      require('../database/drizzle').db,
      'select',
    )
    .mockReturnValue({
      from: () => ({
        where: () => ({
          groupBy: () => ({
            orderBy: async () => report,
          }),
        }),
      }),
    } as any);

  const result =
    await service.getMonthlyReport();

  expect(result).toEqual(report);
});
it('debe obtener el reporte mensual', async () => {
  const report = [
    {
      date: '2026-08-01',
      totalAmount: 5000,
    },
  ];

  jest
    .spyOn(
      require('../database/drizzle').db,
      'select',
    )
    .mockReturnValue({
      from: () => ({
        where: () => ({
          groupBy: () => ({
            orderBy: async () => report,
          }),
        }),
      }),
    } as any);

  const result =
    await service.getMonthlyReport();

  expect(result).toEqual(report);
});
it('debe obtener las métricas del dashboard', async () => {
  const selectSpy = jest.spyOn(
    require('../database/drizzle').db,
    'select',
  );

  selectSpy
    .mockReturnValueOnce({
      from: () => ({
        where: async () => [
          {
            todaySales: 5,
            todayTotal: 10000,
          },
        ],
      }),
    } as any)
    .mockReturnValueOnce({
      from: () => ({
        where: async () => [
          {
            monthSales: 100,
            monthTotal: 250000,
          },
        ],
      }),
    } as any);

  const result =
    await service.getDashboard();

  expect(result).toEqual({
    todaySales: 5,
    todayTotal: 10000,
    monthSales: 100,
    monthTotal: 250000,
  });
});
});