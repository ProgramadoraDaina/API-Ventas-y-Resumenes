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
- Gestionar contraseñas temporales y cambios obligatorios de contraseña.

## Funcionalidades implementadas

- CRUD completo de ventas.
- Filtros y paginación.
- Gestión de usuarios.
- Autenticación mediante JWT.
- Control de acceso basado en roles (RBAC).
- Protección de endpoints.
- Restricciones según el rol del usuario.
- Contraseñas temporales.
- Cambio obligatorio de contraseña en el primer acceso.
- Reportes diarios y mensuales.
- Manejo de excepciones.
- Documentación interactiva mediante Swagger/OpenAPI.

> Los usuarios no envían contraseña durante el registro. El sistema genera automáticamente una contraseña temporal y obliga a cambiarla en el primer acceso.

---

## Tecnologías utilizadas

### Backend

- NestJS
- TypeScript

### Base de datos

- PostgreSQL

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

### Documentación

- Swagger/OpenAPI

---

## Documentación del proyecto

- [Estado actual del desarrollo](docsdocs/ROADMAP.mdRE.md)

---

## Documentación de la API

Swagger disponible en:

```text
http://localhost:3001/api
´´´