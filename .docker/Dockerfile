ARG NODE_VERSION=22-alpine

FROM node:${NODE_VERSION} AS base

WORKDIR /app

ENV NEXT_TELEMETRY_DISABLED=1

RUN apk update && apk add --no-cache \
    libc6-compat \
    vips \
    && rm -rf /var/cache/apk/* /tmp/*

FROM base AS deps

RUN apk add --no-cache \
    vips-dev \
    build-base \
    python3

COPY package*.json ./

RUN npm ci --only=production=false \
    && npm cache clean --force \
    && rm -rf /tmp/*

FROM base AS builder

ARG NEXT_PUBLIC_API_URL
ARG NEXT_PUBLIC_APP_ENV

ENV NODE_ENV=production \
    NEXT_PUBLIC_API_URL=${NEXT_PUBLIC_API_URL} \
    NEXT_PUBLIC_APP_ENV=${NEXT_PUBLIC_APP_ENV}

COPY --from=deps /app/node_modules ./node_modules
COPY . .

RUN npm run build \
    && rm -rf node_modules/.cache

FROM base AS runner

LABEL org.opencontainers.image.title="Trend Panel" \
      org.opencontainers.image.description="Next.js frontend application" \
      org.opencontainers.image.vendor="Trend Agency"

ENV NODE_ENV=production \
    PORT=3000 \
    HOSTNAME=0.0.0.0

RUN apk add --no-cache \
    wget \
    dumb-init \
    && addgroup -S nextjs -g 1001 \
    && adduser -S nextjs -u 1001 -G nextjs \
    && rm -rf /var/cache/apk/* /tmp/*

COPY --from=builder --chown=nextjs:nextjs /app/public ./public
COPY --from=builder --chown=nextjs:nextjs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nextjs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
    CMD wget --spider -q http://localhost:3000/ || exit 1

ENTRYPOINT ["dumb-init", "--"]
CMD ["node", "server.js"]