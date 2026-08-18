import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from '../src/app.module';

describe('Sales (e2e)', () => {
  let app: INestApplication;
  let token: string;

  beforeAll(async () => {
    const moduleFixture: TestingModule =
      await Test.createTestingModule({
        imports: [AppModule],
      }).compile();

    app = moduleFixture.createNestApplication();

    await app.init();

    const loginResponse = await request(
      app.getHttpServer(),
    )
      .post('/auth/login')
      .send({
        email: 'admin@restaurant.com',
        password: 'admin123',
      });

    token =
      loginResponse.body.access_token;
  });

  afterAll(async () => {
    await app.close();
  });

  it('/sales (GET)', async () => {
    const response = await request(
      app.getHttpServer(),
    )
      .get('/sales')
      .set(
        'Authorization',
        `Bearer ${token}`,
      );

    expect(response.status).toBe(200);
  });

  it('/reports/dashboard (GET)', async () => {
    const response = await request(
      app.getHttpServer(),
    )
      .get('/reports/dashboard')
      .set(
        'Authorization',
        `Bearer ${token}`,
      );

    expect(response.status).toBe(200);

    expect(response.body).toHaveProperty(
      'todaySales',
    );

    expect(response.body).toHaveProperty(
      'todayTotal',
    );

    expect(response.body).toHaveProperty(
      'monthSales',
    );

    expect(response.body).toHaveProperty(
      'monthTotal',
    );
  });
});