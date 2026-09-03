FROM node:24-alpine AS base

RUN corepack enable

WORKDIR /app

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./

# ==========================
# Dependencias de producción
# ==========================
FROM base AS prod-deps

RUN --mount=type=cache,id=pnpm,target=/pnpm/store \
    pnpm install --prod --frozen-lockfile

# ==========================
# Build
# ==========================
FROM base AS build

RUN --mount=type=cache,id=pnpm,target=/pnpm/store \
    pnpm install --frozen-lockfile

COPY . .

RUN pnpm run build

# ==========================
# Imagen final
# ==========================
FROM node:24-alpine AS runtime

RUN corepack enable

WORKDIR /app

# Crear usuario no-root por seguridad
RUN addgroup -S app && adduser -S app -G app

COPY --chown=app:app --from=prod-deps /app/node_modules ./node_modules
COPY --chown=app:app --from=build /app/dist ./dist
COPY --chown=app:app package.json ./

USER app

# Entorno de producción
ENV NODE_ENV=production

# Healthcheck
HEALTHCHECK --interval=30s --timeout=5s --retries=3 \
  CMD wget --spider -q http://localhost:3001/api || exit 1

EXPOSE 3001

CMD ["node", "dist/main"]