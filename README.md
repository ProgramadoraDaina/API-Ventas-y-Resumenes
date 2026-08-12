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

Actualmente el proyecto se encuentra en fase de configuración e implementación de la capa de persistencia.

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
│   │   └── create-sale.dto.ts
│   │
│   └── enums/
│       └── payment-method.enum.ts
│
├── app.module.ts
└── main.ts
