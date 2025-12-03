// src/app/api/models/mongoDB_Get.ts
"use server";

import { ConvertMarkdownToHtml } from '@/app/component/MKdouwn/transMD';
import { ConnectMongoDB } from '../ConnectMongoDB'; // 상위 폴더의 DB 연결 함수 import
import GetDataTypeSetting, { IPostData, IPostDocument } from '@/app/api/models/mDBTypeSetting'; // 모델 import
// 데이타 전부 가져오기
export async function GetPostsAllData(): Promise<IPostDocument[]> {
    const MONGO_URI = process.env.MONGO_URI;

    if (!MONGO_URI) {
        console.warn('GetPostsAllData: MONGO_URI not set. Returning empty data for BUILD.');
        return []; // DB 접근 없이 빈 배열 반환
    }
    await ConnectMongoDB();
    try {
        const posts = await GetDataTypeSetting.find({}).lean();
        return JSON.parse(JSON.stringify(posts));
    } catch (error) {
        console.error('GetPostsAllData:', error);
        throw new Error('GetPostsAllData');
    }
}
// 데이터 하나만 가져오기
export type IPostDataWithHtml = IPostData & { contentHtml: string };
export async function GetPostOneData(slug: string): Promise<IPostDataWithHtml> {
    const MONGO_URI = process.env.MONGO_URI;
    if (!MONGO_URI) {
        console.warn('GetPostsAllData: MONGO_URI not set. Returning empty data for BUILD.');
        return { category: '', content: '', contentHtml: '', date: new Date(), slug: '', title: '' }; // DB 접근 없이 빈 배열 반환
    }

    await ConnectMongoDB();
    try {
        //const { contentHtml } = await ConvertMarkdownToHtml(postPlain.content);
        const posts = await GetDataTypeSetting.find({ slug: slug }).lean();
        const jsonParsePosts = JSON.parse(JSON.stringify(posts[0]));
        const convertMarkDown = await ConvertMarkdownToHtml(jsonParsePosts.content);

        const finalPostData: IPostDataWithHtml = {
            ...jsonParsePosts,
            contentHtml: convertMarkDown.contentHtml, // ConvertMarkdownToHtml의 결과 사용
        };
        return finalPostData;
    } catch (error) {
        console.error('GetPostOneData:', error);
        throw new Error('GetPostOneData');
    }
}
