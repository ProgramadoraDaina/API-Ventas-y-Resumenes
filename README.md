# Restaurant Sales API

API REST desarrollada con NestJS, TypeScript, PostgreSQL y Drizzle ORM para gestionar ventas, usuarios y reportes de un restaurante.

## Autor

- **Daina Paucar** — GitHub: [ProgramadoraDaina](https://github.com/ProgramadoraDaina)

## Objetivo del proyecto

El objetivo es construir una API REST para la gestión de ventas que permita:

- Registrar ventas.
- Consultar ventas.
- Modificar ventas.
- Eliminar ventas.
- Obtener reportes diarios y mensuales.
- Gestionar usuarios.
- Autenticar usuarios mediante JWT.
- Implementar control de acceso basado en roles (RBAC).

## Funcionalidades implementadas

- CRUD completo de ventas.
- Filtros y paginación.
- Gestión de usuarios.
- Autenticación mediante JWT.
- Control de acceso basado en roles (RBAC).
- Protección de endpoints.
- Restricciones según el rol del usuario.
- Reportes diarios y mensuales.
- Manejo de excepciones.
- Documentación interactiva mediante Swagger/OpenAPI.
- Connection Pooling mediante pg.Pool.
- Optimización de consultas mediante índices PostgreSQL.
- Trazabilidad de ventas mediante asociación con usuarios.
- Restricción de acceso a ventas según propietario.
- UUID como identificadores públicos.
- Refresh Token Rotation.
- RefreshTokenGuard.
- Global Exception Filter.
- Validación centralizada de variables de entorno.
- Helmet.
- Rate Limiting mediante Throttler.

---

## Tecnologías utilizadas

### Backend

- NestJS
- TypeScript

### Base de datos

- PostgreSQL

### Acceso a datos

- Drizzle ORM
- Drizzle Kit
- pg (Node PostgreSQL)
- Connection Pooling con pg.Pool

### ORM

- Drizzle ORM
- Drizzle Kit

### Validación

- class-validator
- class-transformer

### Seguridad

- JWT
- Passport
- Passport JWT
- bcrypt

## Optimización de rendimiento

La aplicación incorpora optimizaciones para mejorar la escalabilidad y el rendimiento de las consultas:

- Connection Pooling mediante `pg.Pool`.
- Índice sobre `created_at` para optimizar reportes diarios y mensuales.
- Índice sobre `created_by` para optimizar consultas por empleado.
- Índice compuesto sobre (`payment_method`, `created_at`) para optimizar filtros por método de pago y rangos de fechas.

### Documentación

- Swagger/OpenAPI

---

## Documentación del proyecto

- [Estado actual del desarrollo](ROADMAP.md)

---

## Documentación de la API

Swagger disponible en:

```text
http://localhost:3001/api
```

## Instalación

### 1. Clonar el repositorio

```bash
git clone https://github.com/ProgramadoraDaina/API-Ventas-y-Resumenes.git
cd API-Ventas-y-Resumenes
```

### 2. Instalar dependencias

```bash
pnpm install
```

### 3. Configurar variables de entorno

Crear un archivo `.env`:

```env
PORT=3001

DATABASE_URL=

JWT_SECRET=

JWT_REFRESH_SECRET=

JWT_EXPIRES_IN=15m

JWT_REFRESH_EXPIRES_IN=7d

CORS_ORIGIN=http://localhost:3000
```

### 4. Ejecutar migraciones

```bash
pnpm drizzle-kit push
```

### 5. Iniciar la aplicación

```bash
## Endpoints

### Autenticación

|Método|       Ruta       |                        Descripción                        |     Acceso    |
| ---  |       ---        |                            ---                            |      ---      |
| POST | `/auth/register` | Crear un usuario nuevo (rol `customer`)                   |    Público    |
| POST | `/auth/login`    | Iniciar sesión y obtener `access_token` + `refresh_token` |Público (rate limiting reforzado)|
| POST | `/auth/refresh`  | Renovar el access token con un refresh token válido       | Refresh token |
| POST | `/auth/logout`   | Cerrar sesión e invalidar el refresh token                | JWT           |

### Ventas

| Método |     Ruta     |                      Descripción                     |        Acceso        |
|  ---   |      ---     |                          ---                         |         ---          |
| GET    | `/sales`     | Listar ventas con paginación, filtros y ordenamiento | JWT (ADMIN/EMPLOYEE) |
| GET    | `/sales/:id` | Obtener una venta por ID                             | JWT (ADMIN/EMPLOYEE) |
| POST   | `/sales`     | Crear una venta (verifica stock y lo descuenta)      | JWT (ADMIN/EMPLOYEE) |
| PATCH  | `/sales/:id` | Actualizar una venta                                 | JWT (ADMIN/EMPLOYEE) |
| DELETE | `/sales/:id` | Eliminar una venta                                   | JWT (ADMIN/EMPLOYEE) |

### Productos

| Método |       Ruta      |        Descripción         |        Acceso        |
|   ---  |       ---       |            ---             |         ---          |
| GET    | `/products`     | Listar productos           | JWT (ADMIN/EMPLOYEE) |
| GET    | `/products/:id` | Obtener un producto por ID | JWT (ADMIN/EMPLOYEE) |
| POST   | `/products`     | Crear un producto          | JWT (ADMIN/EMPLOYEE) |
| PATCH  | `/products/:id` | Actualizar un producto     | JWT (ADMIN/EMPLOYEE) |
| DELETE | `/products/:id` | Eliminar un producto       | JWT (ADMIN/EMPLOYEE) |

### Usuarios

| Método |        Ruta       |                Descripción                |   Acceso    |
|   ---  |         ---       |                    ---                    |     ---     |
| GET    | `/users/profile`  | Obtener el perfil del usuario autenticado |     JWT     |
| PATCH  | `/users/:id/role` | Actualizar el rol de un usuario           | JWT (ADMIN) |

### Reportes

| Método |    Ruta    | Descripción | Acceso |
|   ---  |    ---    | --- | --- |
| GET    | `/reports/daily` | Reporte diario de ventas | JWT (ADMIN/EMPLOYEE) |
| GET    | `/reports/monthly` | Reporte mensual agrupado por día | JWT (ADMIN) |
| GET    | `/reports/dashboard` | Métricas del día y del mes | JWT (ADMIN) |

**Nota:** el acceso a los datos está asociado al usuario propietario (`created_by`). El rol `EMPLOYEE` solo puede operar sobre sus propias ventas del día actual.
pnpm run start:dev
```

---

## Swagger

Disponible en:

```text
http://localhost:3001/api
```