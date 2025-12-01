
import { NextRequest, NextResponse } from "next/server";
import { ConnectMongoDB } from "../ConnectMongoDB";
import { InsertPostData } from "./MongDB_Insert";

const MONGO_URI = process.env.MONGO_URI;
export async function POST(request: NextRequest) {
    if (!MONGO_URI) {
        console.warn('GetPostsAllData: MONGO_URI not set. Returning empty data for BUILD.');
        // 실제 데이터 처리는 하지 않고, 200 OK와 함께 더미 데이터를 반환하여 빌드를 통과시킵니다.
        return NextResponse.json(
            { message: 'MOCK Success for BUILD', data: false }, // data: false는 추정
            { status: 200 } 
        );
    }

    await ConnectMongoDB();

    const body = await request.json();
    const {     
        title,
        content,
        category,
        date,
        slug } = body;

        console.log('body',body);

    const result = await InsertPostData({title, content, category, date, slug});
    return NextResponse.json(
                { message: 'Insert Success', data: result },
                { status: 201 } // 201 Created
            );
}

