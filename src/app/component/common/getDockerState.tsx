'use client';

import { useEffect, useState } from 'react';
import { DockerContainer } from '@/app/api/system/docker/route';
import styles from './docker.module.css';

export default function DockerContainersBox() {
    const [containers, setContainers] = useState<DockerContainer[]>([]);

    useEffect(() => {
        const GetDataOCIServer = async () => {
            await fetch('/api/system/docker', { cache: 'no-store' })
                .then((res) => res.json())
                .then(setContainers)
                .catch(() => setContainers([]));
        };
        GetDataOCIServer();
        const timer = setInterval(GetDataOCIServer, 5000);
        return () => clearInterval(timer);
    }, []);

    if (containers.length === 0) return <div>Loading...</div>;

    return (
        <div className={styles.box}>
            <div className={styles.separator}></div>

            {containers.length === 0 && <div className={styles.empty}>No containers found...</div>}

            {containers.map((c: DockerContainer) => (
                <div key={c.ID} className={styles.item}>
                    <span className={styles.bullet}>▶</span>{' '}
                    {c.Names.includes('proxy')
                        ? 'proxy_container'
                        : c.Names.includes('nextjs')
                        ? 'server_container'
                        : c.Names.includes('mongodb')
                        ? 'data_container'
                        : 'security_container'}
                    <span className={styles.status}> — {c.Status}</span>
                </div>
            ))}

            <div className={styles.separator}></div>
            <div className={styles.footer}>{containers.length} containers running</div>
        </div>
    );
}
