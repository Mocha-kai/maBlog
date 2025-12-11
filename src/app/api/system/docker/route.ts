import { exec } from 'child_process';
import { NextResponse } from 'next/server';

export async function GET() {
    const containers = await new Promise((resolve) => {
        exec("docker ps --format '{{json .}}'", (err, stdout) => {
            if (err) resolve([]);
            const list = stdout
                .trim()
                .split('\n')
                .map((line) => JSON.parse(line));
            resolve(list);
        });
    });

    return NextResponse.json(containers);
}
