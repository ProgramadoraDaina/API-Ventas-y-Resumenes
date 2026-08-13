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

Actualmente el proyecto se encuentra en fase de implementación del CRUD completo y preparación del módulo de reportes.

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

### Drizzle ORM

- Inserción de ventas.
- Consulta de todas las ventas.
- Consulta de ventas por ID.
- Actualización de ventas.
- Eliminación de ventas.
- Uso de `eq()` para búsquedas por ID.

### Conceptos implementados

- DTOs.
- ValidationPipe.
- ParseIntPipe.
- PartialType.
- Inyección de dependencias.
- CRUD con Drizzle ORM.
- Uso de `returning()`.

## 🚧 En progreso

### Manejo de excepciones

- Implementación de `NotFoundException`.
- Manejo de errores para registros inexistentes.
- Respuestas HTTP 404 más descriptivas.

## 📋 Pendiente

### Reportes

- GET `/reports/daily`
- GET `/reports/monthly`

### Documentación

- Swagger/OpenAPI.

### Testing

- Tests unitarios.
- Tests de integración.

### Mejoras futuras

- Filtros por fecha.
- Paginación de ventas.
- Ordenamiento de resultados.
- Filtro por método de pago.
- Soft Delete (opcional).

---

# Próximos pasos recomendados

## 1. Manejo de excepciones

Implementar:

```ts
throw new NotFoundException(
  `Sale with id ${id} not found`,
);
```

en:

- GET `/sales/:id`
- PATCH `/sales/:id`
- DELETE `/sales/:id`

## 2. Reportes

Crear el módulo `ReportsModule`.

Endpoints:

```http
GET /reports/daily
GET /reports/monthly
```

## 3. Documentación

Integrar Swagger/OpenAPI para documentar toda la API.

## 4. Testing

Crear pruebas unitarias y de integración para asegurar la estabilidad de la aplicación.