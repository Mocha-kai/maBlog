'use client';

import Link from 'next/link';
import Style from './card.module.css';
import { IPostData } from '@/app/api/models/mDBTypeSetting';
import { CurFormatKORDate}  from '@/app/component/common/CurFormatKORDate';

const PostCard = ({ post }: { post: IPostData }) => {
    //날짜변경
    const formatDate = CurFormatKORDate(post.date.toString());
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
