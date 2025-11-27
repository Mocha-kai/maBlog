'use client';

import { formatPostDate } from '@/app/component/common/curTimeFormat';
import { usePost } from '@/hooks/usePosts';
import '@/app/css/study/studyDetail.css';
// ⚠️ Prism.js 테마 CSS 임포트 추가 (예시: Dark 테마)
import 'prismjs/themes/prism-tomorrow.css';

const StudyDetailComponent = ({ slug }: { slug: string }) => {
    //데이터 가져오기.
    const post = usePost(slug);
    if (!post.data) return;

    return (
        <article className="articleContainer">
            {/* 상단 메타 정보 */}
            <header className="header">
                {/* 카테고리 태그 (주황색 포인트) */}
                <span className="categoryTag">{post.data?.category}</span>

                {/* 제목 */}
                <h1 className="title">{post.data?.title}</h1>

                {/* 날짜 */}
                <p className="dateMeta">
                    <time dateTime={post.data && formatPostDate(post.data.date)}>
                        게시일: {post.data && formatPostDate(post.data.date)}
                    </time>
                </p>
            </header>

            {/* 본문 영역 */}
            <div className="contentArea">
                {/* 본문 내용 */}
                <p></p>

                {/* 추가 더미 콘텐츠로 볼륨감 부여 */}
                <h2>핵심 정리</h2>
                <p>
                    이 문서는 React Query를 Next.js App Router에서 사용하는 Hydration 패턴을 다루고 있습니다. 서버
                    컴포넌트에서 데이터를 프리페칭하고, 그 데이터를 클라이언트 컴포넌트의 캐시에 주입함으로써 초기 로딩
                    속도를 획기적으로 개선합니다. 특히 목록 페이지에서 가져온 데이터를 상세 페이지에서 재활용하는 방식은
                    불필요한 네트워크 트래픽을 줄이는 가장 효율적인 방법입니다.
                </p>

                <ul>
                    <li>`page.tsx` (서버)에서 데이터 Hydration 수행.</li>
                    <li>`usePost` (클라이언트)에서 `initialData`로 캐시 재활용.</li>
                    <li>`queryFn`은 캐시 만료 시 백그라운드 재검증 용도로만 사용.</li>
                </ul>

                <blockquote className="blockquote">
                    코드는 작성하는 것보다 읽는 시간이 훨씬 길다 - 마틴 파울러
                </blockquote>
            </div>

            {/* 푸터 또는 돌아가기 버튼 영역 */}
            <footer className="footer">
                {/* 목록으로 돌아가기 버튼 */}
                <a href="/study" className="backLink">
                    {/* SVG는 인라인으로 유지 */}
                    <svg
                        style={{ width: '16px', height: '16px' }}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M10 19l-7-7m0 0l7-7m-7 7h18"
                        ></path>
                    </svg>
                    <span>목록으로 돌아가기</span>
                </a>
            </footer>
        </article>
    );
};
export default StudyDetailComponent;
