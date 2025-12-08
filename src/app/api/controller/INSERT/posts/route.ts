import { NextRequest, NextResponse } from 'next/server';
import { ConnectMongoDB } from '@/app/api/ConnectMongoDB';
import ModelPostsSetting from '@/app/api/models/posts/model_posts';

export async function POST(request: NextRequest) {
    try {
        await ConnectMongoDB();

        const paramData = await request.json();

        const addPosts = new ModelPostsSetting({
            title: paramData.title,
            content: paramData.content,
            category: paramData.category,
            date: paramData.date,
            slug: paramData.slug,
        });

        const dataSave = await addPosts.save();
        return NextResponse.json(dataSave, { status: 201 });
    } catch (dbError) {
        console.error('--- MongoDB Connection Fatal Error Start ---');
        console.error('MongoDB Connection Error during POST:', dbError);
        console.error('--- MongoDB Connection Fatal Error End ---');

        return NextResponse.json(
            { error: '데이터베이스 연결에 심각한 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.' },
            { status: 500 } // 500 Internal Server Error
        );
    }
}
