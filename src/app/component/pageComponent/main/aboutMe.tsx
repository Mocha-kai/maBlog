'use client';

import { useState } from 'react';
import WriteFormStack from './writeFormUser';
import { IStackDocument } from '@/app/api/models/stacks/model_stacks';
import ModalBody from '../../common/modal';

const AboutMe = ({ isLogin, stackData }: { isLogin: boolean; stackData: IStackDocument[] }) => {
    const [data, setData] = useState<IStackDocument[]>(stackData);
    const [isClick, setIsClick] = useState<boolean>(false);
    const [pos, setPos] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

    if (!data) return;
    return (
        <section className="devBody">
            <h3 className="devTitle" style={{ display: 'flex', gap: '20px' }}>
                Ma_Dev
                {isLogin && (
                    <button
                        className="dashboardBtn"
                        title="p_btn"
                        onClick={(e) => {
                            setIsClick(!isClick);
                            setPos({ x: e.clientX - 15, y: e.clientY + 30 });
                        }}
                    >
                        +
                    </button>
                )}
            </h3>
            <p className="devMsg">평범한 개발자입니다.</p>

            <div className="tech-stack-container">
                {data.map((v) => (
                    <span className="stack-badge" style={{ backgroundColor: v.color }} key={v.slug}>
                        {v.stack}
                    </span>
                ))}
            </div>

            {isClick && (
                <ModalBody
                    pos={pos}
                    size="mini"
                    html={
                        <WriteFormStack
                            setS_Data={setData}
                            setIsOpen={setIsClick}
                            inputList={[
                                { name: 'stack', type: 'input' },
                                { name: 'color', type: 'input' },
                                { name: 'slug', type: 'input' },
                            ]}
                        />
                    }
                />
            )}
        </section>
    );
};
export default AboutMe;
