# 1. Install dependencies
FROM node:20-alpine AS deps
WORKDIR /app

COPY package.json package-lock.json* ./
COPY prisma ./prisma       # ✅ THIS LINE ADDED — Important!

RUN npm install

# 2. Build the Next.js app
FROM node:20-alpine AS builder
WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules
COPY --from=deps /app/prisma ./prisma       # ✅ Ensure prisma is carried forward
COPY . .

COPY .env .env
RUN npm run build

# 3. Final runtime image
FROM node:20-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV PORT=8080
EXPOSE 8080

COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/prisma ./prisma       # ✅ Required at runtime for Prisma client
COPY --from=builder /app/next.config.js ./next.config.js
COPY --from=builder /app/.env ./.env

# Run Next.js app on Cloud Run expected port
CMD ["npx", "next", "start", "-p", "8080"]
