# Restaurant Sales API

API desarrollada con NestJS, TypeScript, PostgreSQL y Drizzle ORM para gestionar ventas diarias y generar reportes de un restaurante.

## Objetivo del proyecto

El objetivo es construir una API REST que permita:

- Registrar ventas.
- Consultar ventas.
- Modificar ventas.
- Eliminar ventas.
- Obtener reportes diarios.
- Obtener reportes mensuales.

Actualmente el proyecto cuenta con CRUD completo de ventas, manejo de excepciones, módulo de reportes y documentación interactiva mediante Swagger/OpenAPI.

---

# Tecnologías utilizadas

## Backend

- NestJS
- TypeScript

## Base de datos

- PostgreSQL

## ORM

- Drizzle ORM
- Drizzle Kit

## Validación

- class-validator
- class-transformer

## Documentación

- Swagger/OpenAPI

---

# Estructura actual

```text
src/
│
├── database/
│   ├── drizzle.ts
│   └── schema.ts
│
├── reports/
│   ├── reports.controller.ts
│   ├── reports.module.ts
│   └── reports.service.ts
│
├── sales/
│   ├── dto/
│   │   ├── create-sale.dto.ts
│   │   └── update-sale.dto.ts
│   │
│   ├── enums/
│   │   └── payment-method.enum.ts
│   │
│   ├── sales.controller.ts
│   ├── sales.module.ts
│   └── sales.service.ts
│
├── app.module.ts
└── main.ts
```

---

# Estado actual del desarrollo

## ✅ Completado

### Base de datos

- PostgreSQL configurado y funcionando.
- Base de datos `restaurant_sales_db` creada.
- Conexión a PostgreSQL mediante variables de entorno.
- Drizzle ORM configurado.
- Drizzle Kit configurado.
- Migraciones generadas y ejecutadas correctamente.

### Esquema

- Enum PostgreSQL `payment_method` creado.
- Tabla `sales` creada con los siguientes campos:
  - `id`
  - `total_amount`
  - `payment_method`
  - `created_at`

### NestJS

- Módulo `SalesModule` creado.
- `SalesController` creado.
- `SalesService` creado.
- Módulo `ReportsModule` creado.
- `ReportsController` creado.
- `ReportsService` creado.
- Aplicación NestJS iniciando correctamente.

### Validaciones

- Enum `PaymentMethod` implementado en TypeScript.
- DTO `CreateSaleDto` implementado.
- DTO `UpdateSaleDto` implementado utilizando `PartialType`.
- `ValidationPipe` configurado globalmente.
- Validación de:
  - monto mayor a 0.
  - método de pago válido.
  - transformación automática de tipos.
  - eliminación de propiedades no permitidas.

### Ventas

- POST `/sales`
- GET `/sales`
- GET `/sales/:id`
- PATCH `/sales/:id`
- DELETE `/sales/:id`

### Reportes

- GET `/reports/daily`
  - Obtiene todas las ventas registradas durante el día actual.

- GET `/reports/monthly`
  - Obtiene las ventas del mes actual agrupadas por día.
  - Calcula el total vendido por día mediante agregaciones SQL.

### Manejo de excepciones

- Implementación de `NotFoundException`.
- Manejo de errores para registros inexistentes.
- Respuestas HTTP 404 descriptivas.

Implementado en:

- GET `/sales/:id`
- PATCH `/sales/:id`
- DELETE `/sales/:id`

### Documentación

- Swagger/OpenAPI integrado.
- Generación automática de documentación de endpoints.
- Interfaz interactiva disponible en:

```http
GET /api
```

### Drizzle ORM

- Inserción de ventas.
- Consulta de todas las ventas.
- Consulta de ventas por ID.
- Actualización de ventas.
- Eliminación de ventas.
- Uso de `eq()` para búsquedas por ID.
- Uso de `returning()`.
- Uso de consultas SQL mediante `sql`.
- Uso de filtros por fechas.
- Uso de agregaciones SQL con `SUM()`.
- Uso de agrupaciones mediante `GROUP BY`.
- Uso de ordenamiento mediante `ORDER BY`.

### Conceptos implementados

- DTOs.
- ValidationPipe.
- ParseIntPipe.
- PartialType.
- Inyección de dependencias.
- CRUD con Drizzle ORM.
- Uso de `returning()`.
- NotFoundException.
- Swagger/OpenAPI.
- Reportes diarios.
- Reportes mensuales.
- Agrupaciones SQL.
- Filtrado por fechas.
- Consultas avanzadas con Drizzle ORM.

---

## 🚧 En progreso

### Testing

- Diseño de estrategia de pruebas.
- Preparación de tests unitarios.
- Preparación de tests de integración.

---

## 📋 Pendiente

### Testing

#### Unitarios

- SalesService.
- ReportsService.

#### Integración

- POST `/sales`
- GET `/sales`
- GET `/sales/:id`
- PATCH `/sales/:id`
- DELETE `/sales/:id`
- GET `/reports/daily`
- GET `/reports/monthly`

### Mejoras futuras

- Filtros por fecha.
- Paginación de ventas.
- Ordenamiento de resultados.
- Filtro por método de pago.
- Soft Delete (opcional).
- Decoradores avanzados de Swagger (`@ApiTags`, `@ApiOperation`, `@ApiResponse`).

---

# Próximos pasos recomendados

## 1. Testing

Crear pruebas unitarias para:

- SalesService.
- ReportsService.

Crear pruebas de integración para validar:

```http
POST   /sales
GET    /sales
GET    /sales/:id
PATCH  /sales/:id
DELETE /sales/:id
GET    /reports/daily
GET    /reports/monthly
```

## 2. Paginación

Implementar:

```http
GET /sales?page=1&limit=10
```

## 3. Filtros

Agregar filtros opcionales:

```http
GET /sales?paymentMethod=cash
```

```http
GET /sales?startDate=2026-08-01&endDate=2026-08-31
```

## 4. Mejorar documentación

Agregar decoradores de Swagger:

```ts
@ApiTags()
@ApiOperation()
@ApiResponse()
@ApiProperty()
```

para generar documentación más detallada de la API.