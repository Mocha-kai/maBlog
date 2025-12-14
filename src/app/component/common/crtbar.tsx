'use client';

interface Props {
    label: string;
    percent: number; // 0~100
    text: string;
}

export default function CRTBar({ label, percent, text }: Props) {
    const safePercent = Number.isFinite(percent) ? Math.max(0, Math.min(100, percent)) : 0;
    const filled = Math.round(safePercent / 5); // 0~20
    const empty = 20 - filled; // 0~20

    return (
        <div className="crt-bar">
            <span className="crt-label">{label}</span> 
            <span className="crt-bar-inner">[{'█'.repeat(filled) + '░'.repeat(empty)}]&nbsp;{text}</span>
        </div>
    );
}
