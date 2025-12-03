
import { NextRequest, NextResponse } from "next/server";
import { ConnectMongoDB } from "../ConnectMongoDB";
import { InsertPostData } from "./MongDB_Insert";

export async function POST(request: NextRequest) {

    let connection;
    
    // 0. 데이터베이스 연결 시도 (ConnectMongoDB는 Mongoose 인스턴스 또는 undefined를 반환)
    try {
        connection = await ConnectMongoDB();
    } catch (dbError) {
        // [⭐ 수정] MongoDB 연결 오류가 발생하면, 오류 객체 전체를 출력합니다.
        console.error('--- MongoDB Connection Fatal Error Start ---');
        console.error('MongoDB Connection Error during POST:', dbError);
        console.error('--- MongoDB Connection Fatal Error End ---');
        
        return NextResponse.json(
            { error: '데이터베이스 연결에 심각한 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.' },
            { status: 500 } // 500 Internal Server Error
        );
    }

    // await ConnectMongoDB();

    // const body = await request.json();
    // const {     
    //     title,
    //     content,
    //     category,
    //     date,
    //     slug } = body;

    //     console.log('body',body);

    // const result = await InsertPostData({title, content, category, date, slug});
    // return NextResponse.json(
    //             { message: 'Insert Success', data: result },
    //             { status: 201 } // 201 Created
    //         );
}

