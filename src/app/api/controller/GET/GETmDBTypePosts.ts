// src/app/api/models/mongoDB_Get.ts
'use server';

import { ConvertMarkdownToHtml } from '@/app/component/MKdouwn/transMD';
import { ConnectMongoDB } from '../../ConnectMongoDB'; // 상위 폴더의 DB 연결 함수 import
import ModelPostsSetting, { BaseInsertPostType } from '../../models/posts/model_posts';
// 모델 import
// 데이타 전부 가져오기
export type IPostDataWithHtml = BaseInsertPostType & { contentHtml: string };
export async function GetPostsAllData(): Promise<IPostDataWithHtml[]> {
    const MONGO_URI = process.env.MONGO_URI;

    if (!MONGO_URI) {
        console.warn('GetPostsAllData: MONGO_URI not set. Returning empty data for BUILD.');
        return []; // DB 접근 없이 빈 배열 반환
    }
    await ConnectMongoDB();
    try {
        const posts = await ModelPostsSetting.find({}).lean();
        const returnArr: IPostDataWithHtml[] = [];
        posts.map(async (v) => {
            const jsonParsePosts = JSON.parse(JSON.stringify(v));
            const convertMarkDown = await ConvertMarkdownToHtml(jsonParsePosts.content);
            returnArr.push({ ...jsonParsePosts, contentHtml: convertMarkDown.contentHtml });
        });

        return returnArr;
    } catch (error) {
        console.error('GetPostsAllData:', error);
        throw new Error('GetPostsAllData');
    }
}
// 데이터 하나만 가져오기
//
// export async function GetPostOneData(slug: string): Promise<IPostDataWithHtml> {
//     const MONGO_URI = process.env.MONGO_URI;
//     if (!MONGO_URI) {
//         console.warn('GetPostsAllData: MONGO_URI not set. Returning empty data for BUILD.');
//         return { category: '', content: '', contentHtml: '', date: new Date(), slug: '', title: '' }; // DB 접근 없이 빈 배열 반환
//     }

//     await ConnectMongoDB();
//     try {
//         //const { contentHtml } = await ConvertMarkdownToHtml(postPlain.content);
//         const posts = await ModelPostsSetting.find({ slug: slug }).lean();
//         const jsonParsePosts = JSON.parse(JSON.stringify(posts[0]));
//         const convertMarkDown = await ConvertMarkdownToHtml(jsonParsePosts.content);

//         const finalPostData: IPostDataWithHtml = {
//             ...jsonParsePosts,
//             contentHtml: convertMarkDown.contentHtml, // ConvertMarkdownToHtml의 결과 사용
//         };
//         return finalPostData;
//     } catch (error) {
//         console.error('GetPostOneData:', error);
//         throw new Error('GetPostOneData');
//     }
// }
