# ----------------------------------------------------------------------
# [빌드 스테이지]: 의존성 설치 및 Next.js 앱 빌드 (NPM 사용)
# ----------------------------------------------------------------------
FROM node:20-alpine AS builder

WORKDIR /app
# package.json 파일과 잠금 파일을 복사하여 의존성 레이어 캐싱
COPY package.json package-lock.json ./ 
# npm ci: package-lock.json을 사용해 깨끗하게 의존성 설치
RUN npm ci 
# 나머지 소스 코드 복사
COPY . .

# Next.js 앱 빌드 전
# 이 부분이 빌드 시 DB 연결을 막는 역할을 합니다.
ENV MONGO_URI=
# Next.js 앱 빌드 
RUN npm run build 

# ----------------------------------------------------------------------
# [실행 스테이지]: 프로덕션에서 실행할 가벼운 이미지 (NPM 사용)
# ----------------------------------------------------------------------
FROM node:20-alpine AS runner

# Next.js의 보안 권장 사항에 따라 비루트(non-root) 사용자 생성
RUN addgroup -g 1001 -S nextjs
RUN adduser -S nextjs -u 1001 -G nextjs

ENV NODE_ENV production
ENV PORT 3000

WORKDIR /app

# 빌드 결과물과 실행에 필요한 파일만 복사
COPY --from=builder /app/package.json /app/package.json
COPY --from=builder /app/node_modules /app/node_modules
COPY --from=builder /app/.next /app/.next
COPY --from=builder /app/public /app/public

# 비루트 사용자로 전환 (보안 강화)
USER nextjs

EXPOSE 3000

# Next.js 서버를 직접 실행하도록 명령 설정
CMD ["npm", "start"]