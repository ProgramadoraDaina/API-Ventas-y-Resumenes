# Restaurant Sales API

API desarrollada con NestJS, TypeScript, PostgreSQL y Drizzle ORM para gestionar ventas diarias y generar reportes de un restaurante.

## Objetivo del proyecto

El objetivo es construir una API REST para la gestión de ventas de un restaurante que permita:

- Registrar ventas.
- Consultar ventas.
- Modificar ventas.
- Eliminar ventas.
- Obtener reportes diarios.
- Obtener reportes mensuales.
- Gestionar usuarios.
- Autenticar usuarios mediante JWT.
- Controlar accesos mediante roles (RBAC).
- Aplicar restricciones según el rol del usuario.
- Gestionar contraseñas temporales y cambios obligatorios de contraseña.

Actualmente el proyecto cuenta con CRUD completo de ventas, filtros y paginación, gestión de usuarios, autenticación mediante JWT, autorización basada en roles (RBAC), protección de endpoints, restricciones específicas para usuarios EMPLOYEE, contraseñas temporales para nuevos usuarios, flujo obligatorio de cambio de contraseña, manejo de excepciones, módulo de reportes y documentación interactiva mediante Swagger/OpenAPI.


Los usuarios ya no envían contraseña durante el registro.
El sistema genera automáticamente una contraseña temporal basada en el correo electrónico y exige su modificación en el primer acceso.
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
│   │
│   ├── decorators/
│   │   └── roles.decorator.ts
│   │
│   ├── dto/
│   │   └── login.dto.ts
│   │
│   ├── interfaces/
│   │   └── auth-user.interface.ts
│   │
│   ├── guards/
│   │   ├── jwt-auth.guard.ts
│   │   └── roles.guard.ts
│   │
│   ├── strategies/
│   │   └── jwt.strategy.ts
│   │
│   ├── auth.controller.ts
│   ├── auth.module.ts
│   └── auth.service.ts
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
│   │
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
├── seed/
│   └── admin.seed.ts
│
├── users/
│   │
│   ├── dto/
│   │   ├── create-user.dto.ts
│   │   └── change-password.dto.ts
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
  - `must_change_password`

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
  - validación de correo electrónico único.
  - longitud mínima de nueva contraseña.
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
  - Validación de correo electrónico duplicado.
  - Generación automática de contraseña temporal.
  - Inicialización automática de `must_change_password`.
- PATCH `/users/change-password`
  - Cambio seguro de contraseña.
  - Verificación de contraseña actual.
  - Actualización mediante bcrypt.
  - Inicialización de cuentas mediante `must_change_password`.

### Autenticación

- POST `/auth/login`
  - Inicio de sesión mediante email y contraseña.
  - Validación de credenciales.
  - Generación de JWT (JSON Web Token).
- Búsqueda de usuarios por correo electrónico.
- Integración de `JwtModule`.
- Endpoint protegido para obtener el usuario autenticado:
  - GET `/users/profile`
- Inclusión del rol dentro del JWT.
- Inclusión del indicador `mustChangePassword` en la respuesta de login.

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
- Implementación de RolesGuard.
- Implementación del decorador `@Roles()`.
- Control de acceso basado en roles (RBAC).
- Protección de creación de usuarios mediante rol ADMIN.
- Flujo obligatorio de cambio de contraseña.
- Restricción de acceso a ventas históricas para EMPLOYEE.
- Restricción de modificación de ventas históricas para EMPLOYEE.
- Restricción de eliminación de ventas históricas para EMPLOYEE.
- Restricción de acceso a reportes mensuales para EMPLOYEE.
- Generación automática de contraseñas temporales para nuevos usuarios.
- Flujo de primer acceso con cambio obligatorio de contraseña.

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
- Role Based Access Control (RBAC).
- RolesGuard.
- Decoradores personalizados.
- SetMetadata.
- Reflector.
- Cambio seguro de contraseñas.
- Inicialización de usuarios.

### Testing

- Jest configurado correctamente.
- Primer archivo `.spec.ts` creado.
- Ejecución de pruebas validada correctamente.

### Control de acceso (RBAC)

- Decorador personalizado `@Roles()`.
- Implementación de `RolesGuard`.
- Autorización basada en roles.
- Restricción de creación de usuarios para ADMIN.
- Inclusión del rol dentro del JWT.
- Validación de permisos mediante metadata y Reflector.
- Restricción de acceso a ventas históricas para EMPLOYEE.
- Restricción de modificación de ventas históricas para EMPLOYEE.
- Restricción de eliminación de ventas históricas para EMPLOYEE.
- Restricción de acceso a reportes mensuales para EMPLOYEE.
- Filtrado automático de ventas del día actual para EMPLOYEE.

### Inicialización del sistema

- Creación automática de un administrador inicial.
- Verificación de existencia previa de administradores.
- Seed ejecutado al iniciar la aplicación.
- Cuenta inicial:

  Email: admin@restaurant.com
  Password: admin123

- Cambio obligatorio de contraseña en el primer acceso.

### Endpoints protegidos mediante JWT

- GET `/users/profile`
- PATCH `/users/change-password`
- GET `/sales`
- POST `/users`
- POST   /sales
- PATCH  /sales/:id
- DELETE /sales/:id
- GET `/reports/daily`
- GET `/reports/monthly`

Probados mediante Swagger/OpenAPI utilizando autenticación Bearer Token.

---
## 🚧 En progreso

### Testing

- Implementación de tests unitarios.
- Implementación de tests de integración.

## 📋 Pendiente

### Testing

- Tests unitarios de SalesService.
- Tests unitarios de ReportsService.
- Tests unitarios de UsersService.
- Tests unitarios de AuthService.

### Integración

- POST /users
- POST /auth/login
- POST /sales
- GET /sales
- GET /sales/:id
- PATCH /sales/:id
- DELETE /sales/:id
- GET /reports/daily
- GET /reports/monthly

### Mejoras futuras

- Ordenamiento de resultados.
- Soft Delete.
- Dashboard de estadísticas.
- Decoradores avanzados de Swagger.
---

# Próximos pasos recomendados

## 1. Testing

Crear pruebas unitarias para:

- SalesService.
- ReportsService.
- UsersService.
- AuthService.

Crear pruebas de integración para validar:

POST   /users
POST   /auth/login
POST   /sales
GET    /sales
GET    /sales/:id
PATCH  /sales/:id
DELETE /sales/:id
GET    /reports/daily
GET    /reports/monthly

## 2. Dashboard de estadísticas

Implementar:

GET /reports/dashboard

Ejemplo:

{
  "todaySales": 15,
  "todayTotal": 250000,
  "monthSales": 300,
  "monthTotal": 5400000
}

## 3. Ordenamiento

Implementar:

GET /sales?sort=asc
GET /sales?sort=desc

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