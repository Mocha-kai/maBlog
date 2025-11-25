import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
    /* config options here */
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'images.unsplash.com', // 👈 여기에 허용할 도메인 등록
                port: '',
                pathname: '/**', // 해당 도메인의 모든 경로 허용
            },
        ],
    },
};

export default nextConfig;
