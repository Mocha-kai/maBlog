// src/app/api/DELETE/route.ts
import { ConnectMongoDB } from '@/app/api/ConnectMongoDB';
import ModelPostsSetting from '@/app/api/models/posts/model_posts';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    try {
        await ConnectMongoDB();
        const { id } = await request.json();

        if (!id) return NextResponse.json({ error: 'ID is required' }, { status: 400 });

        const result = await ModelPostsSetting.findByIdAndDelete(id);

        return NextResponse.json({ success: true, deleted: result });
    } catch (e) {
        console.error(e);
        return NextResponse.json({ error: 'Delete failed' }, { status: 500 });
    }
}
