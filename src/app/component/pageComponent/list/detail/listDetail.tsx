'use client';

import 'prismjs/themes/prism-tomorrow.css';
import { CurFormatKORDate } from '@/app/component/common/CurFormatKORDate';
import { IPostDataWithHtml } from '@/app/api/controller/GET/GETmDBTypePosts';

const ListDetailComponent = ({ post }: { post: IPostDataWithHtml }) => {
    return (
        <article className="articleContainer">
            {/* 상단 메타 정보 */}
            <header className="header">
                {/* 카테고리 태그 (주황색 포인트) */}
                <span className="categoryTag">{post.category}</span>

                {/* 제목 */}
                <h1 className="title">{post.title}</h1>

                {/* 날짜 */}
                <p className="dateMeta">
                    <time dateTime={CurFormatKORDate(post.date.toString())}>
                        date: {CurFormatKORDate(post.date.toString())}
                    </time>
                </p>
            </header>

            {/* 본문 영역 */}
            <div className="markdown-body" dangerouslySetInnerHTML={{ __html: post.contentHtml }} />

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
                    <span>return list</span>
                </a>
            </footer>
        </article>
    );
};
export default ListDetailComponent;
