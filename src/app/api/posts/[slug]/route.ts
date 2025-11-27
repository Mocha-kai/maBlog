// src/app/api/posts/route.ts

import { NextRequest, NextResponse } from 'next/server';
import { ConnectMongoDB } from '@/app/api/ConnectMongoDB'; // DB 연결 함수
import GetDataTypeSetting from '@/app/api/models/mDBTypeSetting'; // Mongoose 모델

import { remark } from 'remark';
import html from 'remark-html';
import prism from 'remark-prism';
import matter from 'gray-matter';

async function ConvertMarkdownToHtml(markdownContent: string) {
    const matterResult = matter(markdownContent);

    const processedContent = await remark()
        .use(prism) // 코드 하이라이팅 적용
        .use(html, { sanitize: false }) // HTML 변환
        .process(matterResult.content);

    const contentHtml = processedContent.toString(); // ⬅️ contentHtml 생성!

    return {
        contentHtml,
        ...matterResult.data, // Front Matter 데이터
    };
}
// GET 요청 처리 함수는 request와 params를 인수로 받습니다.
export async function GET(request: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
    // 1. URL에서 slug 값을 추출합니다.
    const { slug } = await params;

    if (!slug) return NextResponse.json({ message: 'Slug is missing' }, { status: 400 });

    try {
        await ConnectMongoDB();

        // 2. slug 값을 사용하여 해당 포스트 하나만 조회합니다.
        const post = await GetDataTypeSetting.findOne({ slug: slug }).lean();

        if (!post) return NextResponse.json({ message: 'Post not found' }, { status: 404 });

        // 3. 포스트 데이터 반환
        return NextResponse.json({ ...post, content: ConvertMarkdownToHtml(post.content) }, { status: 200 });
    } catch (error) {
        console.error('API Error:', error);
        return NextResponse.json({ message: 'Failed to fetch post' }, { status: 500 });
    }
}
