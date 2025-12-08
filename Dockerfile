# ---------------------------------------------------------------------- 
# build stage <- 의존성 설치 & Next.js 빌드
# ----------------------------------------------------------------------
FROM node:20-alpine AS builder
WORKDIR /app

COPY package.json package-lock.json ./ 

RUN npm ci 

COPY . .

RUN npm run build 

# ----------------------------------------------------------------------
# Runner stage <- 서버에서실행할 최소한의 파일
# ----------------------------------------------------------------------
FROM node:20-alpine AS runner

RUN addgroup -g 1001 -S nextjs

RUN adduser -S nextjs -u 1001 -G nextjs
ENV NODE_ENV production

ENV PORT 8080

WORKDIR /app

COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/public /public

USER nextjs
EXPOSE 8080


CMD ["node", "server.js"]