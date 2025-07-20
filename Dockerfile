# 1. Install dependencies
FROM node:20-alpine AS deps
WORKDIR /app

# Copy package files and Prisma schema
COPY package.json package-lock.json* ./
COPY prisma ./prisma

# Install dependencies and generate Prisma client
RUN npm install
RUN npx prisma generate

# 2. Build the Next.js app
FROM node:20-alpine AS builder
WORKDIR /app

# Copy deps, prisma, and rest of the source code
COPY --from=deps /app/node_modules ./node_modules
COPY --from=deps /app/prisma ./prisma
COPY . .

# Copy env for build time (keep it clean)
COPY .env .env
RUN npm run build

# 3. Production runtime image
FROM node:20-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV PORT=8080
EXPOSE 8080

# Copy only required files for runtime
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/next.config.js ./next.config.js
COPY --from=builder /app/.env ./.env

# Start the app
CMD ["npx", "next", "start", "-p", "8080"]
