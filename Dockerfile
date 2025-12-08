# ---------------------------
# Build Stage: 의존성 설치 + Next.js 빌드
# ---------------------------
FROM node:20-alpine AS builder
WORKDIR /app

# package.json 캐싱 → 빌드 속도 최적화
COPY package.json package-lock.json ./
RUN npm ci

# 소스코드 전체 복사
COPY . .
# Next.js 앱 빌드 (standalone 모드)
RUN npm run build

# ---------------------------
# Runner Stage: 빌드 결과만 최소화해서 실행
# ---------------------------
FROM node:20-alpine AS runner

# 비루트 사용자 생성 (보안 강화)
RUN addgroup -S nextjs && adduser -S nextjs -G nextjs
ENV NODE_ENV=production
ENV PORT=8080

WORKDIR /app

# standalone 빌드 결과물만 복사 → 이미지 최소화
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/public /public

# 비루트 사용자로 전환
USER nextjs

EXPOSE 8080
# standalone 모드 실행 파일 server.js
CMD ["node", "server.js"]
