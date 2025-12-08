'use server';

import { ConnectMongoDB } from '../../ConnectMongoDB'; // 상위 폴더의 DB 연결 함수 import
import ModelStacksSetting, { IStackDocument } from '../../models/stacks/model_stacks';


// 데이타 전부 가져오기
export async function GetStackAllData(): Promise<IStackDocument[]> {
    const MONGO_URI = process.env.MONGO_URI;

    if (!MONGO_URI) {
        console.warn('GetPostsAllData: MONGO_URI not set. Returning empty data for BUILD.');
        return []; // DB 접근 없이 빈 배열 반환
    }

    try {
        await ConnectMongoDB();
        
        const stacks = await ModelStacksSetting.find({}).lean();

        console.log('stacks', stacks);
        return JSON.parse(JSON.stringify(stacks));
    } catch (error) {
        console.error('GetPostsAllData:', error);
        throw new Error('GetPostsAllData');
    }
}
