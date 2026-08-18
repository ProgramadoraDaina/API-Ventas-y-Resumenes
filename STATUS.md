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
