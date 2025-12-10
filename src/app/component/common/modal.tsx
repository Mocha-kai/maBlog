'use client';

import { ReactNode } from 'react';
import Portal from './portal';

type SizeType = 'mini' | 'normal';
type PosType = {
    x: number;
    y: number;
};
const ModalBody = ({ html, size, pos }: { html: ReactNode; size: SizeType; pos?: PosType }) => {
    return size === 'mini' ? (
        <div className={'modalBackdrop-mini'} style={{ left: pos?.x, top: pos?.y }}>
            <div className={'modalContent-mini'}>{html}</div>
        </div>
    ) : (
        <Portal selector="#modal-root">
            <div className={'modalBackdrop'}>
                <div className={'modalContent'}>{html}</div>
            </div>
        </Portal>
    );
};

export default ModalBody;
