import { Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import request from 'supertest';

import { AppModule } from '../src/app.module';

describe('Swagger (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleRef.createNestApplication();

    const config = new DocumentBuilder()
      .setTitle('Restaurant Sales API')
      .setDescription('API para gestión de ventas y reportes')
      .setVersion('1.0')
      .addBearerAuth()
      .build();

    SwaggerModule.setup(
      'api',
      app,
      SwaggerModule.createDocument(app, config),
    );

    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('GET /api debe servir la UI de Swagger', async () => {
    const res = await request(app.getHttpServer())
      .get('/api')
      .expect(200);

    expect(res.text).toContain('swagger-ui');
  });

  it('GET /api-json debe exponer la spec con todos los módulos y Bearer Auth', async () => {
    const res = await request(app.getHttpServer())
      .get('/api-json')
      .expect(200);

    const spec = res.body;

    expect(spec.info.title).toBe('Restaurant Sales API');
    expect(spec.paths).toHaveProperty('/auth/login');
    expect(spec.paths).toHaveProperty('/auth/refresh');
    expect(spec.paths).toHaveProperty('/sales');
    expect(spec.paths).toHaveProperty('/products');
    expect(spec.paths).toHaveProperty('/users/profile');
    expect(spec.paths).toHaveProperty('/reports/dashboard');
    expect(spec.components.securitySchemes.bearer.type).toBe('http');
  });
});