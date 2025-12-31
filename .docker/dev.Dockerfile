ARG NODE_VERSION=22-alpine

FROM node:${NODE_VERSION}

WORKDIR /app

ENV NODE_ENV=development \
    NEXT_TELEMETRY_DISABLED=1 \
    HOSTNAME=0.0.0.0 \
    PORT=3000 \
    PATH="/app/node_modules/.bin:${PATH}"

RUN apk update && apk add --no-cache \
    libc6-compat \
    bash \
    git \
    && rm -rf /var/cache/apk/* /tmp/*

COPY package*.json ./

RUN npm ci \
    && npm cache clean --force \
    && rm -rf /tmp/*

EXPOSE 3000

CMD ["npm", "run", "dev"]
