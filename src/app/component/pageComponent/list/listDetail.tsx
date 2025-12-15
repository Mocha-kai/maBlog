'use client';

import 'prismjs/themes/prism-tomorrow.css';
import { CurFormatKORDate } from '@/app/component/common/CurFormatKORDate';
import { IPostDataWithHtml } from '@/app/api/models/posts/model_posts';

type ListDataType = 'recent' | 'more';
const ListDetailComponent = ({ post, type }: { post?: IPostDataWithHtml; type:ListDataType }) => {
    if (!post) return 'No Posts Data';
    return (
        <article className={type === "more" ? "articleContainer" : "articleContainer_recent"}>
            <header className="header">
                {/* 카테고리 태그 (CRT 색상 바탕색) */}
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
            <div className={type==="recent"? "markdown-body recent" :"markdown-body"} dangerouslySetInnerHTML={{ __html: post.contentHtml }} /> 
        </article>
    );
};
export default ListDetailComponent;
