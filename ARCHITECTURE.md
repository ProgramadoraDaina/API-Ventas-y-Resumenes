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