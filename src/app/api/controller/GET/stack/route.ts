import { NextResponse } from 'next/server';
import { GetStackAllData } from '../GETmDBTypeStack';

export async function GET() {
    const posts = await GetStackAllData();
    return NextResponse.json(posts);
}
