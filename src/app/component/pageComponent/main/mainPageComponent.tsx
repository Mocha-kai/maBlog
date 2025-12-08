'use client';
//===
import { useState } from 'react';
//===
import { IStackDocument } from '@/app/api/models/stacks/model_stacks';
//===
import AboutMe from '@/app/component/pageComponent/main/aboutMe';
import PostCard from '../../card/card';
import WriteForm from './writeForm';
import AuthButton from '@/app/component/common/authBtn';
import ModalBody from '../../common/modal';
import MakePage from '../../common/makePage';
import { CurFormatKORDate } from '../../common/CurFormatKORDate';
import ListDetailComponent from '../list/listDetail';
import { IPostDataWithHtml } from '@/app/api/controller/GET/GETmDBTypePosts';

//===
const MainPageComponent = ({ postData, stackData }: { postData: IPostDataWithHtml[]; stackData: IStackDocument[] }) => {
    //===
    const [isMoreBtnClick, setIsMoreBtnClick] = useState<boolean>(false);
    const [isRecentBtnClick, setIsRecentBtnClick] = useState<boolean>(false);

    const [isLogin, setIsLogin] = useState<boolean>(false);
    //===
    const [p_data, setP_Data] = useState<IPostDataWithHtml[]>(postData);
    const [s_data, setS_Data] = useState<IStackDocument[]>([]);
    //===
    const [detail, setDetailData] = useState<IPostDataWithHtml>({
        category: '',
        content: '',
        contentHtml: '',
        date: new Date(),
        slug: '',
        title: '',
    });
    //===
    //데이터 초기화
    //===

    //===
    //페이지네이션
    const [curPage, setCurPage] = useState<number>(1);

    const postsPerPage = 8;
    const totalPages = Math.ceil(p_data.length / postsPerPage);

    const indexOfLastPost = curPage * postsPerPage; // 마지막 인덱스 (예: 1페이지 * 5 = 5)
    const indexOfFirstPost = indexOfLastPost - postsPerPage; // 시작 인덱스 (예: 5 - 5 = 0)

    const currentPosts = p_data.slice(indexOfFirstPost, indexOfLastPost);
    const recentPosts = currentPosts.slice(0, 5);
    //===
    return (
        <div className="dashboardContainer">
            {/* 1. 상단 제목 */}
            <header className="dashboardHeader">
                <h1 className="dashboardTitle">DEV.LOG // SYSTEM STATUS</h1>
            </header>

            {/* 2. 메인 그리드 영역 (모니터링 & 최신 로그) */}
            <div className="dashboardGrid">
                {/* A. SYSTEM_STATUS 모듈 (좌상단) */}
                <div className="gridItem">
                    <h2 className="moduleTitle">[SYSTEM_STATUS]</h2>
                    {/* CPU, RAM 게이지가 들어갈 자리 */}
                    <div className="chartPlaceholder">CPU: [[||||||]] 70%</div>
                </div>

                {/* C. DOCKER_CONTAINERS (좌하단) */}
                <div className="gridItem">
                    <h2 className="moduleTitle">[DOCKER_CONTAINERS]</h2>
                    {/* 컨테이너 리스트가 들어갈 자리 */}
                </div>

                <div className={'gridItem'}>
                    <div className={'moduleHeader'}>
                        {/* 버튼 추가를 위한 새 div */}
                        <h2 className={'moduleTitle'}>[RECENT_POSTS]</h2>

                        <button
                            className={'writeButton'}
                            onClick={() => {
                                setIsMoreBtnClick(true);
                            }} // 클릭 이벤트 추가
                        >
                            [more list...]
                        </button>
                    </div>

                    {/* 최근 포스팅*/}
                    <div className={'logContent'}>
                        {recentPosts.map((v) => (
                            <div
                                key={v.slug.toString()}
                                onClick={() => {
                                    setDetailData(v);
                                    setIsRecentBtnClick(true);
                                }}
                            >
                                <div className="logPlaceholder">{v.title}</div>
                            </div>
                        ))}
                    </div>
                </div>
                {/* 명령 프롬프트 (가장 하단) */}
                <div className="promptArea">user@my-dev-blog:_</div>
            </div>

            {isRecentBtnClick && (
                <ModalBody
                    setClick={setIsRecentBtnClick}
                    html={
                        <>
                            <ListDetailComponent post={detail} />

                            <button
                                className={'closeButton'}
                                onClick={() => {
                                    setIsRecentBtnClick(false);
                                }}
                            >
                                [X]
                            </button>
                        </>
                    }
                />
            )}
            {isMoreBtnClick && (
                <>
                    <ModalBody
                        setClick={setIsMoreBtnClick}
                        html={
                            <>
                                <div className={'modalHeader'}>
                                    <h2 className="moduleTitle">[POSTS LIST]</h2>
                                    <div style={{ display: 'flex', gap: '10px' }}>
                                        <button className={'closeButton writeButton'}>[ADD]</button>

                                        <button className={'closeButton'} onClick={() => setIsMoreBtnClick(false)}>
                                            [X]
                                        </button>
                                    </div>
                                </div>
                                <div className={'logList'}>
                                    <div className="logListLeft">
                                        <div className="LeftContent">
                                            {currentPosts.map((v) => (
                                                <div
                                                    className="logPlaceholderCard"
                                                    key={v.slug.toString()}
                                                    onClick={() => {
                                                        setDetailData(v);
                                                    }}
                                                >
                                                    <div>{v.category}</div>
                                                    <div style={{ marginLeft: '30px', marginTop: 15 }}>{v.title}</div>
                                                    <div style={{ textAlign: 'right' }}>
                                                        {CurFormatKORDate(v.date.toString())}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                        {p_data.length > 0 && (
                                            <MakePage
                                                totalPages={totalPages}
                                                currentPage={curPage}
                                                onPageChange={setCurPage}
                                            />
                                        )}
                                    </div>
                                    <div className="logListRight">
                                        <ListDetailComponent post={detail} />
                                    </div>
                                </div>
                            </>
                        }
                    />
                </>
            )}
        </div>
    );
};

export default MainPageComponent;
