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
            date: new Date(paramData.date),
            slug: paramData.slug,
        });

        const dataSave = await addPosts.save();
        return NextResponse.json(dataSave, { status: 201 });
    } catch (dbError) {
        console.error('--- MongoDB Connection Fatal Error Start ---');
        console.error('MongoDB Connection Error during POST:', dbError);
        console.error('--- MongoDB Connection Fatal Error End ---');

        return NextResponse.json(
            { error: 'FATAL ERROR' },
            { status: 500 } // 500 Internal Server Error
        );
    }
}
