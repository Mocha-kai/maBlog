// src/app/api/models/mongoDB_Get.ts
'use server';

import { ConvertMarkdownToHtml } from '@/app/component/MKdouwn/transMD';
import { ConnectMongoDB } from '../../ConnectMongoDB'; // 상위 폴더의 DB 연결 함수 import
import ModelPostsSetting, { IPostDataWithHtml } from '../../models/posts/model_posts';
// 모델 import
// 데이타 전부 가져오기
export async function GetPostsAllData(): Promise<IPostDataWithHtml[]> {
    const MONGO_URI = process.env.MONGO_URI;

    if (!MONGO_URI) return [];

    await ConnectMongoDB();

    try {
        const posts = await ModelPostsSetting.find({}).sort({ date: -1 }).lean(); // ← plain object

        const returnArr: IPostDataWithHtml[] = await Promise.all(
            posts.map(async (p) => {
                const convert = await ConvertMarkdownToHtml(p.content);
                return {
                    ...p,
                    _id: p._id.toString(), // string 변환
                    contentHtml: convert.contentHtml,
                };
            })
        );

        return returnArr;
    } catch (err) {
        console.error(err);
        throw new Error('GetPostsAllData');
    }
}
