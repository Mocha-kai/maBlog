import { NextResponse } from 'next/server';
import si from 'systeminformation';

export async function GET() {
    const cpu = await si.currentLoad();
    const mem = await si.mem();
    const os = await si.osInfo();

    return NextResponse.json({
        cpu: cpu.currentLoad, // CPU %
        memory: {
            total: mem.total,
            used: mem.used,
            free: mem.free,
        },
        os,
    });
}
