import React, { useState } from 'react';
import ReactDOM from 'react-dom';

const Portal = ({ children, selector }: { children: React.ReactNode; selector: string }) => {
    const [targetEl] = useState(() => {
        if (typeof window !== 'undefined') return document.querySelector(selector);
        return null;
    });

    if (!targetEl) {
        if (process.env.NODE_ENV !== 'production')
            console.error(`Portal: Target selector "${selector}" not found in DOM.`);
        return null;
    }
    return ReactDOM.createPortal(children, targetEl);
};

export default Portal;
