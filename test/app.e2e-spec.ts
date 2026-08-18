import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from '../src/app.module';

describe('Auth (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule =
      await Test.createTestingModule({
        imports: [AppModule],
      }).compile();

    app = moduleFixture.createNestApplication();

    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('/auth/login (POST) debe iniciar sesión', async () => {
    const response = await request(
      app.getHttpServer(),
    )
      .post('/auth/login')
      .send({
        email: 'admin@restaurant.com',
        password: 'admin123',
      });

    expect(response.status).toBe(201);

    expect(response.body).toHaveProperty(
      'access_token',
    );

    expect(response.body).toHaveProperty(
      'mustChangePassword',
    );
  });

  it('/auth/login (POST) debe rechazar credenciales inválidas', async () => {
    await request(app.getHttpServer())
      .post('/auth/login')
      .send({
        email: 'noexiste@test.com',
        password: '123456',
      })
      .expect(401);
  });
});