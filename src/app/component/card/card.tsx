'use client';

import Style from './card.module.css';
import { IPostData } from '@/app/api/models/mDBTypeSetting';
import { formatPostDate } from '../common/curTimeFormat';
import Link from 'next/link';

const PostCard = ({ post }: { post: IPostData }) => {
    //날짜변경
    const formatDate = formatPostDate(post.date);

    console.log('test: ', `/${post.category.toLowerCase()}/detail/${post.slug}`);

    return (
        <Link className={Style.cardContainer} href={`/${post.category.toLowerCase()}/detail/${post.slug}`}>
            <div className={Style.meta}>
                <span className={Style.categoryTag}>{post.category}</span>
                <span className={Style.dateText}>{formatDate}</span>
            </div>
            <h3 className={Style.cardTitle}>{post.title}</h3>
            <p className={Style.cardSummary}>{post.content}</p>
        </Link>
    );
};

export default PostCard;
