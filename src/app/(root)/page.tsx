import { getPostsData } from '../api/Get/MogoDB_Get';
import PostCard from '../component/card/card';
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';

const MainPage = async () => {
    const queryClient = new QueryClient();
    const postsInfo = await getPostsData();
    queryClient.setQueryData(['posts'], postsInfo);
    //데이터 직렬화
    const dehydratedState = dehydrate(queryClient);
    return (
        // globals.css에서 정의한 .main-content 클래스를 사용하여 중앙 컨테이너 설정
        <main className="main-content">
            <HydrationBoundary state={dehydratedState}>
                {/* 1. 환영 섹션 */}
                <section
                    style={{
                        padding: '60px 0',
                        textAlign: 'center',
                        maxWidth: '800px',
                        margin: '0 auto',
                    }}
                >
                    {/* 블로그 제목 (h1) */}
                    <h1
                        style={{
                            fontSize: '3rem',
                            fontWeight: '900',
                            marginBottom: '0.5rem',
                            color: '#2c2c2c', // 전역 스타일에서 사용한 진한 글자색
                        }}
                    >
                        Ma_Dev
                    </h1>

                    {/* 포인트 텍스트 */}
                    <p
                        style={{
                            fontSize: '1.25rem',
                            color: '#f7931e', // 전역 포인트 색상
                            fontWeight: '700',
                            marginBottom: '2rem',
                        }}
                    >
                        마음은 계속해서 변하는 것, 그렇기에 실체는 없는 것, 그러하니 흘려보내야 하는 것.
                    </p>
                </section>

                {/* 2. 향후 게시글 목록 등이 들어갈 자리 */}
                <section style={{ paddingTop: '40px', borderTop: '1px solid #eee' }}>
                    {/* Placeholder: 최근 게시글 목록이 여기에 표시됩니다. */}
                    <h2 style={{ textAlign: 'center', color: '#444' }}>Recent Contents</h2>
                    <div
                        style={{
                            height: '300px',
                            backgroundColor: '#f5f5f5',
                            border: '1px dashed #ddd',
                            marginTop: '20px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                    >
                        {postsInfo.map((v) => (
                            <PostCard key={v._id.toString()} post={v} />
                        ))}
                    </div>
                </section>
            </HydrationBoundary>
        </main>
    );
};

export default MainPage;
