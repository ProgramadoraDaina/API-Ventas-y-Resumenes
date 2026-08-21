import { Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';

import { AppModule } from '../src/app.module';

describe('Rate Limiting', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleRef.createNestApplication();

    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('debería bloquear el login luego de 5 intentos', async () => {
    for (let i = 0; i < 5; i++) {
      await request(app.getHttpServer())
        .post('/auth/login')
        .send({
          email: 'fake@test.com',
          password: '123456',
        });
    }

    const response = await request(
      app.getHttpServer(),
    )
      .post('/auth/login')
      .send({
        email: 'fake@test.com',
        password: '123456',
      });

    expect(response.status).toBe(429);
  });
});