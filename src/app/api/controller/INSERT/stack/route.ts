import { NextRequest, NextResponse } from 'next/server';
import { ConnectMongoDB } from '@/app/api/ConnectMongoDB';
import ModelStacksSetting from '@/app/api/models/stacks/model_stacks';


export async function POST(request: NextRequest) {
    try {
        await ConnectMongoDB();

        const paramData = await request.json();
console.log('paramData ', paramData);
        const addStack = new ModelStacksSetting({
            stack: paramData.stack,
            color: paramData.color,
            slug: paramData.slug,
        });

        const dataSave = await addStack.save();
        console.log('test ', NextResponse.json(dataSave, { status: 201 }));
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
