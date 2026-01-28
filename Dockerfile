# Build stage
FROM node:20 AS build
WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

# Runtime stage (Caddy)
FROM caddy:2
WORKDIR /srv
COPY --from=build /app/build .

COPY Caddyfile /etc/caddy/Caddyfile

EXPOSE 80