// tailwind.config.ts

import type { Config } from 'tailwindcss';

const config: Config = {
    // PostCSS가 이 경로를 통해 Tailwind 클래스를 찾아냅니다.
    content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
    // darkMode 설정 확인 (선택 사항)
    darkMode: 'class',
    theme: {
        extend: {},
    },
    plugins: [],
};
export default config;
