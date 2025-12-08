'use client';

import { useState } from 'react';
import WriteFormStack from './writeFormUser';
import { IStackDocument } from '@/app/api/models/stacks/model_stacks';

const AboutMe = ({ isLogin, stackData }: { isLogin: boolean; stackData: IStackDocument[] }) => {
    const [isClick, setIsClick] = useState<boolean>(false);

    return (
        <section className="dev-intro-section">
            <div className="intro-text">
                <h2 className="intro-title" style={{ display: 'flex', gap: '10px' }}>
                    Ma_Dev
                    {isLogin && (
                        <button
                            className="control-btn plus-btn"
                            title="insertBtn"
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
            <div className="tech-stack-container" >
            {stackData.map((v) => (
                    <span className="stack-badge" style={{ backgroundColor: v.color }} key={v.slug}>
                        {v.stack}
                    </span>
            ))}
            </div>

            {isClick && (
                <WriteFormStack
                    inputList={[
                        { name: 'stack', type: 'input' },
                        { name: 'color', type: 'input' },
                        { name: 'slug', type: 'input' },
                    ]}
                />
            )}
        </section>
    );
};
export default AboutMe;
