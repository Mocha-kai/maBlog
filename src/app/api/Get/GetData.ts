// src/app/api/Get/GetData.ts (통합 전 버전)

// ⬅️ 이 함수가 'src/app/api/models/mongoDB_Get.ts'에 있다고 가정한 코드입니다.
import { getPostsData } from '@/app/api/Get/MogoDB_Get';
import { NextResponse } from 'next/server';

// GET 요청 핸들러 (Next.js App Router API)
export async function GetData() {
    try {
        // 1. 데이터 조회 함수 호출 (로직은 다른 파일에 있음)
        const data = await getPostsData();

        // 2. 성공 시 200 OK와 함께 JSON 데이터 반환
        return NextResponse.json(data, { status: 200 });
    } catch (error) {
        // 3. 오류 발생 시 500 Internal Server Error 반환
        const errorMessage = error instanceof Error ? error.message : '데이터를 불러오는 데 실패했습니다.';

        return NextResponse.json(
            { message: 'API 라우트 처리 중 오류가 발생했습니다.', error: errorMessage },
            { status: 500 }
        );
    }
}
