'use client';


import { CurFormatKORDate } from '../../common/CurFormatKORDate';

import Link from 'next/link';
import { useState } from 'react';
import MakePage from '../../common/makePage';
import { BaseInsertPostType } from '@/app/api/models/posts/model_posts';


const ListMain = ({ postsInfo }: { postsInfo: BaseInsertPostType[] }) => {
    const [curPage, setCurPage] = useState<number>(1);

    const postsPerPage = 4;
    const totalPages = Math.ceil(postsInfo.length / postsPerPage);

    const indexOfLastPost = curPage * postsPerPage; // 마지막 인덱스 (예: 1페이지 * 5 = 5)
    const indexOfFirstPost = indexOfLastPost - postsPerPage; // 시작 인덱스 (예: 5 - 5 = 0)

    const currentPosts = postsInfo.slice(indexOfFirstPost, indexOfLastPost);

    return (
        <>
            <div className={'studyContainer'}>
                <h1 className={'pageTitle'}>List</h1>
                <div className={'mainContent'}>
                    {currentPosts.map((post) => (
                        <Link
                            href={`/${post.category.toLowerCase()}/detail/${post.slug}`}
                            key={post.slug}
                            className={'listItemContainer'}
                        >
                            <div className={'mainInfo'}>
                                <h2 className={'itemTitle'}>{post.title}</h2>
                                <p className={'itemSummary'}>{post.slug}</p>
                            </div>
                            <div className={'meta'}>
                                <span className={'categoryTag'}>{post.category}</span>
                                <span className={'dateText'}>{CurFormatKORDate(post.date.toString())}</span>
                            </div>
                        </Link>
                    ))}

                    {postsInfo.length > 0 && (
                        <MakePage
                            totalPages={totalPages}
                            currentPage={curPage}
                            onPageChange={setCurPage}
                        />
                    )}
                </div>
            </div>
        </>
    );
};

export default ListMain;