# Architecture
 
## Estructura de carpetas

```text
src/
│
├── auth/
│   │
│   ├── decorators/
│   │   └── roles.decorator.ts
│   │
│   ├── dto/
│   │   ├── login.dto.ts
│   │   ├── refresh-token.dto.ts
│   │   └── register.dto.ts
│   │
│   ├── guards/
│   │   ├── jwt-auth.guard.ts
│   │   ├── roles.guard.spec.ts
│   │   └── roles.guard.ts
│   │
│   ├── interfaces/
│   │   ├── auth-user.interface.ts
│   │   └── jwt-payload.interface.ts
│   │
│   ├── strategies/
│   │   ├── jwt.strategy.ts
│   │   └── jwt.strategy.spec.ts
│   │
│   ├── auth.controller.ts
│   ├── auth.controller.spec.ts
│   ├── auth.module.ts
│   ├── auth.service.ts
│   └── auth.service.spec.ts
│
├── database/
│   ├── drizzle.ts
│   └── schema.ts
│
├── reports/
│   │
│   ├── reports.controller.ts
│   ├── reports.controller.spec.ts
│   ├── reports.module.ts
│   ├── reports.service.ts
│   └── reports.service.spec.ts
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
│   ├── sales.controller.spec.ts
│   ├── sales.module.ts
│   ├── sales.service.ts
│   └── sales.service.spec.ts
│
├── users/
│   │
│   ├── dto/
│   │   └──update-role.dto.ts
│   │
│   ├── enums/
│   │   └── user-role.enum.ts
│   │
│   ├── users.controller.ts
│   ├── users.controller.spec.ts
│   ├── users.module.ts
│   ├── users.service.ts
│   └── users.service.spec.ts
│
├── app.module.ts
└── main.ts
```

## Organización de la arquitectura

La aplicación sigue una arquitectura modular basada en NestJS.

Cada módulo encapsula:

- Controller: exposición de endpoints HTTP.
- Service: lógica de negocio.
- DTOs: validación y tipado de datos.
- Guards: autenticación y autorización.
- Strategies: integración con Passport y JWT.
- Tests: pruebas unitarias mediante Jest.

Los módulos principales son:

- AuthModule: autenticación y autorización.
- UsersModule: gestión de usuarios.
- SalesModule: gestión de ventas.
- ReportsModule: generación de reportes y métricas.

### Capa de persistencia

- PostgreSQL como motor de base de datos.
- Drizzle ORM para acceso y manipulación de datos.
- pg.Pool para gestión eficiente y reutilización de conexiones a la base de datos.
- Connection Pooling configurado para mejorar concurrencia y escalabilidad.
- Índice sobre `created_at` para optimizar consultas y reportes por fecha.
- Índice compuesto sobre (`payment_method`, `created_at`) para acelerar filtros y búsquedas de ventas.
