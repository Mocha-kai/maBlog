import { NextResponse } from "next/server";
import { exec } from "child_process";
import { promisify } from "util";
import fs from 'fs';

let lastTotal = 0;
let lastIdle = 0;

function ReadCPU() {
    const stat = fs.readFileSync('/proc/stat', 'utf8');
    const line = stat.split('\n')[0]; // "cpu  3357 0 4313 ..."
    const fields = line.split(/\s+/).slice(1).map(Number);

    const idle = fields[3];
    const total = fields.reduce((a, b) => a + b, 0);

    return { idle, total };
}

function GetCPUUsage() {
    const { idle, total } = ReadCPU();

    if (lastTotal === 0) {
        lastTotal = total;
        lastIdle = idle;
        return 0;
    }

    const idleDelta = idle - lastIdle;
    const totalDelta = total - lastTotal;

    lastTotal = total;
    lastIdle = idle;

    const usage = 100 * (1 - idleDelta / totalDelta);
    return Math.max(0, Math.min(100, usage));
}


export interface ServerType {
    cpu: string;
    memory: { used: string; total: string };
    disk: { used: string; total: string };
    uptime: string;
}

const execAsync = promisify(exec);

export async function GET() {
  try {
        const cpu = GetCPUUsage();

        const { stdout } = await execAsync("sh /opt/ma_blog/read_os/status.sh");
        const data: ServerType = JSON.parse(stdout);

        const result: ServerType = {
            ...data,
            cpu: cpu.toFixed(1)
        };

        return NextResponse.json(result);

    } catch (err) {
        return NextResponse.json({ error: "Failed" }, { status: 500 });
    }
}
