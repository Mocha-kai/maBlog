// src/app/api/models/mongoDB_Get.ts

import { ConnectMongoDB } from '../ConnectMongoDB'; // 상위 폴더의 DB 연결 함수 import
import GetDataTypeSetting, { IPostData } from '@/app/api/models/mDBTypeSetting'; // 모델 import

// 데이터베이스에서 게시글 목록을 가져오는 핵심 함수
export async function getPostsData(): Promise<IPostData[]> {
    // 1. DB 연결 보장
    await ConnectMongoDB();

    try {
        const posts = await GetDataTypeSetting.find({}).lean();
        return JSON.parse(JSON.stringify(posts)) as IPostData[];
    } catch (error) {
        console.error('데이터 조회 중 오류 발생:', error);
        throw new Error('게시글 데이터를 가져오는 데 실패했습니다.');
    }
}
