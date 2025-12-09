import { NextResponse } from 'next/server';
import { GetPostsAllData } from '@/app/api/controller/GET/GETmDBTypePosts';

export async function GET() {
    const posts = await GetPostsAllData();
    return NextResponse.json(posts);
}
