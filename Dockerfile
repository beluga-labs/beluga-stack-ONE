# Stage 1: Builder
FROM node:18-alpine AS builder
RUN apk add --no-cache libc6-compat
RUN npm install -g pnpm turbo

WORKDIR /app

COPY . .
RUN turbo prune --scope=web --docker

# Stage 2: Installer
FROM node:alpine AS installer
RUN apk add --no-cache libc6-compat
RUN apk update
RUN npm install -g pnpm turbo

WORKDIR /app

RUN rm -rf /root/.cache/pnpm

COPY --from=builder /app/out/json/ .
COPY --from=builder /app/out/pnpm-lock.yaml ./pnpm-lock.yaml

RUN pnpm install --frozen-lockfile

COPY --from=builder /app/out/full/ .
COPY turbo.json turbo.json
RUN pnpm turbo run build --filter=web

# Stage 3: Runner
FROM node:alpine AS runner

WORKDIR /app

# RUN addgroup --system --gid 1001 nodejs
# RUN adduser --system --uid 1001 nextjs
# USER nextjs

COPY --from=installer /app/apps/web/.env.production .
COPY --from=installer /app/apps/web/next.config.mjs .
COPY --from=installer /app/apps/web/package.json .
COPY --from=installer /app/apps/web/public ./apps/web/public
COPY --from=installer /app/apps/web/.next/standalone ./
COPY --from=installer /app/apps/web/.next/static ./apps/web/.next/static

RUN rm -rf /app/.next/cache

EXPOSE 3000

CMD ["node", "apps/web/server.js"]
