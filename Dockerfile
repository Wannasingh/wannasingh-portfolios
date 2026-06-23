# Base stage for shared settings
FROM node:20-alpine AS base
WORKDIR /app

# 1. Install Dependencies
FROM base AS deps
COPY package.json package-lock.json* ./
RUN npm ci --omit=dev

# 2. Build & Test Stage
FROM base AS tester
COPY --from=deps /app/node_modules ./node_modules
COPY . .
# Note: Next.js build might require environment variables. 
# We generally set standard ones here, but secrets must be passed at build time or runtime.
ENV NEXT_TELEMETRY_DISABLED 1
RUN npm ci
# Run tests and linting
RUN npx tsc --noEmit
RUN npm run lint
RUN npm run test:ci
RUN npm audit --audit-level=high || true

# 3. Production Builder
FROM base AS builder
COPY --from=deps /app/node_modules ./node_modules
COPY . .
ENV NEXT_TELEMETRY_DISABLED 1
ENV JWT_SECRET="dummy_secret_for_build"
RUN npm ci
RUN npm run build

# 3. Production Image
FROM base AS runner
WORKDIR /app

ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1

# Don't run as root
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 --ingroup nodejs nextjs

# Copy allowed public files and built assets
COPY --from=builder /app/public ./public

# Automatically leverage output traces to reduce image size
# https://nextjs.org/docs/advanced-features/output-file-tracing
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT 3000
# set hostname to localhost
ENV HOSTNAME "0.0.0.0"

CMD ["node", "server.js"]