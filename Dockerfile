# ---------------------------------------------------------------------- 
# build stage <- 의존성 설치 & Next.js 빌드
# ----------------------------------------------------------------------
FROM node:20-alpine AS builder
WORKDIR /app
# package.json 캐싱
COPY package.json package-lock.json ./ 
# ci로 의존성 설치
RUN npm ci 
# 나머지 복사
COPY . .
# Next.js 앱 빌드 
RUN npm run build 

# ----------------------------------------------------------------------
# Runner stage <- 서버에서실행할 최소한의 파일
# ----------------------------------------------------------------------
FROM node:20-alpine AS runner

# Next.js의 보안 권장 사항 <- 루트 사용 x 
# 보안을 위해서 nextjs 라는 신규 그룹을 만든다.
RUN addgroup -g 1001 -S nextjs
#adduser -S<-신규 사용자 계정을 만들고 -G <- nextjs 그룹으로 엮는다.
RUN adduser -S nextjs -u 1001 -G nextjs
ENV NODE_ENV production
# OCI에서 포트포워딩을 위해 8080으로 변경
ENV PORT 8080

WORKDIR /app

# [수정] 빌드 결과물 복사: standalone 모드에서는 '.next/standalone' 디렉토리만 복사합니다.
# 이 디렉토리에는 node_modules까지 포함되어 있어 이미지 크기를 최소화합니다.
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/public /public

# 비루트 사용자로 전환 (보안 강화)
USER nextjs

EXPOSE 8080

# Next.js 서버를 직접 실행하도록 명령어 변경
# standalone 모드에서는 'server.js'가 시작 파일입니다.
CMD ["node", "server.js"]