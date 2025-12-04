'use client';

import { useState } from 'react';
import WriteFormUser from './writeFormUser';

const AboutMe = ({ isLogin }: { isLogin: boolean }) => {
    const [isClick, setIsClick] = useState<boolean>(false);
    const ClickBtn = () => {
        console.log('test');
    };

    return (
        <section className="dev-intro-section">
            <div className="intro-text">
                <h2 className="intro-title" style={{ display: 'flex', gap: '10px' }}>
                    Ma_Dev
                    {isLogin && (
                        <button
                            className="control-btn plus-btn"
                            title="스택 보기"
                            onClick={() => {
                                setIsClick(!isClick);
                            }}
                        >
                            +
                        </button>
                    )}
                </h2>
                <p className="intro-bio">평범한 개발자입니다.</p>
            </div>

            <div className="tech-stack-container">
                <span className="stack-badge">OCI</span>
                <span className="stack-badge">TypeScript</span>
                <span className="stack-badge">React</span>
                <span className="stack-badge">MongoDB</span>
                <span className="stack-badge">NextJS</span>
                <span className="stack-badge">Docker</span>
            </div>

            {isClick && (
                <>
                    <WriteFormUser
                        inputList={[
                            { name: 'stack', type: 'input' },
                            { name: 'slug', type: 'input' },
                        ]}
                    />
                </>
            )}
        </section>
    );
};
export default AboutMe;
