'use client';
//===
import { useEffect, useState } from 'react';
//===
import { IStackDocument } from '@/app/api/models/stacks/model_stacks';
//===
import AboutMe from '@/app/component/pageComponent/main/aboutMe';
import WriteForm from './writeForm';
import AuthButton from '@/app/component/common/authBtn';
import ModalBody from '../../common/modal';
import MakePage from '../../common/makePage';
import { CurFormatKORDate } from '../../common/CurFormatKORDate';
import ListDetailComponent from '../list/listDetail';
import WriteFormFix from './writeFormFix';
import { IPostDataWithHtml } from '@/app/api/models/posts/model_posts';
import { useMediaQuery } from '@mui/material';

//===
const MainPageComponent = ({ postData, stackData }: { postData: IPostDataWithHtml[]; stackData: IStackDocument[] }) => {
    //===
    const [isMoreBtnClick, setIsMoreBtnClick] = useState<boolean>(false);
    const [isRecentBtnClick, setIsRecentBtnClick] = useState<boolean>(false);
    const [isAddClick, setIsAddBtnClick] = useState<boolean>(false);
    const [isFixClick, setIsFixClick] = useState<boolean>(false);
    //===
    const [isLogin, setIsLogin] = useState<boolean>(false);
    //===
    const [p_data, setP_Data] = useState<IPostDataWithHtml[]>(postData);

    //===
    const [detail, setDetailData] = useState<IPostDataWithHtml>();
    //===
    //데이터 초기화
    //===
    useEffect(() => {
        setP_Data(postData);
    }, [postData]);
    //===
    const isMobile = useMediaQuery('(max-width: 768px)');
    //페이지네이션
    const [curPage, setCurPage] = useState<number>(1);

    const postsPerPage = isMobile ? 1 : 7;
    const totalPages = Math.ceil(p_data.length / postsPerPage);

    const indexOfLastPost = curPage * postsPerPage; // 마지막 인덱스 (예: 1페이지 * 5 = 5)
    const indexOfFirstPost = indexOfLastPost - postsPerPage; // 시작 인덱스 (예: 5 - 5 = 0)

    const currentPosts = p_data.slice(indexOfFirstPost, indexOfLastPost);
    const recentPosts = p_data.slice(0, 5);
    //===
    //데이터 삭제, 수정에 따른 새로고침 용
    const RefreshPostData = async () => {
        const res = await fetch('/api/controller/GET/posts');
        const data: IPostDataWithHtml[] = await res.json();
        setP_Data(data);
    };
    //===
    const DeletePost = async (id: string) => {
        const check = confirm('real?');

        if (check) {
            await fetch('/api/controller/DELETE/posts', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id }),
            });

            RefreshPostData();
            setIsRecentBtnClick(false);
            setDetailData(undefined);
        } else return;
    };
    //===
    return (
        <div className="dashboardContainer">
            <header className="dashboardHeader">
                <h1 className="dashboardTitle">DEV.LOG // SYSTEM STATUS</h1>
                {/* ======================= */}
                {/* AuthButton: Git 로그인 */}
                {/* ======================= */}
                <AuthButton isLogin={setIsLogin} />
            </header>
            {/* ======================= */}
            {/* 기본적인 자기소개*/}
            {/* ======================= */}
            <div className="" style={{ padding: '20px' }}>
                <AboutMe isLogin={isLogin} stackData={stackData} />
            </div>
            <div className="dashboardGrid">
                {/* ======================= */}
                {/* SYSTEM_STATUS */}
                {/* ======================= */}
                <div className="gridItem">
                    <h2 className="moduleTitle">[SYSTEM_STATUS]</h2>
                    <div className="chartPlaceholder">CPU: [[||||||]] 70%</div>
                </div>
                {/* ======================= */}
                {/* DOCKER_CONTAINERS*/}
                {/* ======================= */}
                <div className="gridItem">
                    <h2 className="moduleTitle">[DOCKER_CONTAINERS]</h2>
                </div>
                {/* ======================= */}
                {/* RECENT_POSTS*/}
                {/* ======================= */}
                <div className={'gridItem'}>
                    <div className={'moduleHeader'}>
                        <h2 className={'moduleTitle'}>[RECENT_POSTS]</h2>

                        <button
                            className={'dashboardBtn'}
                            onClick={() => {
                                setIsMoreBtnClick(true);
                            }}
                        >
                            [more]
                        </button>
                    </div>

                    {recentPosts.map((v) => (
                        <div
                            className="logPlaceholder"
                            key={v.slug.toString()}
                            onClick={() => {
                                setDetailData(v);
                                setIsRecentBtnClick(true);
                            }}
                        >
                            {v.title}
                        </div>
                    ))}
                </div>
            </div>
            {/* ======================= */}
            {/* More -> ADD 버튼 눌렀을 때 */}
            {/* ======================= */}
            {isAddClick && (
                <ModalBody
                    size="normal"
                    html={
                        <div className={'modalHeader'}>
                            <h2 className="moduleTitle">[ADD Form]</h2>
                            <WriteForm
                                category={['hobby', 'error', 'study']}
                                inputList={[
                                    { name: 'title', type: 'input' },
                                    { name: 'content', type: 'TextArea' },
                                    { name: 'date', type: 'input' },
                                    { name: 'slug', type: 'input' },
                                ]}
                                key={'ADD'}
                                setIsOpen={setIsAddBtnClick}
                                setPData={setP_Data}
                            />
                        </div>
                    }
                />
            )}
            {/* ======================= */}
            {/* 최근 게시물 하나 눌렀을 때 */}
            {/* ======================= */}
            {isRecentBtnClick && (
                <ModalBody
                    size="normal"
                    html={
                        <div className={'modalHeader'}>
                            <h2 className="moduleTitle">[Recent Detail]</h2>
                            <ListDetailComponent post={detail} />

                            <div style={{ display: 'flex', gap: '20px', justifyContent: 'flex-end' }}>
                                {/* ======================= */}
                                {/* DELETE */}
                                {/* ======================= */}
                                <button
                                    className={'dashboardBtn writeBtn'}
                                    onClick={() => {
                                        if (detail) DeletePost(detail._id.toString());
                                    }}
                                >
                                    [DELETE]
                                </button>
                                {/* ======================= */}
                                {/* FIX */}
                                {/* ======================= */}
                                <button
                                    className={'dashboardBtn writeBtn'}
                                    onClick={() => {
                                        setIsFixClick(true);
                                    }}
                                >
                                    [FIX]
                                </button>
                                <button
                                    className={'dashboardBtn'}
                                    onClick={() => {
                                        setIsRecentBtnClick(false);
                                        setDetailData(undefined);
                                    }}
                                >
                                    [X]
                                </button>
                            </div>
                        </div>
                    }
                />
            )}
            {/* ======================= */}
            {/* FIX  버튼 눌렀을 때*/}
            {/* ======================= */}
            {isFixClick && detail && (
                <ModalBody
                    size="normal"
                    html={
                        <div className={'modalHeader'}>
                            <h2 className="moduleTitle">[Fix Form]</h2>
                            <WriteFormFix
                                setPData={setP_Data}
                                setDetailData={setDetailData}
                                setIsOpen={setIsFixClick}
                                formData={detail}
                                category={['hobby', 'error', 'study']}
                                inputList={[
                                    { name: 'title', type: 'input' },
                                    { name: 'content', type: 'TextArea' },
                                ]}
                            />
                        </div>
                    }
                />
            )}

            {/* ======================= */}
            {/* More 버튼 눌렀을 때 */}
            {/* ======================= */}
            {isMoreBtnClick && (
                <ModalBody
                    size="normal"
                    html={
                        <>
                            <div className={'modalHeader'}>
                                <h2 className="moduleTitle">[POSTS LIST]</h2>
                                <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
                                    {isLogin && (
                                        <>
                                            {/* ======================= */}
                                            {/* DELETE */}
                                            {/* ======================= */}
                                            <button
                                                className={'dashboardBtn writeBtn'}
                                                onClick={() => {
                                                    if (detail) DeletePost(detail._id.toString());
                                                    setDetailData(undefined);
                                                }}
                                            >
                                                [DELETE]
                                            </button>
                                            {/* ======================= */}
                                            {/* FIX */}
                                            {/* ======================= */}
                                            <button
                                                className={'dashboardBtn writeBtn'}
                                                onClick={() => {
                                                    setIsFixClick(true);
                                                }}
                                            >
                                                [FIX]
                                            </button>
                                            {/* ======================= */}
                                            {/* ADD */}
                                            {/* ======================= */}
                                            <button
                                                className={'dashboardBtn writeBtn'}
                                                onClick={() => {
                                                    setIsAddBtnClick(true);
                                                    setDetailData(undefined);
                                                }}
                                            >
                                                [ADD]
                                            </button>
                                        </>
                                    )}
                                    {/* ======================= */}
                                    {/* All exit */}
                                    {/* ======================= */}
                                    <button
                                        className={'dashboardBtn'}
                                        onClick={() => {
                                            setIsMoreBtnClick(false);
                                            setIsFixClick(false);
                                            setIsMoreBtnClick(false);
                                            setIsAddBtnClick(false);
                                            setDetailData(undefined);
                                        }}
                                    >
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
                                                <div className="logPlaceholderCard_category">{v.category}</div>
                                                <div
                                                    className="logPlaceholderCard_title"
                                                    style={{ marginLeft: '15px', marginTop: 15, fontSize: '12px' }}
                                                >
                                                    {v.title}
                                                </div>
                                                <div className="logPlaceholderCard_date" style={{ textAlign: 'right' }}>
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
            )}
        </div>
    );
};

export default MainPageComponent;
