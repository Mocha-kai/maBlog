'use client';

interface Props {
    label: string;
    percent: number; // 0~100
    text: string;
}

export default function CRTBar({ label, percent, text }: Props) {
    // 1) percent가 NaN, 음수, 초과 값일 때도 안전화
    const safePercent = Number.isFinite(percent) ? Math.max(0, Math.min(100, percent)) : 0;

    // 2) 0~100 사이 값이 보장됨
    const filled = Math.round(safePercent / 5); // 0~20
    const empty = 20 - filled; // 0~20

    return (
        <div className="crt-bar">
            <span className="crt-label">{label}</span>
            <span className="crt-bar-inner">[{'█'.repeat(filled) + '░'.repeat(empty)}]</span>
            <span className="crt-bar-inner">{text}</span>
        </div>
    );
}
