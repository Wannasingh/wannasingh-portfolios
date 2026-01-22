# Base stage for shared settings
FROM oven/bun:1 AS base
WORKDIR /app

# 1. Install Dependencies
FROM base AS deps
COPY package.json bun.lockb* ./
RUN bun install --frozen-lockfile --production

# 2. Build Stage
FROM base AS builder
COPY --from=deps /app/node_modules ./node_modules
COPY . .
# Note: Next.js build might require environment variables. 
# We generally set standard ones here, but secrets must be passed at build time or runtime.
ENV NEXT_TELEMETRY_DISABLED 1
RUN bun install --frozen-lockfile
# Run build
RUN bun run build

# 3. Production Image
FROM base AS runner
WORKDIR /app

ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1

# Don't run as root
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

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

CMD ["bun", "server.js"]