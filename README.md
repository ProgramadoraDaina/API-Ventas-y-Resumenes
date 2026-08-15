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

Actualmente el proyecto cuenta con CRUD completo de ventas, filtros y paginación, gestión de usuarios, autenticación mediante JWT, protección de endpoints, manejo de excepciones, módulo de reportes y documentación interactiva mediante Swagger/OpenAPI.

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

## Seguridad

- JWT (JSON Web Token)
- Passport
- Passport JWT
- bcrypt

---

# Estructura actual

```text
src/
│
├── auth/
│    ├── dto/
│    │   └── login.dto.ts
│    │
│    ├── guards/
│    │   └── jwt-auth.guard.ts
│    │
│    ├── strategies/
│    │   └── jwt.strategy.ts
│    │
│    ├── auth.controller.ts
│    ├── auth.module.ts
│    └── auth.service.ts
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
│   │   ├── update-sale.dto.ts
│   │   └── query-sale.dto.ts
│   │
│   ├── enums/
│   │   └── payment-method.enum.ts
│   │
│   ├── sales.controller.ts
│   ├── sales.module.ts
│   ├── sales.service.ts
│   └── sales.service.spec.ts
│
├── users/
│   ├── dto/
│   │   └── create-user.dto.ts
│   │
│   ├── enums/
│   │   └── user-role.enum.ts
│   │
│   ├── users.controller.ts
│   ├── users.module.ts
│   └── users.service.ts
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
- Enum PostgreSQL `user_role` creado.
- Tabla `sales` creada con los siguientes campos:
  - `id`
  - `total_amount`
  - `payment_method`
  - `created_at`
- Tabla `users` creada con los siguientes campos:
  - `id`
  - `name`
  - `email`
  - `password`
  - `role`

### NestJS

- Módulo `SalesModule` creado.
- `SalesController` creado.
- `SalesService` creado.
- Módulo `ReportsModule` creado.
- `ReportsController` creado.
- `ReportsService` creado.
- Módulo `UsersModule` creado.
- `UsersController` creado.
- `UsersService` creado.
- Módulo `AuthModule` creado.
- `AuthController` creado.
- `AuthService` creado.
- Aplicación NestJS iniciando correctamente.

### Validaciones

- Enum `PaymentMethod` implementado en TypeScript.
- Enum `UserRole` implementado en TypeScript.
- DTO `CreateSaleDto` implementado.
- DTO `UpdateSaleDto` implementado utilizando `PartialType`.
- DTO `QuerySaleDto` implementado.
- DTO `CreateUserDto` implementado.
- DTO `LoginDto` implementado.
- `ValidationPipe` configurado globalmente.
- Validación de:
  - monto mayor a 0.
  - método de pago válido.
  - roles válidos.
  - correo electrónico válido.
  - longitud mínima de contraseña.
  - paginación.
  - filtros de fechas.
  - transformación automática de tipos.
  - eliminación de propiedades no permitidas.

### Ventas

- POST `/sales`
- GET `/sales`
- GET `/sales/:id`
- PATCH `/sales/:id`
- DELETE `/sales/:id`

#### Funcionalidades adicionales implementadas

Paginación:

```http
GET /sales?page=1&limit=10
```

Filtro por método de pago:

```http
GET /sales?paymentMethod=cash
```

Filtro por fecha inicial:

```http
GET /sales?startDate=2026-08-01
```

Filtro por fecha final:

```http
GET /sales?endDate=2026-08-31
```

Combinación de filtros:

```http
GET /sales?paymentMethod=cash&startDate=2026-08-01&endDate=2026-08-31
```

### Usuarios

- POST `/users`
  - Registro de usuarios.
  - Persistencia de usuarios en PostgreSQL.
  - Asignación y validación de roles.

### Autenticación

- POST `/auth/login`
  - Inicio de sesión mediante email y contraseña.
  - Validación de credenciales.
  - Generación de JWT (JSON Web Token).
- Búsqueda de usuarios por correo electrónico.
- Integración de `JwtModule`.
- Endpoint protegido para obtener el usuario autenticado:
  - GET `/users/profile`

### Seguridad

- Hash de contraseñas mediante `bcrypt`.
- Almacenamiento seguro de contraseñas en PostgreSQL.
- Validación de contraseñas mediante `bcrypt.compare()`.
- Generación de tokens JWT.
- Configuración de expiración de tokens.
- Implementación de `JwtStrategy`.
- Implementación de `JwtAuthGuard`.
- Protección de endpoints mediante JWT.
- Extracción de información del usuario autenticado desde el token.
- Integración de autenticación JWT con Swagger/OpenAPI.

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
- Inserción de usuarios.
- Consulta de usuarios por correo electrónico.
- Uso de `eq()` para búsquedas por ID y filtros.
- Uso de `gte()` para filtros de fecha inicial.
- Uso de `lte()` para filtros de fecha final.
- Uso de `and()` para combinación dinámica de filtros.
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
- Consultas avanzadas con Drizzle ORM.
- Query Parameters.
- Paginación.
- Filtrado por método de pago.
- Filtrado por rangos de fechas.
- Consultas dinámicas con Drizzle ORM.
- Uso de `eq()`.
- Uso de `gte()` para filtros de fecha inicial.
- Uso de `lte()` para filtros de fecha final.
- Uso de `and()` para combinación dinámica de filtros.
- Hashing de contraseñas.
- bcrypt.
- JWT (JSON Web Token).
- Authentication.
- Login basado en credenciales.
- Passport.
- Passport JWT.
- JwtStrategy.
- JwtAuthGuard.
- Protección de rutas.
- Autenticación basada en Bearer Token.

### Testing

- Jest configurado correctamente.
- Primer archivo `.spec.ts` creado.
- Ejecución de pruebas validada correctamente.

### Endpoints protegidos mediante JWT

- GET `/users/profile`
- GET `/sales`

Probados mediante Swagger/OpenAPI utilizando autenticación Bearer Token.

---

## 🚧 En progreso

### Seguridad y autorización

- Implementación de `RolesGuard`.
- Creación del decorador personalizado `@Roles()`.
- Control de acceso basado en roles (RBAC).

### Testing

- Implementación de tests unitarios.
- Implementación de tests de integración.

---

## 📋 Pendiente

### Testing

#### Unitarios

- SalesService.
- ReportsService.
- UsersService.
- AuthService.

#### Integración

- POST `/users`
- POST `/auth/login`
- POST `/sales`
- GET `/sales`
- GET `/sales/:id`
- PATCH `/sales/:id`
- DELETE `/sales/:id`
- GET `/reports/daily`
- GET `/reports/monthly`

### Mejoras futuras

- Ordenamiento de resultados.
- Soft Delete (opcional).
- Decoradores avanzados de Swagger (`@ApiTags`, `@ApiOperation`, `@ApiResponse`).

---

# Próximos pasos recomendados

## 1. Seguridad y autorización

Implementar:

- `RolesGuard`
- Decorador personalizado `@Roles()`
- Protección de endpoints basada en roles

Proteger endpoints como:

```http
GET    /sales
POST   /sales
PATCH  /sales/:id
DELETE /sales/:id
GET    /reports/daily
GET    /reports/monthly
```


## 2. Testing

Crear pruebas unitarias para:

- SalesService.
- ReportsService.
- UsersService.
- AuthService.

Crear pruebas de integración para validar:

```http
POST   /users
POST   /auth/login
POST   /sales
GET    /sales
GET    /sales/:id
PATCH  /sales/:id
DELETE /sales/:id
GET    /reports/daily
GET    /reports/monthly
```

## 3. Ordenamiento

Implementar:

```http
GET /sales?sort=asc
GET /sales?sort=desc
```

## 4. Mejorar documentación

Agregar decoradores de Swagger:

```ts
@ApiTags()
@ApiOperation()
@ApiResponse()
@ApiProperty()
@ApiBearerAuth()
```

para generar documentación más detallada de la API y documentar los endpoints protegidos mediante JWT.