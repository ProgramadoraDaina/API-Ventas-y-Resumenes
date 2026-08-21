# Estado actual del desarrollo

## ✅ Completado

### Base de datos

- PostgreSQL configurado y funcionando.
- Base de datos `restaurant_sales_db` creada.
- Conexión a PostgreSQL mediante variables de entorno.
- Drizzle ORM configurado.
- Drizzle Kit configurado.
- Migraciones generadas y ejecutadas correctamente.
- Connection Pooling configurado mediante pg.Pool.
- Índices PostgreSQL configurados para optimización de consultas.

### Optimización de rendimiento

- Connection Pooling mediante `pg.Pool`.
- Reutilización de conexiones para mejorar concurrencia y escalabilidad.
- Índice `sales_created_at_idx` para optimizar consultas por fecha.
- Índice compuesto `sales_payment_created_idx` para optimizar filtros por método de pago y rangos de fechas.

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
  - `hashed_refresh_token`

### Índices

- Índice `sales_created_at_idx`.
- Índice compuesto `sales_payment_created_idx`.

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
  - ordenamiento ascendente y descendente.
  - Documentación Swagger de DTOs.

### Ventas

- POST `/sales`
- GET `/sales`
- GET `/sales/:id`
- PATCH `/sales/:id`
- DELETE `/sales/:id`

#### Funcionalidades adicionales implementadas


Paginación:

GET /sales?page=1&limit=10

Filtro por método de pago:

GET /sales?paymentMethod=cash

Filtro por fecha inicial:

GET /sales?startDate=2026-08-01

Filtro por fecha final:

GET /sales?endDate=2026-08-31

Combinación de filtros:

GET /sales?paymentMethod=cash&startDate=2026-08-01&endDate=2026-08-31

Ordenamiento por fecha:

GET /sales?sort=asc

GET /sales?sort=desc

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
- POST `/auth/refresh`
  - Renovación de sesión mediante Refresh Token.
  - Generación automática de nuevo Access Token.
  - Rotación automática de Refresh Tokens.
  - Validación de Refresh Token almacenado en base de datos.

- POST `/auth/logout`
  - Cierre de sesión seguro.
  - Invalidación del Refresh Token almacenado.
- Implementación de Access Tokens y Refresh Tokens.
- Configuración independiente de expiración para Access Token y Refresh Token.
- Configuración de secretos independientes para Access Token y Refresh Token.
- Rotación automática de Refresh Tokens.
- Persistencia de Refresh Tokens en PostgreSQL.

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
- Validación estricta mediante ValidationPipe.
- Eliminación automática de propiedades no permitidas (`whitelist`).
- Bloqueo de propiedades no permitidas (`forbidNonWhitelisted`).
- Transformación automática de tipos (`transform`).
- Hash de Refresh Tokens mediante bcrypt.
- Resumen SHA-256 previo al hash de Refresh Tokens.
- Almacenamiento seguro de Refresh Tokens resumidos y hasheados.
- Secret independiente para Access Token (`JWT_SECRET`).
- Secret independiente para Refresh Token (`JWT_REFRESH_SECRET`).
- Detección de reutilización de Refresh Tokens.
- Invalidación automática de sesión ante uso de Refresh Token inválido.
- Rotación automática de Refresh Tokens.
- Logout seguro mediante eliminación del Refresh Token persistido.
- Helmet para protección mediante HTTP Security Headers.
- Rate Limiting mediante @nestjs/throttler.
- Protección contra ataques de fuerza bruta.
- Limitación de solicitudes por IP.
- Protección específica de los endpoints `/auth/login` y `/auth/refresh`.

### Reportes

- GET `/reports/daily`
  - Obtiene todas las ventas registradas durante el día actual.

- GET `/reports/monthly`
  - Obtiene las ventas del mes actual agrupadas por día.
  - Calcula el total vendido por día mediante agregaciones SQL.

- GET `/reports/dashboard`
  - Obtiene métricas resumidas para el dashboard.
  - Calcula la cantidad de ventas del día.
  - Calcula el monto total vendido durante el día.
  - Calcula la cantidad de ventas del mes.
  - Calcula el monto total vendido durante el mes.

Ejemplo:

