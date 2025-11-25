'use client';

import { useEffect, useState } from 'react';

const CurTime = () => {
    const [currentTime, setCurrentTime] = useState(new Date());

    useEffect(() => {
        // 1초마다 현재 시각을 업데이트
        const timerId = setInterval(() => {
            setCurrentTime(new Date());
        }, 1000);

        // 컴포넌트가 언마운트될 때 타이머 정리
        return () => clearInterval(timerId);
    }, []);

    // 시간을 'YYYY. MM. DD. HH:MM:SS' 형식으로 포맷
    const formattedTime = currentTime
        .toLocaleString('ko-KR', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: false, // 24시간제
        })
        .replace(/\. /g, '.')
        .replace(/\. 오전|\. 오후/g, '');

    return (
        <span className="hidden sm:inline text-xs text-slate-400 dark:text-gray-600 ml-4 border-l pl-4 border-slate-200 dark:border-gray-700">
            {formattedTime}
        </span>
    );
};

export default CurTime;
