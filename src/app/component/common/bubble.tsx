'use client';

const Bubble = ({
    pos,
    setDelete,
    isOpen,
}: {
    pos: { x: number; y: number };
    setDelete: (bool: boolean) => void;
    isOpen: (bool: boolean) => void;
}) => {
    return (
        <div
            id="bubble"
            className="speech-bubble"
            style={{ left: pos?.x, top: pos?.y, display: 'flex', justifyContent: 'space-between' }}
        >
            <span className="bubble-tail">Delete?</span>
            <div style={{ display: 'flex', gap: '10px' }}>
                <button className="dashboardBtn" onClick={() => setDelete(true)}>
                    Y
                </button>
                <button className="dashboardBtn" onClick={() => isOpen(false)}>
                    N
                </button>
            </div>
        </div>
    );
};

export default Bubble;
