'use client';

import { ReactNode } from 'react';

// ⭐️ 모달 컴포넌트 뼈대 (Terminal 스타일)
const ModalBody = ({ setClick, html }: { setClick: (bool: boolean) => void; html: ReactNode }) => (
    <div
        className={'modalBackdrop'}
        onClick={(e) => {
            if (e.target === e.currentTarget) setClick(false);
        }}
    >
        <div className={'modalContent'}>{html}</div>
    </div>
);

export default ModalBody;
