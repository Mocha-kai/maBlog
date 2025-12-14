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
import GetDockerrState from '../../common/getDockerState';
import DockerContainersBox from '../../common/getDockerState';
import GetServerState from '../../common/getServerState';
import { Height } from '@mui/icons-material';

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
    //===
    const [curPage, setCurPage] = useState<number>(1);

    const perPage = isMobile ? 2 : 7;
    const totalPage = Math.ceil(p_data.length / perPage);

    const lastIndex = curPage * perPage;
    const startIndex = lastIndex - perPage;
    //리스트에 보이는 부분
    const curPosts = p_data.slice(startIndex, lastIndex);
    //메인 화면에 보이는 부분
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
       
            <AboutMe isLogin={isLogin} stackData={stackData} />
   
            <div className="dashboardGrid">
                {/* ======================= */}
                {/* SYSTEM_STATUS */}
                {/* ======================= */}
                <div className="gridItem">
                    <h2 className="moduleTitle">[SYSTEM_STATUS]</h2>
                   <GetServerState />
                </div>
                {/* ======================= */}
                {/* DOCKER_CONTAINERS*/}
                {/* ======================= */}
                <div className="gridItem">
                    <h2 className="moduleTitle">[DOCKER_CONTAINERS]</h2>
                    <DockerContainersBox />
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
                        <>
                            <div className={'modalHeader'}>
                                <h2 className="moduleTitle">[ADD Form]</h2>
                            </div>
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
                        </>
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
                        <>
                            <div className={'modalHeader'}>
                                <h2 className="moduleTitle">[Recent Detail]</h2>
                            </div>
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
                            <div className={isMobile ? 'm_recent' : ''}> 
                                <ListDetailComponent post={detail} type='recent' />
                            </div>

                        </>
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
                        <>
                            <div className={'modalHeader'}>
                                <h2 className="moduleTitle">[Fix Form]</h2>
                            </div>
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
                        </>
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
                                <h2 className="moduleTitle">[POST LIST]</h2>
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
                                                    if (detail) {
                                                        setIsFixClick(true);
                                                    }
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
                            {/* ======================= */}
                            {/* More 창에서 리스트와 디테일 보이는 부분 */}
                            {/* ======================= */}
                            <div className={'logList'}>
                                <div className="logListLeft">
                                    <div className="LeftContent">
                                        {curPosts.map((v) => (
                                            <div
                                                className="logPlaceholderCard"
                                                key={v.slug.toString()}
                                                onClick={() => {
                                                    setDetailData(v);
                                                }}
                                            >
                                                <div className="logPlaceholderCard_category">{v.category}</div>
                                                <div
                                                    style={{
                                                        display: 'flex',
                                                        flexDirection: 'row',
                                                        justifyContent: 'space-between',
                                                    }}
                                                >
                                                    <div className="logPlaceholderCard_title" style={{}}>
                                                        {v.title}
                                                    </div>
                                                    <div
                                                        className="logPlaceholderCard_date"
                                                        style={{ textAlign: 'right' }}
                                                    >
                                                        {CurFormatKORDate(v.date.toString())}
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                    {/* ======================= */}
                                    {/* 페이지네이션 */}
                                    {/* ======================= */}
                                    {p_data.length > 0 ? (
                                        <MakePage
                                            totalPages={totalPage}
                                            currentPage={curPage}
                                            onPageChange={setCurPage}
                                        />
                                    ) : (
                                        <p>No Post</p>
                                    )}
                                </div>
                                {/* ======================= */}
                                {/* 상세보기 */}
                                {/* ======================= */}
                                <div className="logListRight">
                                    <ListDetailComponent post={detail} type='more'/>
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
