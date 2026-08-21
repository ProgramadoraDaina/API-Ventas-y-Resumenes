# Restaurant Sales API

API REST desarrollada con NestJS, TypeScript, PostgreSQL y Drizzle ORM para gestionar ventas, usuarios y reportes de un restaurante.

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
```

### 4. Ejecutar migraciones

```bash
pnpm drizzle-kit push
```

### 5. Iniciar la aplicación

```bash
pnpm run start:dev
```

---

## Swagger

Disponible en:

```text
http://localhost:3001/api
```