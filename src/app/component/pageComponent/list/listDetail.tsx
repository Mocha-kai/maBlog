'use client';

import 'prismjs/themes/prism-tomorrow.css';
import { CurFormatKORDate } from '@/app/component/common/CurFormatKORDate';
import { IPostDataWithHtml } from '@/app/api/models/posts/model_posts';

const ListDetailComponent = ({ post }: { post?: IPostDataWithHtml }) => {
    if (!post) return 'No Posts Data';
    return (
        <article className="articleContainer">
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
        </article>
    );
};
export default ListDetailComponent;
