// src/app/api/posts/route.ts

import { NextResponse } from 'next/server';
import { ConnectMongoDB } from '@/app/api/ConnectMongoDB'; // DB 연결 함수
import GetDataTypeSetting from '@/app/api/models/mDBTypeSetting'; // Mongoose 모델

export async function GET() {
    try {
        await ConnectMongoDB();
        const posts = await GetDataTypeSetting.find({}).sort({ date: -1 }).lean();

        return NextResponse.json(posts, { status: 200 });
    } catch (error) {
        console.error('API Error:', error);
        return NextResponse.json({ message: 'Failed to fetch posts' }, { status: 500 });
    }
}
