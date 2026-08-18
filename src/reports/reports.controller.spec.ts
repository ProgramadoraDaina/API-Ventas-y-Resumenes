import { Test, TestingModule } from '@nestjs/testing';

import { ReportsController } from './reports.controller';
import { ReportsService } from './reports.service';

describe('ReportsController', () => {
  let controller: ReportsController;

  const mockReportsService = {
    getDailyReport: jest.fn(),
    getMonthlyReport: jest.fn(),
    getDashboard: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule =
      await Test.createTestingModule({
        controllers: [ReportsController],
        providers: [
          {
            provide: ReportsService,
            useValue: mockReportsService,
          },
        ],
      }).compile();

    controller =
      module.get<ReportsController>(
        ReportsController,
      );

    jest.clearAllMocks();
  });

  it('debe estar definido', () => {
    expect(controller).toBeDefined();
  });

  it('debe obtener el reporte diario', async () => {
    const report = [
      {
        id: 1,
        totalAmount: 15000,
      },
    ];

    mockReportsService
      .getDailyReport
      .mockResolvedValue(report);

    const result =
      await controller.getDailyReport();

    expect(
      mockReportsService.getDailyReport,
    ).toHaveBeenCalled();

    expect(result).toEqual(report);
  });

  it('debe obtener el reporte mensual', async () => {
    const report = [
      {
        date: '2026-08-01',
        totalAmount: 50000,
      },
    ];

    mockReportsService
      .getMonthlyReport
      .mockResolvedValue(report);

    const result =
      await controller.getMonthlyReport();

    expect(
      mockReportsService.getMonthlyReport,
    ).toHaveBeenCalled();

    expect(result).toEqual(report);
  });

  it('debe obtener el dashboard', async () => {
    const dashboard = {
      todaySales: 10,
      todayTotal: 100000,
      monthSales: 200,
      monthTotal: 2500000,
    };

    mockReportsService
      .getDashboard
      .mockResolvedValue(dashboard);

    const result =
      await controller.getDashboard();

    expect(
      mockReportsService.getDashboard,
    ).toHaveBeenCalled();

    expect(result).toEqual(dashboard);
  });
});