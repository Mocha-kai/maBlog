import type { NextConfig } from 'next';

// next.config.js (모든 설정이 포함되어 있어야 합니다.)
const NextConfig: NextConfig = {
    // 💡 도커 환경에 최적화된 배포를 위해 'standalone' 모드를 활성화합니다.
    // 이 모드는 필요한 파일만 .next/standalone 디렉토리에 모아 이미지 크기를 최소화합니다.
    output: 'standalone', 

    // 이전 오류를 해결하기 위해 revalidate=0 설정이 필요했던 페이지가 있다면
    // 이 설정이 빌드 성공 후에도 그 역할을 수행합니다.
};

module.exports = NextConfig;