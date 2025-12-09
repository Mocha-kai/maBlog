'use client';

import Link from 'next/link';
import Style from './top.module.css';

const TopLayout = () => {
    return (
        <header className={Style.topBody}>
            <div className={Style.topContent}>
                {/* 1. 로고 영역 */}
                <Link href="/" className={Style.logoLink}>
                    <div className={Style.logoText}>
                        Ma<span className={Style.accent}>_</span>Blog
                    </div>
                </Link>
            </div>
        </header>
    );
};

export default TopLayout;
