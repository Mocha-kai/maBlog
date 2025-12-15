'use client';

import { ReactNode, useEffect } from 'react';
import Portal from './portal';

type SizeType = 'mini' | 'normal';
type PosType = {
    x: number;
    y: number;
};
const ModalBody = ({
    isOpen,
    html,
    size,
    pos,
}: {
    isOpen: boolean;
    html: ReactNode;
    size: SizeType;
    pos?: PosType;
}) => {
    useEffect(() => {
        if (isOpen) document.body.classList.add('body-modal-close');
        else document.body.classList.remove('body-modal-close');
        return () => {
            document.body.classList.remove('body-modal-close');
        };
    }, [isOpen]);

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