```json
{
  "todaySales": 15,
  "todayTotal": 250000,
  "monthSales": 300,
  "monthTotal": 5400000
}
```

### Manejo de excepciones

- Implementación de `NotFoundException`.
- Implementación de `BadRequestException`.
- Implementación de `UnauthorizedException`.
- Implementación de `ForbiddenException`.
- Manejo de registros inexistentes.
- Manejo de credenciales inválidas.
- Manejo de accesos sin permisos.
- Manejo de datos inválidos.
- Respuestas HTTP descriptivas.

Implementado en:

- GET `/sales/:id`
- PATCH `/sales/:id`
- DELETE `/sales/:id`
- POST `/auth/login`
- POST `/users`
- PATCH `/users/change-password`
- Endpoints protegidos mediante RBAC.

### Documentación

- Swagger/OpenAPI integrado.
- Generación automática de documentación de endpoints.
- Uso de `@ApiTags()`.
- Uso de `@ApiOperation()`.
- Uso de `@ApiResponse()`.
- Uso de `@ApiProperty()`.
- Uso de `@ApiPropertyOptional()`.
- Uso de `@ApiBearerAuth()`.
- Documentación de DTOs con ejemplos y descripciones.
- Interfaz interactiva disponible en:
- Documentación Swagger protegida mediante autenticación Bearer Token.
- Ejemplos de request y response documentados.
- DTOs documentados con ejemplos y validaciones.

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
- Uso de `asc()` para ordenamiento ascendente.
- Uso de `desc()` para ordenamiento descendente.

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
- Ordenamiento de resultados.
- Uso de `ORDER BY`.
- Ordenamiento ascendente y descendente.
- Swagger decorators.
- ApiTags.
- ApiOperation.
- ApiResponse.
- ApiProperty.
- ApiPropertyOptional.
- Documentación automática de DTOs.
- Jest.
- TestingModule.
- Unit Testing.
- Integration Testing (E2E).
- Supertest.
- Mocking con Jest.
- Cobertura de código.
- Connection Pooling con pg.Pool.
- Optimización de consultas mediante índices.
- PostgreSQL Indexes.
- Refresh Tokens.
- Token Rotation.
- Session Management.
- Refresh Token Hashing.
- SHA-256.
- Node Crypto.
- ConfigModule.
- ConfigService.
- Variables de entorno centralizadas.
- Helmet.
- HTTP Security Headers.
- Rate Limiting.
- ThrottlerGuard.

### Testing

- Jest configurado correctamente.
- TestingModule de NestJS implementado.
- Tests unitarios para:
  - AuthService.
  - UsersService.
  - SalesService.
  - ReportsService.
- Tests unitarios para:
  - AuthController.
  - UsersController.
  - SalesController.
  - ReportsController.
- Tests unitarios para:
  - JwtStrategy.
  - RolesGuard.
- Tests E2E implementados mediante Supertest.
- Validación de autenticación JWT.
- Validación de endpoints protegidos.
- Validación de autorización basada en roles.
- Validación de reportes.
- Validación de operaciones CRUD.
- Validación de Rate Limiting mediante pruebas E2E.

#### Resultado actual

- ✅ 10 suites de pruebas.
- ✅ 48 tests unitarios pasando.
- ✅ 0 tests fallando.
- ✅ Cobertura de statements: 73.23%.
- ✅ Cobertura de branches: 66.66%.
- ✅ Cobertura de funciones: 82.22%.
- ✅ Cobertura de líneas: 75%.
- ✅ Implementación completa de Refresh Tokens.
- ✅ Rotación automática de Refresh Tokens.
- ✅ Logout seguro.
- ✅ Persistencia de sesiones mediante PostgreSQL.
- ✅ Hasheo de Refresh Tokens con SHA-256 + bcrypt.
- ✅ Helmet configurado.
- ✅ Rate Limiting global implementado mediante Throttler.
- ✅ Protección contra ataques de fuerza bruta.
- ✅ Tests E2E de Rate Limiting pasando correctamente.

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
- GET `/reports/dashboard`

### Endpoints de autenticación

- POST `/auth/login`
- POST `/auth/refresh`
- POST `/auth/logout`

Probados mediante Swagger/OpenAPI utilizando autenticación Bearer Token.
